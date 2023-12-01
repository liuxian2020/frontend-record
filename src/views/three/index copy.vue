<template>
  <div>
    <!-- 8888 -->
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 三要素
      var scene=new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(45,1,1,1000);
      camera.position.set(0,0,100);
      camera.lookAt(new THREE.Vector3(0,0,0));
      
      


      // 渲染器
      var renderer=new THREE.WebGLRenderer();

      // 创建轨道控制器
      var controls = new OrbitControls(camera, renderer.domElement);
      // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
      controls.enableDamping = true;
      // 启用或禁用摄像机的缩放。  false 为禁止摄像机的缩放
      controls.enableZoom = false; 
      controls.autoRotate = true;
      controls.enablePan = true;
      controls.update()

      const axesHelper = new THREE.AxesHelper(3)
      scene.add(axesHelper)

      renderer.setSize(window.innerWidth,window.innerHeight);
      //显示在窗体
      document.body.appendChild(renderer.domElement);
      //选择材料THREE.LineBasicMaterial/ MeshBasicMaterial  
      var material = new THREE.LineBasicMaterial({color:0xfff});
      // 空几何体，里面没有点的信息
      var geometry = new THREE.Geometry();
      // 添加3个点，相邻的会连成一条线，但是首位不会闭合连线
      geometry.vertices.push(new THREE.Vector3(-10,0,0));
      geometry.vertices.push(new THREE.Vector3(0,10,0));
      geometry.vertices.push(new THREE.Vector3(10,0,0));
      //线
      var line=new THREE.Line(geometry,material);
      // 加入到场景中
      scene.add(line);
      // 渲染
      renderer.render(scene,camera);

      
    }
  }
}
</script>