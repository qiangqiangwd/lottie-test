<template>
  <div class="home">
    <div class="starBox">
      <div class="star" @click="useStar(index)" v-for="(item,index) in 5" :key="item">
        <star :options="options[index]" @lottieCreated="init" :loName="'superStar' + index"></star>
      </div>
    </div>
  </div>
</template>

<script>
import star from "@/components/lottie.vue";
// 获取星星所需要的 json 数据
import * as animationData from "@/assets/lottie/72-favourite-app-icon.json";
export default {
  name: "starComponent",
  props: {
    //  星星数，默认 1
    starNumer: {
      default: 1
    }
  },
  data() {
    return {
      // 当前数据
      lottie: [],
      starNum: 1, // 星级数（默认0）

      // 组件部分数据
      options: []
    };
  },
  components: {
    star
  },
  watch: {
    // 防止当未传 starNumer 时，starNum的值不发生改变
    starNumer(val) {
      this.starNum = val;
    }
  },
  created() {
    this.starNum = this.starNumer || 1;
    // 设置初始星星数
    for (let i = 1; i <= 5; i++) {
      this.options.push({
        animationData: animationData,
        autoplay: i <= this.starNum
      });
    }
  },
  methods: {
    // 进行初始化
    init(e, ele) {
      this.lottie.push({
        e: e,
        isAdd: false,
        ele: ele
      });
    },
    useStar(index) {
      let starNum = this.starNum; // 获取之前选中的星星数

      if(starNum === index) return; // 若为当前数值不发生改变
      let loopNum = starNum > index ? starNum : index; // 循环星星数

      // 添加或取消之前的
      for (let i = 0; i <= loopNum; i++) {
        let opt = this.lottie[i];
        i > index ? 
            opt.e.goToAndStop(1, true) : // 变为取消状态
            opt.e.play(); // 变为选中状态
      }
      this.$emit("update:starNumer", index); //触发 input 事件，更改 starNumer 的值
      this.starNum = index;
    }
  }
};
</script>

<style lang="less">
.starBox {
  display: flex;
  .star {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
}
</style>

