<template>
  <div class="searchClass">
    <span class="labe">基本搜索</span>
    <Search ref="Search" @search="getPageOne" :labelList="labelList"></Search>
    <span class="labe">时间组件</span>
    <Search ref="Search" @search="getPageOne" :labelList="labelListTime"></Search>
    <span class="labe">前一个影响后面下拉框</span>
    <Search ref="Search1" @search="getSelect" :labelList="labelList2"></Search>
    <span class="labe">初始化参数</span>
    <Search ref="Search2" @search="getPageOne" :labelList="labelList"></Search>
    <span class="labe">immediateSearch：改变值不会立刻触发搜索,点击搜索才会</span>
    <Search ref="Search3" :immediateSearch="false" @search="getPageOne" :labelList="labelList"></Search>
    <div class="box" v-dataLoading:[loadedName]="boxList.length === 0"> </div>
  </div>
</template>
<script>
import areaRes from '../data/area.json'
import Search from '@/components/Search/index'
export default {
  components: {
    Search
  },
  data() {
    return {
      labelList: [{
        name: '文本框',
        id: 'id',
        type: 'number'
      }, {
        name: '下拉框',
        id: 'propId',
        type: 'select',
        // list如果不是id和name，可以自定义keyMap
        keyMap: {
          id: 'id1',
          name: 'name1'
        },
        list: [{
          id1: 1,
          name1: 'text1'
        }, {
          id1: 2,
          name1: 'text2'
        }]
      }, {
        name: '地区',
        id: 'area',
        type: 'cascader',
        list: areaRes.data,
        props: {
          value: 'areaCode',
          label: 'areaName',
          children: 'chlidList',
          checkStrictly: true,
          emitPath: false,
        }
      }],
      // 这里面的值只是search组件的参数
      searchQuery: {
        id: null,
        propId: '',
        area: '',
        stateList: [],
        updateLoginName: '',
        timeRange: [],
        timeRange1: [],
        time: [],
      },
      // 时间类型的label
      labelListTime: [{
        name: '日期',
        id: 'date',
        type: 'date'
      }, {
        name: '日期时间',
        id: 'datetime',
        type: 'datetime',
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
      }, {
        name: '日期范围',
        id: 'daterange',
        type: 'daterange'
      }, {
        name: '日期时间范围',
        id: 'datetimerange',
        type: 'datetimerange'
      }],
      // ======= 联动类型 前一个影响后面下拉框 =======
      labelList2: [{
        name: '下拉111',
        id: 'propId',
        type: 'select',
        // list如果不是id和name，可以自定义keyMap
        keyMap: {
          id: 'value',
          name: 'name'
        },
        list: [{
          value: '1',
          name: 'text1'
        }, {
          value: '2',
          name: 'text2'
        }]
      }, {
        name: '下拉2',
        id: 'stateList',
        type: 'multiple',
        // 默认的list的传参
        list: [{
          id: 1,
          name: "text1"
        },
        {
          id: 2,
          name: "text2"
        }]
      }],
      loadedName: '',
      boxList: []
    }
  },
  created() {
    this.getApi()
  },
  mounted() {
    this.setSearchValue()
  },
  methods: {
    // 初始化search的值
    setSearchValue() {
      const Search = this.$refs.Search2
      this.searchQuery.id = 111
      this.searchQuery.stateList = [1]
      if (Search) {
        Search.setQuery(this.searchQuery)
      }
    },
    getSelect(query, prop) {
      // 如果改变的是协议
      if (prop === 'propId') {
        const selectList = [{
          id: 1,
          name: "草稿1"
        },
        {
          id: 2,
          name: "草稿2"
        }]
        const otherSelect = [{
          id: 1,
          name: "草稿1"
        },
        {
          id: 2,
          name: "草稿2"
        }]
        let arr = query.propId === '1' ? selectList : otherSelect
        // 重新赋值,层次过深需要$set
        this.$set(this.labelList2[1], 'list', arr)
        // 手动清空需要清空的下拉选
        query.stateList = []
        // 手动
        this.$refs.Search1.setQuery(query)
      }
      this.getApi()
    },
    // 查询页面
    getPageOne(query, prop) {
      this.getApi()
    },
    // 调用接口查询
    getApi() {
      this.loadedName = ''
      setTimeout(() => {
        this.loadedName = '暂无数据'
      }, 1000);
    }
  },
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';
.searchClass {
  padding: 20px;
  .labe {
    display: inline-block;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .box {
    position: relative;
    margin-top: 30px;
    width: 100%;
    height: 250px;
    background-color: #fff;
  }
}
</style>