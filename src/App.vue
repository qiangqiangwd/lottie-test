<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  color: #333333;
}
body{
  background: #f4f4f4;
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

a{
  text-decoration: none;
}

.title1 {
  font-size: 18px;
  margin: 15px 0;
  border-left: 3px solid #2c84fc;
  padding-left: 10px;
  line-height: 1;
}
</style>
