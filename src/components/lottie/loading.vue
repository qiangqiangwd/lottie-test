<template>
  <div id="loadingComponent">
    <div class="centerAnima">
      <loading loName="loading" :options="loadingOpt" @lottieCreated="init"></loading>
      <p class="tips" v-if='message'>{{message}}</p>
    </div>
  </div>
</template>

<script>
import loading from "@/components/lottie/lottie.vue";
import * as loading1 from "@/assets/lottie/loading1.json";
import * as loading2 from "@/assets/lottie/loading2.json";
import * as loading3 from "@/assets/lottie/loading3.json";
export default {
  components: {
    loading
  },
  props: ["message", "showType"],
  data() {
    return {
      loadingOpt: false,
      loadingElem: false,

      loadingType: [loading1, loading2, loading3]
    };
  },
  watch: {
    visibility(val) {
      console.log("发生了改变！！！", val, this.loadingOpt,this.showType);
      if (!val) {
        // console.log(this.loadingType[this.showType || 0]);
        this.loadingOpt = {
          animationData: this.loadingType[this.showType || 0],
        };
      }
    }
  },
  created(){
        this.loadingOpt = {
          animationData: this.loadingType[this.showType || 0],
          loop: true,
          autoplay: true
        }; 
  },
  methods: {
    init(e) {
        // console.log(e);
      this.loadingElem = e;
    }
  }
};
</script>
<style scoped lang="less">
#loadingComponent {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // background: rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.5);
  .centerAnima {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 80vw;
    .tips {
      text-align: center;
      // color: #666;
      color: #fff;
    }
  }
}
</style>