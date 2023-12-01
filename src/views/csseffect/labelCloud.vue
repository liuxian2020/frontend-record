<template>
  <div id="tagsList">
    <a class="lowrisk">
      <count :start-val="Number(initLocalStoreData.patorCount)" :end-val="Number(initPageData.patorCount)" :duration="4000" class="event-count" />
      <span class="event-unit">个</span>
      <br>
      <span class="event-title">发现弱口令</span>
    </a>

    <a class="highrisk">
      <count :start-val="Number(initLocalStoreData.lostAssetCount)" :end-val="Number(initPageData.lostAssetCount)" :duration="4000" class="event-count" />
      <span class="event-unit">个</span>
      <br>
      <span class="event-title">检测发现失陷资产</span>
    </a>

    <a class="lowrisk invadeClass">
      <count :start-val="Number(initLocalStoreData.attackCount)" :end-val="Number(initPageData.attackCount)" :duration="4000" class="event-count" />
      <span class="event-unit">次</span>
      <br>
      <span class="event-title">检测发现入侵攻击</span>
    </a>

    <a class="highrisk">
      <count :start-val="Number(initLocalStoreData.processLostAssetCount)" :end-val="Number(initPageData.processLostAssetCount)" :duration="4000" class="event-count" />
      <span class="event-unit">次</span>
      <br>
      <span class="event-title">处理失陷资产</span>
    </a>

    <a class="safe">
      <count :start-val="Number(initLocalStoreData.expertServiceCount)" :end-val="Number(initPageData.expertServiceCount)" :duration="4000" class="event-count" />
      <span class="event-unit">次</span>
      <br>
      <span class="event-title">安全服务</span>
    </a>

  </div>
