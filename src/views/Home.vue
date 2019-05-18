<template>
  <div>
    <menuList></menuList>
    <div>
      <router-link to="/rili">跳转日历</router-link>
      <router-link to="/lottiePage">跳转lottie动画组件</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// 导航列表
import menuList from "@/components/menuList.vue";
export default {
  name: "home",
  data() {
    return {
    };
  },
  components: {
    menuList
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
a{
  display: block;
  padding: 10px;
  text-align: center;
  margin: 20px;
  border: 1px solid #cccccc;
  font-size: 16px;
  border-radius: 4px;
  color: #333333;
  background: #ffffff;
}
</style>
