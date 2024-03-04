<template>
  <div class="word-wrap">
    <div id="wordView" v-html="wordText" />
  </div>
</template>

<script>
// docx文档预览(只能转换.docx文档，转换过程中复杂样式被忽，居中、首行缩进等)
import mammoth from "mammoth";
export default {
  data () {
    return {
      wordText: "",
      wordURL: 'http://39.101.162.213/test.docx'//文件地址
    };
  },
  created () {
    this.getWordText();
  },
  methods: {
    getWordText () {
      const xhr = new XMLHttpRequest();
      xhr.open("get", this.wordURL, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        if (xhr.status == 200) {
          mammoth.convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) }).then((resultObject) => {
            this.$nextTick(() => {
              this.wordText = resultObject.value;
            });
          });
        }
      };
      xhr.send();
    }
  },
};
</script>

<style lang="less">
.word-wrap {
  padding: 15px;

  img {
    width: 100%;
  }
}
</style>
