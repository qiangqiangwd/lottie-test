<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
button {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  line-height: 1;
  background: #fff;
  outline: none;
  // transition: all linear .25s;
  &:active {
    box-shadow: 0 0 10px gold;
    // transition: all linear .25s;
  }
}
</style>
