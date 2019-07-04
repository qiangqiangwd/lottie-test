<template>
  <div class="gameHelp">
    <div class="changeList">
      <div class="list" v-for="(item,index) in mapArray" :key="index">
        <!-- <input type="text" value='1' v-for="item in 30" :key='item'/> -->
        <select
          :class="['road',mapArray[index][idx] == 1 ? 'road':'wall']"
          v-for="(itm,idx) in item"
          :key="idx"
          v-model="mapArray[index][idx]"
          @change="mapChange(index,idx)"
        >
          <option value="1">路</option>
          <option value="2">墙</option>
        </select>
      </div>
    </div>
    <div class="valueArr">值：{{valueString}}</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      mapArray: [],
      valueString: "" // 显示的值
    };
  },
  methods: {
    mapChange(index, idx) {
      //   console.log(this.mapArray[index][idx]);
      this.getValueString();
    },
    // 显示的值获取
    getValueString() {
      let mapArray = this.mapArray;
      let valueString = "[";

        //   [[0-6-2,0-7-2],[1-9-2,1-10-2],[2-9-2],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]] 的形式
      for (let i = 0; i < mapArray.length; i++) {
        // valueString += "[";
        for (let j = 0; j < mapArray[i].length; j++) {
          let val = mapArray[i][j];
          if (val != 1) {
            // 若不为路，则进行记录
            valueString += `'${i}-${j}-${val}',`;
          }
        }
        // valueString += "],";
      }
       valueString = valueString.replace(/,$/,''); // 清除最后一位 ,
    //   valueString = valueString.slice(0, -1);
      valueString += "]";
      //   console.log(mapArray,valueString);
      this.valueString = valueString;
    }
  },
  mounted() {
    let mapArray = [];
    for (let i = 0; i < 30; i++) {
      mapArray.push([]);
      for (let j = 0; j < 30; j++) {
        mapArray[i].push("1");
      }
    }

    this.mapArray.push(...mapArray);
  }
};
</script>
<style scoped lang="less">
.gameHelp {
  display: flex;

  .list {
    display: flex;
  }
  .road {
    width: 20px;
    height: 20px;
    outline: none;
    text-align: center;
    box-sizing: border-box;
    border: none;
    background: #71af26;
  }
  .wall {
    background: #f19120;
  }
  select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    color: #333333;
  }
}
</style>