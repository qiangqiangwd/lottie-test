<template>
  <div class="navBox">
    <div class="fixedContent">
      <div class="topNav">
        <router-link :to="url||'/'">返回</router-link>
        <div class="title">{{title}}</div>
        <slot name="right">oth操作</slot>
      </div>
    </div>

    <div class="zanWei"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["url", "title"],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang='less'>
@navHeight: 50px;
.navBox {
  .fixedContent {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
}
.topNav {
  height: @navHeight;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background: #fff;
  font-size: 14px;
  position: relative;
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 55%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.zanWei {
  height: @navHeight;
  // margin-bottom: 10px;
}
</style>