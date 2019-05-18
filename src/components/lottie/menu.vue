<template>
  <div class="menuBox" @click="_changeStatus">
    <div class="iconBox">
      <menuIcon class="icon" :options="options" @lottieCreated="init" loName="menuIcon"></menuIcon>
    </div>
    <div class="tips">{{tips}}</div>
  </div>
</template>

<script>
import menuIcon from "@/components/lottie/lottie.vue";
// 获取所需要的 json 数据
import * as animationData from "@/assets/lottie/menuButton1.json";
// import * as animationData from "@/assets/lottie/menuButton2.json";
// import * as animationData from "@/assets/lottie/menu.json";
export default {
  props:['tips','visibility'],
  components: { menuIcon },
  data() {
    return {
      _options: {},
      _menuLottie: false, // 元素

      _isShow: false //是否显示（默认否）
    };
  },
  watch:{
    visibility(val){
        val == this._isShow || (this._changeStatus());
    },
  },
  methods: {
    init(e) {
      this._menuLottie = e;
      this._menuLottie.setSpeed(3); // 速度加快 
    },
    _changeStatus() {
      let _isShow = this._isShow;

      // animation.playSegments(arr, forceFlag); // arr可以包含两个数字或者两个数字组成的数组，forceFlag表示是否立即强制播放该片段
        //   menuButton1.json
        this._menuLottie.playSegments(_isShow?[65,105]:[0,65], true);

    //   //   menu.json
    //   this._menuLottie.playSegments(_isShow ? [33, 64] : [11, 33], true);

      this._isShow = !_isShow;
      this.$emit('update:visibility',!_isShow); // 进行双向数据绑定
      this.$emit('menuChange',!_isShow); 
    }
  },
  created() {
    let visibility = this.visibility; // 初始是否显示
    this.options = {
      animationData: animationData
    };
  }
};
</script>
<style scoped lang="less">
.menuBox {
  display: flex;
  align-items: center;
  .tips{
    margin-left: 5px;
    font-size: 14px;
  }
  .iconBox {
      position: relative;
      width: 30px;
      height: 30px;
      overflow: hidden;
      border-radius: 5px;
    .icon {
      position: absolute;
      width: 30px;
      height: 30px;
      cursor: pointer;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
}
</style>