</template>
<script>
// import { getHomeStatistics } from '@/api/swift_cloud_admin_ids_api/homeStatistics'
const dtr = Math.PI / 180;
const radius = 140;
const tspeed = 8;
const size = 250;
const distr = true;
const howElliptical = 1;
const active = true
const mouseX = -8
const mouseY = -10.6
const d = 300;
import Count from "vue-count-to";
export default {
  components: {
    Count
  },
  data() {
    return {
      sa: '',
      ca: '',
      sb: '',
      cb: '',
      sc: '',
      cc: '',

      aA: [], //获取所有的a链接元素

      mcList: [],

      labelInterval: null,

      lasta: 1,
      lastb: 1,

      initPageData: {
        tenantCount: 0,
        patorCount: 0,
        processLostAssetCount: 0,
        lostAssetCount: 0,
        attackCount: 0,
        expertServiceCount: 0,
      }, //获取页面数据

      initLocalStoreData: {},

      mainInitDataInterval: null
    }
  },
  computed: {
    oDiv() {
      return document.getElementById('tagsList');
    }
  },
  destroyed() {
    clearInterval(this.labelInterval);
    this.labelInterval = null;

    clearInterval(this.mainInitDataInterval);
    this.mainInitDataInterval = null;
  },
  mounted() {
    if (localStorage.getItem('swift-login-initdata')) {
      this.initPageData = JSON.parse(localStorage.getItem("swift-login-initdata"))
      this.initLocalStoreData = JSON.parse(localStorage.getItem("swift-login-initdata"))
    } else {
      localStorage.setItem("swift-login-initdata", JSON.stringify(this.initPageData));
      this.initLocalStoreData = JSON.parse(localStorage.getItem("swift-login-initdata"))
    }
    setTimeout(_ => {
      this.initPageData = {
        tenantCount: 10,
        patorCount: 20,
        processLostAssetCount: 30,
        lostAssetCount: 40,
        attackCount: 50,
        expertServiceCount: 60,
      }

      // localStorage.setItem("swift-login-initdata", JSON.stringify(this.initPageData));
    }, 2000)

    // this.$nextTick((_) => {
    //  this.getHomeStatistics()
    // })
  },
  created() {
    // this.mainInitDataInterval = setInterval(() => {
    //   this.getHomeStatistics()
    // }, 60 * 1000)
    // this.getHomeStatistics()
    
    
  },

  methods: {
    getHomeStatistics() {
      getHomeStatistics().then(res => {
        let data = res.data
        this.initPageData = data
        if (data.tenantCount) {
          this.initPageData.tenantCount = Number(data.tenantCount)
        } else {
          this.initPageData.tenantCount = 0
        }
        if (data.patorCount) {
          this.initPageData.patorCount = Number(data.patorCount)
        } else {
          this.initPageData.patorCount = 0
        }
        if (data.processLostAssetCount) {
          this.initPageData.processLostAssetCount = Number(data.processLostAssetCount)
        } else {
          this.initPageData.processLostAssetCount = 0
        }
        if (data.attackCount) {
          this.initPageData.attackCount = Number(data.attackCount)
        } else {
          this.initPageData.attackCount = 0
        }
        if (data.lostAssetCount) {
          this.initPageData.lostAssetCount = Number(data.lostAssetCount)
        } else {
          this.initPageData.lostAssetCount = 0
        }
        if (data.expertServiceCount) {
          this.initPageData.expertServiceCount = Number(data.expertServiceCount)
        } else {
          this.initPageData.expertServiceCount = 0
        }
        localStorage.setItem("swift-login-initdata", JSON.stringify(this.initPageData));
      })
    },
    getLabelCloud() {

      var i = 0;
      var oTag = null;

      this.aA = this.oDiv.getElementsByTagName('a');

      for (i = 0; i < this.aA.length; i++) {
        oTag = {};

        oTag.offsetWidth = this.aA[i].offsetWidth;
        oTag.offsetHeight = this.aA[i].offsetHeight;

        this.mcList.push(oTag);

        this.aA[i].opacity = 1
      }

      this.sineCosine(0, 0, 0);

      this.positionAll();

      this.labelInterval = setInterval(this.update, 30);

    },


    update() {
      var a;
      var b;

      // 自主设置运动参数
      // active = true
      // mouseX = -8 
      // mouseY = -10.6
      // 自主设置运动参数结束

      if (active) {
        a = (-Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
        b = (Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
      }
      else {
        a = this.lasta * 0.98;
        b = this.lastb * 0.98;
      }

      this.lasta = a;
      this.lastb = b;

      if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
        return;
      }

      var c = 0;
      this.sineCosine(a, b, c);
      for (var j = 0; j < this.mcList.length; j++) {
        var rx1 = this.mcList[j].cx;
        var ry1 = this.mcList[j].cy * this.ca + this.mcList[j].cz * (-this.sa);
        var rz1 = this.mcList[j].cy * this.sa + this.mcList[j].cz * this.ca;

        var rx2 = rx1 * this.cb + rz1 * this.sb;
        var ry2 = ry1;
        var rz2 = rx1 * (-this.sb) + rz1 * this.cb;

        var rx3 = rx2 * this.cc + ry2 * (-this.sc);
        var ry3 = rx2 * this.sc + ry2 * this.cc;
        var rz3 = rz2;

        this.mcList[j].cx = rx3;
        this.mcList[j].cy = ry3;
        this.mcList[j].cz = rz3;

        let per = d / (d + rz3);

        this.mcList[j].x = (howElliptical * rx3 * per) - (howElliptical * 2);
        this.mcList[j].y = ry3 * per;
        this.mcList[j].scale = per;
        this.mcList[j].alpha = per;
        // 设置透明度
        this.mcList[j].alpha = (this.mcList[j].alpha - 0.6) * (10 / 6);
      }

      this.doPosition();
      this.depthSort();

    },
    depthSort() {
      var i = 0;
      var aTmp = [];

      for (i = 0; i < this.aA.length; i++) {
        aTmp.push(this.aA[i]);
      }

      aTmp.sort(
        function (vItem1, vItem2) {
          if (vItem1.cz > vItem2.cz) {
            return -1;
          }
          else if (vItem1.cz < vItem2.cz) {
            return 1;
          }
          else {
            return 0;
          }
        }
      );

      for (i = 0; i < aTmp.length; i++) {
        aTmp[i].style.zIndex = i;
      }
    },
    positionAll() {
      var phi = 0;
      var theta = 0;
      var max = this.mcList.length;
      var i = 0;

      var aTmp = [];
      var oFragment = document.createDocumentFragment();

      //随机排序
      for (i = 0; i < this.aA.length; i++) {
        aTmp.push(this.aA[i]);
      }

      aTmp.sort(
        function () {
          return Math.random() < 0.5 ? 1 : -1;
        }
      );

      for (i = 0; i < aTmp.length; i++) {
        oFragment.appendChild(aTmp[i]);
      }

      this.oDiv.appendChild(oFragment);

      for (let i = 1; i < max + 1; i++) {
        if (distr) {
          phi = Math.acos(-1 + (2 * i - 1) / max);
          theta = Math.sqrt(max * Math.PI) * phi;
        }
        else {
          phi = Math.random() * (Math.PI);
          theta = Math.random() * (2 * Math.PI);
        }
        //坐标变换
        this.mcList[i - 1].cx = radius * Math.cos(theta) * Math.sin(phi);
        this.mcList[i - 1].cy = radius * Math.sin(theta) * Math.sin(phi);
        this.mcList[i - 1].cz = radius * Math.cos(phi);

        this.aA[i - 1].style.left = this.mcList[i - 1].cx + this.oDiv.offsetWidth / 2 - this.mcList[i - 1].offsetWidth / 2 + 'px';
        this.aA[i - 1].style.top = this.mcList[i - 1].cy + this.oDiv.offsetHeight / 2 - this.mcList[i - 1].offsetHeight / 2 + 'px';
      }
    },
    doPosition() {
      var l = this.oDiv.offsetWidth / 2;
      var t = this.oDiv.offsetHeight / 2;
      for (var i = 0; i < this.mcList.length; i++) {
        this.aA[i].style.left = this.mcList[i].cx + l - this.mcList[i].offsetWidth / 2 + 'px';
        this.aA[i].style.top = this.mcList[i].cy + t - this.mcList[i].offsetHeight / 2 + 'px';

        this.aA[i].style.fontSize = Math.ceil(12 * this.mcList[i].scale / 2) + 8 + 'px';

        this.aA[i].style.filter = "alpha(opacity=" + 100 * this.mcList[i].alpha + ")";
        this.aA[i].style.opacity = this.mcList[i].alpha;
      }
    },
    sineCosine(a, b, c) {
      this.sa = Math.sin(a * dtr);
      this.ca = Math.cos(a * dtr);
      this.sb = Math.sin(b * dtr);
      this.cb = Math.cos(b * dtr);
      this.sc = Math.sin(c * dtr);
      this.cc = Math.cos(c * dtr);
    }

  },
}
</script>
<style lang="scss" >
#tagsList {
  position: relative;
  width: 450px;
  height: 450px;
  // background: #120d39;
  a {
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
    text-decoration: none;
    padding: 3px 6px;
    text-align: center;
    display: inline-block;
    width: 310px;
    .event-count {
      font-size: 30px;
    }
    .event-unit {
      font-size: 14px;
    }
    .event-title {
      font-size: 14px;
    }
  }
  .safe {
    .event-count {
      font-size: 30px;
      color: #488dfb;
    }
    .event-unit {
      font-size: 14px;
      color: #488dfb;
    }
    .event-title {
      font-size: 14px;
      color: #488dfb;
    }
  }
  a.highrisk {
    .event-count {
      font-size: 30px;
      color: #e53d34;
    }
    .event-unit {
      font-size: 14px;
      color: #e53d34;
    }
    .event-title {
      font-size: 14px;
      color: #e53d34;
    }
  }
  a.lowrisk {
    .event-count {
      font-size: 30px;
      color: #ffc43d;
    }
    .event-unit {
      font-size: 14px;
      color: #ffc43d;
    }
    .event-title {
      font-size: 14px;
      color: #ffc43d;
    }
  }
  a.deal-risk {
    width: 180px;
  }
}
</style>