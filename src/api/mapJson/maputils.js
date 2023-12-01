// 添加的地图json数据
import aa from './all.json'
// import nanhu from '_assets/json/sub-map/nanhu-data.json'
// import xiuzhou from '_assets/json/sub-map/xiuzhou-data.json'
// import jiashan from '_assets/json/sub-map/jiashan-data.json'
// import pinghu from '_assets/json/sub-map/pinghu-data.json'
// import tongxiang from '_assets/json/sub-map/tongxiang-data.json'
// import haining from '_assets/json/sub-map/haining-data.json'
// ...

const mapDict = {
  秀洲区: 'aa',
  // 南湖区: 'nanhu',
  // 嘉善县: 'jiashan',
  // 平湖市: 'pinghu',
  // 桐乡市: 'tongxiang',
  // 海宁市: 'haining'
  // ...
}

const mapData = {
  aa,
  // nanhu,
  // jiashan,
  // pinghu,
  // tongxiang,
  // haining
  // ...
}

export function getMap (mapName) {
  const cityName = mapDict[mapName]
  if (cityName) {
    return [cityName, mapData[cityName]]
  }
  return ['jiaxing', aa]
}
// ————————————————
// 版权声明：本文为CSDN博主「鲤鱼_599」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/qq_44035882/article/details/125973601