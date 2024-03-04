<template>
  <div ref="outSizeBox" class="common-search">
    <div class="common-search-content">
      <div ref="searchSizeBox" class="search-size" id="flexSearchHeight">
        <!-- 点击之后打开搜索项 -->
        <div class="search-area" :id="'search-area-id' + uniqueId">
          <div class="label-box">
            <div class="search-guide" @click="toggleOpen">
              <svg-icon class="sousuo1" icon-class="sousuo1"></svg-icon>
              <span class="ml-3">我的搜索</span>
            </div>
            <span v-for="(item, index) in labelList" :key="index" class="out-label">
              <span class="label-item" v-if="showLabel(item)">
                {{ item.name }}
                :
                <!-- 时间范围 -->
                <span v-if="item.type === 'daterange' || item.type === 'datetimerange'">
                  {{ dayjs(searchQuery[item.id][0]).format(getDateFormat(item, true)) }}
                  至
                  {{ dayjs(searchQuery[item.id][1]).format(getDateFormat(item, true)) }}
                </span>
                <span v-else-if="item.type === 'date' || item.type === 'datetime'">
                  {{ dayjs(searchQuery[item.id]).format(getDateFormat(item, true)) }}
                </span>
                <!-- 联动选择框 -->
                <span v-else-if="item.type === 'cascader'">
                  {{ getCascadedValue(item) }}
                </span>
                <!-- 选择框 -->
                <span v-else-if="item.type === 'select'">
                  {{ getArrMap(item.list, item.keyMap)[searchQuery[item.id]] }}
                </span>
                <!-- 多选 -->
                <span v-else-if="item.type === 'multiple'">
                  <span v-for="(ele, eleIndex) in searchQuery[item.id]" :key="eleIndex">
                    {{ getArrMap(item.list, item.keyMap)[ele] }}
                    <span class="line" v-if="eleIndex != searchQuery[item.id].length - 1"> | </span>
                  </span>
                </span>
                <!-- 单个值 -->
                <span v-else>
                  {{ searchQuery[item.id] }}
                </span>
                <span v-if="!item.initValueFn" @click="handleRemove(item)">
                  <svg-icon class="guanbi1" icon-class="guanbi1"></svg-icon>
                </span>
              </span>
            </span>
            <el-button plain size="small" v-if="showReset()" @click="reset">
              重置
            </el-button>
            <el-button bg size="small" type="primary" @click="searchEmit(true)">
              搜索
            </el-button>
          </div>
        </div>
        <div class="search-content" :id="'search-bar-id' + uniqueId">
          <div class="search-show" :class="opened ? 'openSidebar' : 'hideSidebar'">
            <div class="search-main">
              <!-- 搜索的主体内容 -->
              <div class="main-item" v-for="(item, index) in labelList" :key="index">
                <div class="keyWords" :class="{ keyWordsLong: item.name.length > 4 }">{{ item.name }}</div>
                <slot v-if="item.slot" :name="item.slot"> </slot>
                <template v-else>
                  <template v-if="!item.type">
                    <el-input v-model.trim="searchQuery[item.id]" :maxlength="item.maxlength ? item.maxlength : 50"
                      :placeholder="item.name" :class="getWidthClass(item)" :clearable="getClearable(item)"
                      @change="searchEmit(false, item.id)"></el-input>
                  </template>
                  <template v-else-if="item.type === 'number'">
                    <el-input-number v-model.trim="searchQuery[item.id]" controls-position="right"
                      :placeholder="item.name" :class="getWidthClass(item)" @change="searchEmit(false, item.id)"
                      :min="item.min" :max="item.max" :clearable="getClearable(item)"></el-input-number>
                  </template>
                  <template v-else-if="item.type === 'cascader'">
                    <el-cascader v-model="searchQuery[item.id]" :options="item.list" :props="item.props"
                      :clearable="getClearable(item)" :class="getWidthClass(item)" @change="searchEmit(false, item.id)"
                      :placeholder="item.name"></el-cascader>
                  </template>
                  <template v-else-if="item.type === 'select' || item.type === 'multiple'">
                    <el-select v-model="searchQuery[item.id]" :placeholder="item.name" collapse-tags
                      :multiple="item.type === 'multiple'" :class="getWidthClass(item)" :clearable="getClearable(item)"
                      @change="searchEmit(false, item.id)" filterable>
                      <el-option v-for="(ele, eleIndex) in item.list" :key="eleIndex"
                        :label="item.keyMap && item.keyMap.name ? ele[item.keyMap.name] : ele.name"
                        :value="item.keyMap && item.keyMap.id ? ele[item.keyMap.id] : ele.id"> </el-option>
                    </el-select>
                  </template>
                  <template
                    v-else-if="item.type === 'date' || item.type === 'daterange' || item.type === 'datetime' || item.type === 'datetimerange'">
                    <el-date-picker @change="searchEmit(false, item.id)" :class="getWidthClass(item)"
                      :picker-options="item.pickerOptions" :type="item.type" :format="getDateFormat(item, false)"
                      value-format="timestamp" v-model="searchQuery[item.id]" :placeholder="item.name"
                      :default-time="item.type.includes('range') ? ['00:00:00', '23:59:59'] : null" start-placeholder="开始"
                      end-placeholder="结束">
                    </el-date-picker>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: 'SearchBar',
  props: {
    // change会弹出search
    immediateSearch: {
      type: Boolean,
      default: true
    },
    // 初始化的参数
    labelList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      opened: false,
      searchQuery: {},
      dayjs: dayjs
    };
  },
  // 初始化label的值
  created () {
    this.uniqueId = (new Date()).getTime() + ''
  },
  // 增加全局点击
  mounted () {
    this.$nextTick(function () {
      this.initValueFn()
      window.addEventListener('click', this.handleMouseClick)
    })
  },
  // 移除全局点击
  destroyed () {
    window.removeEventListener('click', this.handleMouseClick)
  },
  methods: {
    initValueFn () {
      this.labelList.filter((item) => {
        if (item.initValueFn !== undefined) {
          const value = item.initValueFn()
          this.$set(this.searchQuery, item.id, value)
        }
      })
    },
    // 是否显示label
    showLabel (item) {
      const searchQuery = this.searchQuery
      const id = item.id
      const isNumber = typeof (searchQuery[id]) === 'number'
      if (isNumber) {
        return true
      } else {
        return searchQuery[id] && searchQuery[id].length
      }
    },
    // 是否显示重置按钮
    showReset () {
      const searchQuery = this.searchQuery
      if (Object.keys(searchQuery).length) {
        for (let i in searchQuery) {
          const isNumber = typeof (searchQuery[i]) === 'number'
          if (searchQuery[i]) {
            if (isNumber) {
              return true
            } else if (searchQuery[i].length) {
              return true
            }
          }
        }
      }
      return false
    },
    // ============ 联级选择器 ==============
    // 平铺
    flattenMap (arr, childrenProp) {
      let result = {};
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        const areaCode = item.areaCode
        result[areaCode] = item.areaName
        if (arr[i][childrenProp] && arr[i][childrenProp].length) {
          Object.assign(result, this.flattenMap(arr[i][childrenProp], childrenProp))
        }
      }
      return result
    },
    getCascadedValue (item) {
      let childrenProp = 'children'
      if (item.props && item.props.children) {
        childrenProp = item.props.children
      }
      item.map = item.map || this.flattenMap(item.list, childrenProp)
      let value = this.searchQuery[item.id]
      let result = ''
      // 说明是属组
      if (Array.isArray(value)) {
        const len = value.length
        value.forEach((ele, index) => {
          if (!result.includes(item.map[ele])) {
            result += item.map[ele]
            if (index !== len - 1) {
              result += ' / '
            }
          }
        })
      } else {
        result = item.map[value]
      }
      return result
    },
    // 获取清空状态
    getClearable (item) {
      let clearable = item.clearable !== undefined ? item.clearable : true
      if (item.initValueFn) {
        clearable = false
      }
      return clearable
    },
    // 获取控制宽度的class
    getWidthClass (item) {
      let className = 'w-20'
      // 名字比较长或者是range类型
      if (item.name.length > 4 || (item.type && item.type.includes('range'))) {
        className = 'w-46'
      }
      return className
    },
    // 获取时间的
    getDateFormat (item, dayjsFlag) {
      const type = item.type
      let format = 'YYYY-MM-DD'
      // 如果包含时间
      if (type.includes('time')) {
        format = 'YYYY-MM-DD HH:mm:ss'
      }
      if (!dayjsFlag) {
        format = format.replace('YYYY', 'yyyy')
        format = format.replace('DD', 'dd')
      }
      return format
    },
    // 通过传入的数组获取map
    getArrMap (arr, keyMap) {
      const idProp = keyMap && keyMap.id ? keyMap.id : 'id'
      const nameProp = keyMap && keyMap.name ? keyMap.name : 'name'
      const map = arr.reduce((acc, cur) => {
        acc[cur[idProp]] = cur[nameProp]
        return acc;
      }, {});
      return map
    },

    // 鼠标点击
    handleMouseClick (event) {
      this.$nextTick(() => {
        const ev = window.event || event;
        const path = ev.composedPath && ev.composedPath();
        // 是否是搜索区域
        let clickSearchBarArea = path.find((_) => {
          return _.id === 'search-bar-id' + this.uniqueId || _.id === 'search-area-id' + this.uniqueId;
        })

        // 点击非搜索区，关闭搜索区
        if (!clickSearchBarArea) {
          this.opened = false;
        }
      })
    },

    // 重置
    reset () {
      this.searchQuery = {}
      this.initValueFn()
      this.searchEmit(false)
    },

    // 删除某个搜索的标签
    handleRemove (item) {
      this.$delete(this.searchQuery, item.id)
      this.searchEmit(false, item.id)
    },

    // 控制搜索框的展开和关闭
    toggleOpen () {
      this.opened = !this.opened;
    },

    //  =================事件=======================
    // 搜索事件，传searchFlag为true表示可以直接响应事件
    searchEmit (searchFlag, prop) {
      let emitFlag = searchFlag || this.immediateSearch
      if (emitFlag) {
        this.$emit("search", this.searchQuery, prop);
      }
    },
    //  =================开放方法=======================
    // 设置查询内容
    setQuery (query) {
      this.searchQuery = query
    },

    // 获取查询内容
    getQuery () {
      return this.searchQuery;
    }
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';

