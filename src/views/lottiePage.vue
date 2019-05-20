<template>
  <div>
    <navComponent title="lottie 动画使用示例"></navComponent>
    <div class="home">
      <div class="p10 careful">
        <p>注：</p>
        <p>1、官方地址：</p>
        <p>2、折里只是运用组件尝试，想要其他的可以自行下载 JSON 文件</p>
        <p>
          3、比较好的文章介绍地址：<br>
          <a
            href="http://test.imweb.io/topic/5b23a745d4c96b9b1b4c4efc"
            target="_blank"
          >lottie系列文章(一)：lottie介绍</a><br>
          <a
            href="http://test.imweb.io/topic/5b23a850d4c96b9b1b4c4efe"
            target="_blank"
          >lottie系列文章(二)：lottie最佳实践</a>
        </p>
        <p>4、<span class="lineT">(感觉又开了个新坑ORZ，)</span>要勇敢尝试啊，少年！</p>
      </div>
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

      <!-- 不同的加载 -->
      <div class="p10">
        <div class="p10">加载...</div>
        <loading
          :visibility.sync="visibility"
          :showType="showType"
          v-if="visibility"
          :message="loadMsg"
        ></loading>
        <div class="flex">
          <button @click="startLoading(0)">开始加载1</button>
          <button @click="startLoading(1)">开始加载2</button>
          <button @click="startLoading(2)">开始加载3</button>
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
// loading
import loading from "@/components/lottie/loading.vue";

import navComponent from "@/components/navComponent";
import { setTimeout } from "timers";
export default {
  name: "lottie",
  data() {
    return {
      // 星星组件 部分（当前星星数）
      starNumer: 5, // 必传
      // 单选框： 部分
      checked: [true, false, true], // 是否选中

      // 加载部分
      visibility: false,
      showType: 0, // 0,1,2
      loadMsg: ""
    };
  },
  components: {
    stars,
    checkComponent,
    menuList,
    navComponent,
    loading
  },
  mounted() {
    this.startLoading(2);
  },
  methods: {
    // 单选框（函数）
    checkChange(opt) {
      console.log(this.checked, opt);
    },
    changeSSS() {
      let f = this.checked[0];
      this.checked.splice(0, 1, !f);
    },

    startLoading(i) {
      this.visibility = true;
      this.loadMsg = i == 0 ? "sunshine!" : i == 1 ? "沙漏加载!" : "心动的感觉";
      this.showType = i;

      setTimeout(() => {
        this.visibility = false;
      }, 2000);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  padding: 20px;
  .careful{
  p{
    color: #ff4200;
    font-size: 14px;
    line-height: 1.5;
  }
  a{
    color: #2fa0ef;
    text-decoration: underline;
  }
  .lineT{
    text-decoration: line-through;
    color: #999999;
  }
}
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
