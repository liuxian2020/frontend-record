<template>
  <div class="test3dClass">
    <div id="container"></div>

  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";


import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

			// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
      import { GUI } from "three/examples/jsm/libs/dat.gui.module";
      import * as dat from 'dat.gui';
// import Stats from 'three/addons/libs/stats.module.js';

export default {
  name: 'ThreeTest',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      axesHelper: null,

      dracoLoader: null,
      gltfLoader: null,

      // 灯光
      light1: null,
      light2: null,
      light3: null,

      robotMesh: null,

      clock: null,

      model: null,
      skeleton: null,
      mixer: null,
      numAnimations: null,
      baseActions: {
        idle: { weight: 1 },
        walk: { weight: 0 },
        run: { weight: 0 }
        // Idle: { weight: 1 },
        // Walking: { weight: 0 },
        // Running: { weight: 0 }
      },
      additiveActions: {
        sneak_pose: { weight: 0 },
        sad_pose: { weight: 0 },
        agree: { weight: 0 },
        headShake: { weight: 0 }
      },
      allActions: [],

      stats: null,
// /"idle", 
      actionList: ["walk", "run"],

      currentBaseAction: 'walk',
      allAnimations: [],

      startAction: null,
      endAction: null,

      idleAction: null,

      settings: {
        'use default duration': true,
        'set custom duration': 3.5,
      },

      crossFadeControls: [],

      panelSettings: null,

      mixerControls: {
        time: 0,
        timeScale: 1,
        stopAllAction: function () { mixer.stopAllAction() },
        animation: 'None',
      },

      actions: [],

      actionIndex: 0,


      
    }
  },
  mounted() {
    this.init()
    this.render()

    // let keyNumber = 0
    // window.addEventListener("click", (event) => {
    //   // console.log(event, '=====eeee')
    //   const ev = window.event || event;
    //   const path = ev.composedPath && ev.composedPath();
    //   let isHsa = path.find((_) => {
    //     return _.id === "container";
    //   });
        
    //   let that = this
    //   if(isHsa) {
    //     // console.log(this.actions, '===aa ')
    //     // document.onkeydown  = function(ev) {
    //       // console.log(ev,'====code', ev.code, that.actions)
    //     // if( ev && ev.code === 'Space') {

    //       // for(let i = 0; i < this.actions.length; i++) {
    //       //   if(!this.actions[i].paused) {
    //       //     this.actions[i].stop()
    //       //   }
    //       // }
    //       that.stopAction()


    //       keyNumber++
       

    //       // if(keyNumber >= that.actions.length - 1 ) {
    //       if(keyNumber >= that.actions.length ) {
    //         // console.log('第一次点击只有开始运功的形态',keyNumber, that.actions[keyNumber].getClip().name)
    //         keyNumber = 0
    //         that.actions[that.actions.length - 1].stop()
    //       }else {
    //         // console.log('后面的', keyNumber)
    //         that.actions[keyNumber - 1].stop()
    //       }
    //       // console.log('进入了1哈哈哈哈哈', that.actions, that.actions[keyNumber].getClip().name)

    //       that.actions[keyNumber].play()
    //       that.actions[keyNumber].loop = THREE.LoopOnce;

    //       // keyNumber++
    //     // }
    //     // }


    //   }


    //   // if (isHsa) {
    //   //   // console.log('点中盒子了')

    //   //   let name = Math.floor(Math.random() * this.actionList.length);
    //   //   console.log(this.actionList[name], this.allAnimations)


    //   //   for (let i = 0; i !== this.allAnimations.length; ++i) {
    //   //     let clip = this.allAnimations[i];
    //   //     let clipName = clip.name;
    //   //     let action = this.mixer.clipAction(clip);

    //   //     // if (this.startAction) {
    //   //     //   this.endAction = this.startAction
    //   //     //   this.startAction = action

    //   //     //   this.prepareCrossFade(this.startAction, this.endAction, 1.0);

    //   //     // } else {
    //   //     //   // 第一次点击只有开始运功的形态
    //   //     //   this.startAction = action
    //   //     //   this.activateAction(action);
    //   //     // }

    //   //     if(clipName == this.actionList[name]) {
    //   //       this.activateAction( action );
    //   //     }
    //   //   }

    //   // }


    //   event.stopPropagation();
    // }, false)

  },
  methods: {
    init() {
      let container = document.getElementById('container')
      this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.25, 1000000)
      this.camera.position.set(- 5, 3, 7)
      this.camera.lookAt( new THREE.Vector3( 0, 2, 0 ) )
      this.scene = new THREE.Scene()
      this.clock = new THREE.Clock();

      this.scene.background = new THREE.Color(0x000000);

      // 场景模糊度
      // this.scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

      // 半球体光照

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      hemiLight.position.set(0, 20, 0);
      this.scene.add(hemiLight);

      this.robot()
      this.light()
      // 将几何体添加到场景
      // this.scene.add(cube);
      // 添加轨道控制器
      this.orbitControl(container);
      // 添加坐标轴辅助器
      // this.axes();
      // 初始化渲染器
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      // 设置渲染的尺寸大小
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // console.log(renderer);
      // 将webgl渲染的canvas内容添加到body
      container.appendChild(this.renderer.domElement);
    },

    robot() {
      // 添加机器人
      // 设置解压缩的加载器
      this.dracoLoader = new DRACOLoader();
      this.dracoLoader.setDecoderPath("./draco/gltf/");
      this.dracoLoader.setDecoderConfig({ type: "js" });
      this.gltfLoader = new GLTFLoader();
      this.gltfLoader.setDRACOLoader(this.dracoLoader);
      // RobotExpressive
      // Xbot
      const loader = new FBXLoader();
  // loader.load(`${this.publicPath}model/glbxz.com6031.FBX`, object => {//加载路径fbx文件

      // this.gltfLoader.load("./assets/RobotExpressive.glb", (gltf) => {
      //   gltf.scene.position.set(0, -2, 0)
      //   this.model = gltf.scene;
      //   this.scene.add(this.model);
      //   this.model.traverse(function (object) {
      //     if (object.isMesh) object.castShadow = true;
      //   });

      //   this.skeleton = new THREE.SkeletonHelper(this.model);
      //   this.skeleton.visible = false;
      //   this.scene.add(this.skeleton);

      // });

      const objLoader = new OBJLoader()
      objLoader.load('./assets/Cerberus.obj', (root) => {
        root.scale.set(10,10,10)
        root.position.x = 10
        this.scene.add(root)
      })

      const axesHelper = new THREE.AxesHelper(5);
      this.scene.add(axesHelper);

    },
    stopAction() {
      for(let i = 0; i < this.actions.length; i++) {
          if(!this.actions[i].paused) {
            this.actions[i].stop()
          }
        }
    },

    enableControls() {
      var gui = new dat.GUI();//用dat gui来实现控制组件
      //一些控制选项
      var mixerFolder = gui.addFolder("AnimationMixer")
      mixerFolder.add(this.mixerControls, "time").listen()
      mixerFolder.add(this.mixerControls, "timeScale", 0, 5).onChange(
        (timeScale)=>{ this.mixer.timeScale = timeScale }
      );
      mixerFolder.add(this.mixerControls, "stopAllAction").listen()
      // console.log(this.allActions, '====allAction', this.allAnimations)
      // console.log(this.actions, '=-====aaaaactiii', this.actions.length, this.actions[0])
      let lens = this.actions.length
      let that = this
      gui.add(this.mixerControls, "animation", ["idle", "walk", "run","None"]).onChange( (animation) => {
        for (var i = 0; i < lens; i++) {
          if (animation == that.actions[i].getClip().name) {
            // console.log(that.actions[i].getClip().name, '======',animation, that.actions[i])
            that.actions[i].play();
          }
          // else {
          //   that.actions[i].stop();
          // }
        }
      })

    },

    activateAction(action) {
      // console.log(action.paused, '=====paused')
      // if(action.paused) {
      //   action.paused = false;
      // }else {
      //   action.paused = true;
      // }
      // console.log(action, '====action')


      const clip = action.getClip();
      const settings = this.baseActions[clip.name] || this.additiveActions[clip.name];
      this.setWeight(action, settings.weight);
      action.play();

    },


    setWeight(action, weight) {
      action.enabled = true;
      action.setEffectiveTimeScale(1);
      action.setEffectiveWeight(weight);
    },

    light() {
      // 添加直线光
      // this.light1 = new THREE.DirectionalLight(0xffffff, 0.3);
      // this.light1.position.set(0, 10, 10);
      // this.light2 = new THREE.DirectionalLight(0xffffff, 0.3);
      // this.light2.position.set(0, 10, -10);
      // this.light3 = new THREE.DirectionalLight(0xffffff, 0.8);
      // this.light3.position.set(10, 10, 10);
      // this.scene.add(this.light1, this.light2, this.light3);

      const dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(3, 5, 5);
      dirLight.castShadow = true;
      dirLight.shadow.camera.top = 2;
      dirLight.shadow.camera.bottom = - 2;
      dirLight.shadow.camera.left = - 2;
      dirLight.shadow.camera.right = 2;
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 40;
      this.scene.add(dirLight);
    },

    render() {
      // controls.update();
      this.renderer.render(this.scene, this.camera);
      //   渲染下一帧的时候就会调用render函数
      requestAnimationFrame(this.render);

      // this.animate()

    },
    orbitControl(container) {
      // 创建轨道控制器
      this.controls = new OrbitControls(this.camera, container);
      // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
      this.controls.enableDamping = true;
      // 启用或禁用摄像机的缩放。  false 为禁止摄像机的缩放
      // this.controls.enableZoom = false; 
      this.controls.autoRotate = true;
      this.controls.enablePan = true;
      // this.controls.enabled = true;

      // this.controls.autoRotate = true // 启用自动旋转
      // this.controls.autoRotateSpeed = 10

      // this.controls.maxAzimuthAngle = Math.PI/2
      this.controls.minPolarAngle = Math.PI/3
      this.controls.maxPolarAngle = Math.PI/3

      this.controls.target.set(0, 1, 0);
      this.controls.update()
    },
    axes() {
      // 添加坐标轴辅助器
      this.axesHelper = new THREE.AxesHelper(5);
      this.scene.add(this.axesHelper);
    },






  }

}
</script>
<style lang="scss">
.dg.ac {
  z-index: 9999;
}
.test3dClass {
  width: 100%;
    height: 100vh;
  #container { //控制画布的大小
    width: 100%;
    height: 100vh;

  //    width: 100%;
  // height: 100%;
    position: relative;
    // bottom: 0;
    // right: -100px;
    z-index: 9999;
    canvas {  //控制画布的大小
      width: 100%;
    height: 100vh;
    }
  }
}
</style>