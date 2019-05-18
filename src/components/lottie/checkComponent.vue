<template>
  <div class="checkContent">
    <div @click="_change()" class="box">
      <checkCom :options="option" @lottieCreated="init" loName="checkBox" class="checkCom"></checkCom>
      <div class="label">{{label}}</div>
    </div>
  </div>
</template>

<script>
import checkCom from "@/components/lottie/lottie.vue";
// 获取所需要的 json 数据
import * as animationData from "@/assets/lottie/Check-Mark-Success-Data.json";
export default {
  name: "checkComponent",
  props: {
    //  星星数，默认 1
    checked: {
      default: false // 当前是否选中
    },
    label:{
       default: '', //名称
    },
    index:{
       default: 0, //当前第几个
    }
  },
  data() {
    return {
        option:{}, // 组件的参数

        lottie:false,

        _checked:false,  // 当前是否选中（私有属性）
    };
  },
  components: {
    checkCom
  },
  watch:{
    checked(val){
      if(val !== this._checked){
        this._change();
      }
    },
  },
  created() {
    this.option = {
      animationData:animationData,
      autoplay:this.checked
    }

    this._checked = this.checked;
  },
  methods: {
    // 进行初始化
    init(e, ele) {
      this.lottie = e;
    },
    _change(){
      // 播放方向，正数和0为正常播放，负数为倒放，第二个参数动画名可选。
      this.lottie.setDirection(this._checked?-1:0);
      this.lottie.play();

      // this.checked = !this.checked;
      this.$emit('update:checked',!this._checked);
      this.$emit('change',{
        checked:!this._checked,
        label:this.label,
        index:this.index,
      });
      this._checked = !this._checked;
    },
  },
};
</script>

<style lang="less">
.checkContent{
  display: inline-block;
  .box{
    display: flex;
    align-items: center;
    .label{
      margin-left: 10px;
    }
  }
  .checkCom {
    width: 30px;
    height: 30px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 50%;
    box-sizing: border-box;
  }
}
</style>