::v-deep .el-input-number__decrease {
  line-height: 14px !important;
  bottom: 7px !important;
}

::v-deep .el-input-number__increase {
  top: 5px !important;
  line-height: 14px !important;
}

.common-search-content {
  display: flex;

  .search-size {
    width: 100%;
    position: relative;

    .search-area {
      clear: both;
      min-height: 30px;

      .search-btn {
        vertical-align: middle;
        height: 28px;
        padding: 0 10px;
        width: fit-content;
        font-size: 13px;
        border-width: 0.7px !important;
        border-radius: 2px;
      }

      .label-box {
        // >* {
        //   margin-bottom: 10px;
        // }

        .out-label {
          display: inline-block;
          vertical-align: middle;
        }

        .label-item {
          // height: 25px;
          background: #f0f1f6;
          border-radius: 2px;
          padding: 4px 8px;
          margin-right: 5px;
          font-size: 12px;
          display: inline-block;
          vertical-align: middle;
          position: relative;

          .line {
            color: #828da6;
            position: relative;
            top: -1px;
          }

          .guanbi1 {
            cursor: pointer;
            color: #828da6;
          }
        }

        .reset-box {
          display: inline-block;
          vertical-align: middle;
          margin-top: -8px;

          .reset {
            font-size: 13px;
            font-weight: 400;
            color: #5588f7;
            cursor: pointer;
            position: relative;
            top: 1px;
          }

          .split-line {
            color: #e6e6e6;
          }
        }
      }

      .search-guide {
        width: 200px;
        height: 30px;
        background: #ffffff;
        border: 0.7px solid #ced1db;
        border-radius: 2px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 400;
        color: #b8c7d9;
        line-height: 30px;
        padding-left: 9px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;

        .sousuo1 {
          font-size: 16px;
        }
      }
    }

    .search-content {
      width: 100%;
      border-radius: 2px;
      position: absolute;
      left: 0;
      z-index: 101;

      .search-show {
        overflow: hidden;
        transition: max-height 0.4s ease;
        box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);

        .search-main {
          width: 100%;
          padding: 10px 10px 0 10px;
          display: flex;
          flex-wrap: wrap;
          background: #ffffff;
          border: 0.7px solid #e6e6e6;
          border-radius: 2px 2px 0 0;

          .el-input__inner {
            height: 30px;
            border-radius: 2px;
            padding-left: 10px;
          }

          ::v-deep .el-input__suffix {
            top: 4px;
          }

          ::v-deep .el-input__suffix-inner {
            display: inline-block;
          }

          ::v-deep .el-input__icon {
            line-height: 24px;

            &.el-icon-date {
              line-height: 29px;
            }

            &.el-range__icon {
              line-height: 22px;
            }
          }

          ::v-deep .el-select .el-select__tags .el-tag.el-tag--info.el-tag--small.el-tag--light i {
            position: relative;
            right: 1px;
            width: 22px;
          }

          ::v-deep .el-select__input {
            margin-left: 0;
          }

          ::v-deep .el-date-editor--date .el-input__inner {
            padding-left: 30px;
          }

          ::v-deep .main-item {
            display: flex;
            margin-right: 40px;
            margin-bottom: 10px;

            /* selecte 框的高度设置，默认是 40px*/
            ::v-deep .el-input-number.is-controls-right {
              line-height: 30px;

              .el-input-number__decrease,
              .el-input-number__increase {
                display: none;
              }

              .el-input__inner {
                border-radius: 2px;
                padding-left: 10px;
                padding-right: 20px;
                text-align: left;
              }
            }

            .w-20 {
              width: 200px;
            }

            ::v-deep.el-input__inner {
              height: 30px;
              font-size: 13px !important;
            }

            ::v-deep .el-date-editor--date {
              .el-input__prefix {
                top: 1px;
              }
            }

            ::v-deep .el-range-input {
              font-size: 13px;
            }

            ::v-deep .el-range-separator {
              font-size: 13px;
            }

            ::v-deep .el-date-editor--datetime {
              .el-input__inner {
                padding-left: 30px;
              }

              .el-input__prefix {
                top: 1px;
              }
            }

            ::v-deep .el-cascader {
              height: 30px;
              line-height: 30px;
            }

            ::v-deep .el-input__icon {
              line-height: inherit;
            }

            ::v-deep .el-input__suffix-inner {
              display: inline-block;
            }

            .keyWords {
              width: 60px;
              font-size: 13px;
              font-weight: 400;
              color: #323232;
              line-height: 30px;
            }

            .keyWordsLong {
              width: 100px;
            }
          }
        }
      }
    }
  }

  .right-search-box {
    margin-left: 10px;

    .btn-search {
      width: 30px;

      .sousuo1 {
        font-size: 24px;
      }
    }

    .high-search {
      padding: 9px 0;
      vertical-align: bottom;

      .icon-rotate {
        transform: rotate(180deg);
      }
    }
  }
}

.openSidebar {
  max-height: 600px;
}

.hideSidebar {
  max-height: 0;
}

::v-deep .el-input__suffix {
  top: 15px;
}

.main-item {
  display: flex;
  margin-right: 40px;
  margin-bottom: 10px;

  ::v-deep .el-input__inner {
    height: 30px;
  }

  ::v-deep .el-input__icon {
    line-height: inherit;
  }

  ::v-deep .el-input__suffix-inner {
    display: inline-block;
  }

  .keyWords {
    width: 60px;
    font-size: 13px;
    font-weight: 400;
    color: #323232;
    line-height: 30px;
  }

  .keyWordsLong {
    width: 100px;
  }
}
</style>
