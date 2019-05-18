<template>
  <!-- 该块为 lottie 的公共部分组件 -->
  <div :ref="loName"></div>
</template>

<script>
import lottie from "lottie-web";
export default {
  name: "lotties",
  props:['loName','options','notInit'],
  data() {
    return {};
  },
  mounted() {
    //   console.log(this.$refs[this.loName],this.loName);
    // 判断是否进行初始化
    !this.notInit && this.lottieInit();
  },
  methods: {
    lottieInit(){
      let opts = this.options;

      let sendOpt = {
        container: this.$refs[this.loName], // 对应的dom
        renderer: "svg",
        loop: Boolean(opts.loop),  // 循环
        autoplay: Boolean(opts.autoplay), // 初始是否播放
      }
      
      if(opts.path){
        sendOpt.path = opts.path;
      }else{
        sendOpt.animationData = opts.animationData.default;
      }

      let lottOpt = lottie.loadAnimation(sendOpt);

      // 初始化时返回的参数包括：生成的lottie本身，元素本身
      this.$emit('lottieCreated', lottOpt, this.$refs[this.loName]); 
    },
  }
};
</script>