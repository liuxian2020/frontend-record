<template>
  <div class="speed-dial" id="speed-dial">
    <!-- <button class="speed-dial__button--root flex-center">
      11
    </button> -->
    <!-- 99 -->
    <treecom2 style="width: 200px; height: 200px; position: absolute; right: 0;"></treecom2>
    <!-- <div class="speed-dial__action" data-direction="bottom">
      <div class="speed-dial__item flex-center" style="transition-delay: 200ms;">
        <button class="speed-dial__button--small flex-center">
          22
          <span>Sun</span>
        </button>
      </div>
      <div class="speed-dial__item flex-center" style="transition-delay: 150ms;">
        <button class="speed-dial__button--small flex-center">
          33
          <span>Wind</span>
        </button>
      </div>
      <div class="speed-dial__item flex-center" style="transition-delay: 100ms;">
        <button class="speed-dial__button--small flex-center">
          44
          <span>Lightning</span>
        </button>
      </div>
      <div class="speed-dial__item flex-center" style="transition-delay: 100ms;">
        <button class="speed-dial__button--small flex-center">
          55
          <span>Lightning</span>
        </button>
      </div> -->
    </div>
  </div>
</template>
<script>
import treecom2 from './treecom2.vue'
export default {
  components: {
    treecom2
  },
  data() {
    return {

    }
  },
  mounted() {
    this.getBack()
  },
  methods: {
    getBack() {
      var buttonContainer = document.querySelector('#speed-dial');
      // var mobileCanvas = document.querySelector('.mobile-canvas')
      buttonContainer.addEventListener('click', function() {
        buttonContainer.classList.toggle('open');
        // mobileCanvas.classList.toggle('open');
      }, false);
    },
  }
}
</script>
<style lang="scss">
.speed-dial {
  position: absolute;
  right: 100px;
  bottom: 400px;
}

.speed-dial:hover .speed-dial__button--root,
.speed-dial__button--root:hover {
  background-color: #0051a1;
}

.speed-dial:hover .speed-dial__button--root svg,
.speed-dial__button--root:hover svg {
  transform: rotate(45deg);
}

.speed-dial .flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.speed-dial button {
  cursor: pointer;
  border: 0;
}

.speed-dial [data-direction] {
  position: absolute;
  display: flex;
  visibility: hidden;
}

.speed-dial [data-direction="top"] {
  bottom: 56px;
  width: 56px;
  flex-direction: column;
}

.speed-dial [data-direction="top"] .speed-dial__button--small {
  margin-bottom: 15px;
}

// 修改出现的位置
.speed-dial [data-direction="bottom"] {
  // top: 56px;
  top: -220px;
  right: 20px;
  width: 56px;
  flex-direction: column-reverse;
}

.speed-dial [data-direction="bottom"] .speed-dial__button--small {
  margin-top: 15px;
}

.speed-dial [data-direction="left"] {
  top: 0;
  right: 56px;
  height: 56px;
  flex-direction: row;
}

.speed-dial [data-direction="left"] .speed-dial__button--small {
  margin-right: 15px;
}

.speed-dial [data-direction="right"] {
  top: 0;
  left: 56px;
  height: 56px;
  flex-direction: row-reverse;
}

.speed-dial [data-direction="right"] .speed-dial__button--small {
  margin-left: 15px;
}

.speed-dial .icon {
  transition: all 0.1s ease-in-out;
  width: 25px;
  height: 25px;
  fill: #464646;
}

.speed-dial .icon__plus {
  width: 24px;
  height: 24px;
  fill: #fff;
}

.speed-dial__item {
  position: relative;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.8s;
  opacity: 0;
  transform: scale(0);
}

// .speed-dial:hover [data-direction] {
//   visibility: visible;
// }
.speed-dial.open [data-direction] {
  visibility: visible;
}

// .speed-dial:hover [data-direction="bottom"] span,
// .speed-dial:hover [data-direction="top"] span {
//   right: 60px;
// }

// .speed-dial:hover [data-direction="left"] span,
// .speed-dial:hover [data-direction="right"] span {
//   top: -20px;
// }
.speed-dial.open [data-direction="bottom"] span,
.speed-dial.open [data-direction="top"] span {
  right: 60px;
}

.speed-dial.open [data-direction="left"] span,
.speed-dial.open [data-direction="right"] span {
  top: -20px;
}

// .speed-dial:hover .speed-dial__item {
//   opacity: 1;
//   transform: scale(1);
// }
.speed-dial.open .speed-dial__item {
  opacity: 1;
  transform: scale(1);
}


.speed-dial__button--small {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.5s;
}

.speed-dial__button--small:hover {
  background-color: #ddd;
}

.speed-dial__button--small:hover span {
  display: block;
}

.speed-dial span {
  display: none;
  position: absolute;
  padding: 5px;
  color: #fff;
  font-size: 11px;
  background-color: #464646;
  border-radius: 5px;
}

.speed-dial__button--root {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1976d2;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}
</style>