<template>
  <div class="menuList">
    <div :class="['box',visibility?'changeMenu1':'']">
      <div :class="['fixedBox',visibility?'changeMenu2':'']">
        <div class="content">
          <div>
            <div v-show="showHello">
              <hello
                class="hello"
                :options="helloOpt"
                loName="hello"
                @lottieCreated="helloInit"
                :notInit="true"
                ref="hello"
              ></hello>
            </div>

            <button @click="sayHello">打个招呼？</button>
          </div>
        </div>
      </div>
      <!-- 挡板 -->
      <div class="baffle" v-if="visibility" @click="visibility = false"></div>
    </div>
    <menuCom
      class="btn"
      :tips="visibility?'快关了':'别点我'"
      :visibility.sync="visibility"
      @menuChange="menuChange"
    ></menuCom>
  </div>
  <!-- https://assets2.lottiefiles.com/packages/lf20_VZWGZs.json -->
</template>

<script>
import menuCom from "@/components/menu.vue";

import hello from "@/components/lottie.vue";
export default {
  components: { menuCom, hello },
  props: {},
  name: "menuList",
  data() {
    return {
      // en ...
      visibility: false,

      //  你好部分
      helloOpt: {
        path: "https://assets2.lottiefiles.com/packages/lf20_VZWGZs.json"
      },
      showHello: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    helloInit(e) {
      let _this = this;
      e.setSpeed(1.5);
      e.play();
      this.showHello = true;
      e.addEventListener("complete", () => {
        console.log("播放结束，销毁动画!");
        e.destroy();
        _this.showHello = false;
      });
    },
    sayHello() {
      //   this.helloEle.play();
      this.$refs.hello.lottieInit();
    },
    menuChange(status) {
      console.log("menuChange", status);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
@mainW: 75vw;
.menuList {
  padding: 20px 0 0 0;
  display: flex;
  .btn {
    margin-left: 5px;
    position: relative;
    z-index: 10;
  }
  .box {
    width: 0;
    overflow: hidden;
    transition: all linear 0.25s;
    .baffle {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.5);
      z-index: 5;
    }
    .fixedBox {
      width: 0;
      height: 100vh;
      position: fixed;
      background: #fff;
      left: 0;
      top: 0;
      z-index: 10;

      transition: all linear 0.25s;
      box-sizing: border-box;
      overflow: hidden;
      .content {
        width: @mainW;
        box-sizing: border-box;
        padding: 10px;
        text-align: center;
      }
    }
  }
  .changeMenu1,
  .changeMenu2 {
    width: @mainW!important;
    transition: all linear 0.25s;
  }
  .changeMenu2 {
    box-shadow: 0 0 10px #000;
    border-right: 1px solid #ccc;
  }

  .hello {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>