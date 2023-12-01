<template>
  <div class="map-box" id="map-box" ref="mapBox"></div>
</template>
<script>
import 'ol/css';
import {fromLonLat} from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer} from 'ol/layer';
import {defaults as Defaults} from 'ol/control';
import XYZ from 'ol/source/XYZ';
export default {
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    /** 初始化地图 */
    initMap() {
      this.map = new Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
            }),
          })
        ],
        view: new View({
          center: fromLonLat([104.06, 30.67]), // 成都
          zoom: 10, // 设置初始化时的地图缩放层级
          projection: 'EPSG:3857', // 坐标系
          maxZoom: 18, // 最大缩放层级
          minZoom: 4, // 最小缩放层级
        }),
        target: 'map-box', // 地图的dom
        controls: new Defaults({
          // 清除地图上的控件
          attribution: false,
          rotate: false,
          zoom: false,
        }),
        text: new Text({
          scale: 0.64, 
          font: 'bold 0.1rem 微软雅黑 ',
          text: hasLabel ? data[i].value+'\n'+data[i].name  : '',
          fill: new Fill({
            color:'#000'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 3
          })
        })

      });
    },
  }
}
</script>
<style>
  .map-box {
    width: 100%;
    height: 100%;
  }
</style>
