<template>
  <view class="page">
    <view class="search_row">
      <input type="text" v-model="inputValue" placeholder="请输入您想搜索的商品" @input="handleInput" />
      <button :hidden="!isFocus" @click="handleCancel">取消</button>
    </view>
    <view class="search_content" >
      <navigator :url="'/pages/goods_detail/index?goods_id=' + item.goods_id" v-for="item in goods" :key="item.goods_id"  class="search_item">
        {{item.goods_name}}
      </navigator>
    </view>
  </view>
</template>

<script>
import { request } from "../../utils/request";
export default {
  data() {
    return {
      goods: [],
      TimeId: -1,
      // 取消按钮是否显示
      isFocus: false,
      // 输入框的值
      inputValue: ""
    };
  },
  methods: {
    handleInput(e) {
      // 1.获取输入值
      const { value } = e.detail;
      // 2.检测合法性
      if(!value.trim()) {
        // 不合法
        this.goods = []
        this.isFocus = false
        return
      } 
      this.isFocus = true    
      // 防抖 一般用于输入框 防止重复输入 重复发起请求
      // 节流 一般用于页面下拉或者上拉
      clearTimeout(this.TimeId)
      // 防抖定时器
      this.TimeId = setTimeout(() => {
        // 3.发起请求获取数据
        this.qsearch(value);
      }, 1000);     
    },
    // 搜索功能
    async qsearch(query) {
      const res = await request({ url: "/goods/qsearch", data: { query } });
      console.log(res);
      this.goods = res
    },
    // 点击取消按钮
    handleCancel() {
      this.inputValue = ""
      this.isFocus = false      
      this.goods = []
    }
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>