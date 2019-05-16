<template>
  <!-- 该块为 lottie 的公共部分组件 -->
  <div :ref="loName"></div>
</template>

<script>
import lottie from "lottie-web";
export default {
  name: "lotties",
  props:['loName','options'],
  data() {
    return {};
  },
  mounted() {
      let opts = this.options;  
      let lottOpt = lottie.loadAnimation({
        container: this.$refs[this.loName], // 对应的dom
        renderer: "svg",
        loop: Boolean(opts.loop),  // 循环
        autoplay: Boolean(opts.autoplay), // 初始是否播放
        // path: "./lottie/72-favourite-app-icon.json" // the path to the animation json
        animationData: opts.animationData.default,
      });

      // 初始化时返回的参数包括：生成的lottie本身，元素本身
      this.$emit('lottieCreated', lottOpt, this.$refs[this.loName]); 
    //   console.log(this.$refs[this.loName],this.loName);
  },
  methods: {}
};
</script>