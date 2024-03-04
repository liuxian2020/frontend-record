<template>
  <div class="home">
    <div id="map"></div>
  </div>
</template>

<script>

import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat } from 'ol/proj';
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from 'ol/source/XYZ';
import { defaults as Defaults } from 'ol/control';
export default {
  data () {
    return {
      map: null
    };
  },
  mounted () {
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
          }),
        })
      ],
      view: new View({
        projection: 'EPSG:3857',  //坐标系，即地球坐标系——WGS84：常见于 GPS 设备，Google 地图等国际标准的坐标体系。
        center: fromLonLat([118.78333, 32.05000]),  //中心点坐标，即北京天安门
        zoom: 15,
        maxZoom: 25, // 最大缩放层级
        minZoom: 4, // 最小缩放层级

      }),
      controls: new Defaults({
        // 清除地图上的控件
        attribution: true,
        rotate: true,
        zoom: true,
        scale: 0.64,
      })
    });
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: 100vh;
}

/deep/.ol-zoom {
  display: none;
}

/deep/.ol-attribution.ol-uncollapsible {
  display: none;
}
</style>
