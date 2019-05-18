<template>
  <div>
    <navComponent title="lottie 动画使用示例"></navComponent>
    <div class="home">
      <!-- 评分组件 -->
      <div class="p10">
        <div class="p10">星星组件（{{starNumer}}星）</div>
        <stars :starNumer.sync="starNumer"></stars>
      </div>

      <!-- 选中组件 -->
      <div class="p10">
        <div class="p10">选中组件</div>
        <div class="flex">
          <checkComponent
            :index="index"
            @change="checkChange"
            :checked.sync="checked[index]"
            :label="'状态:' + checked[index]"
            v-for="(item,index) in checked"
            :key="index"
          ></checkComponent>
        </div>
        <div class="p10">
          <button class="button" @click="changeSSS">改变第一个单选按钮的状态</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// 星星
import stars from "@/components/lottie/star.vue";
// 选择
import checkComponent from "@/components/lottie/checkComponent.vue";
// 导航列表
import menuList from "@/components/menuList.vue";

import navComponent from '@/components/navComponent'
export default {
  name: "lottie",
  data() {
    return {
      // 星星组件 部分（当前星星数）
      starNumer: 5, // 必传
      // 单选框： 部分
      checked: [true, false, true] // 是否选中
    };
  },
  components: {
    stars,
    checkComponent,
    menuList,
    navComponent
  },
  mounted() {},
  methods: {
    // 单选框（函数）
    checkChange(opt) {
      console.log(this.checked,opt);
    },
    changeSSS() {
      let f = this.checked[0];
      this.checked.splice(0, 1, !f);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  padding: 20px;
  .p10 {
    padding: 10px 0;
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
