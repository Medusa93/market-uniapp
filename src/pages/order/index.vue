<template>
  <view>
    <tabs :tabs="tabs" @tabsItemChange="handletabsItemChange"></tabs>
    <view class="order_main">
      <view class="order_item" v-for="(item, index) in orders" :key="index">
        <view class="order_wrap">
          <view class="order_title">订单编号</view>
          <view class="order_number">{{ item.order_number }}</view>
        </view>
        <view class="order_wrap">
          <view class="order_title">订单价格</view>
          <view class="order_price">￥{{ item.order_price }}</view>
        </view>
        <view class="order_wrap">
          <view class="order_title">订单日期</view>
          <view class="order_create_time">{{ item.create_time }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import tabs from "../../components/tabs";
import { request } from "../../utils/request";
export default {
  components: {
    tabs,
  },
  onShow(options) {
    // 判断是否有token
    const token = wx.getStorageSync("token");
    // 没有token 跳转到授权页
    if (!token) {
      uni.navigateTo({
        url: "/pages/auth/index",
      });
      return;
    }
    // 1.获取当前小程序的页面栈-数组,长度最大是10页面
    const pages = getCurrentPages();
    // 2.数组中索引最大的页面,就是当前页面
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    // 3.获取url上的type参数
    const { type } = currentPage.options;
    // 4.激活选中页面标题 当type=1 index=0
    this.changeTitleByIndex(type - 1);
    this.getOrders(type);
  },
  data() {
    return {
      tabs: [
        {
          id: 0,
          value: "全部",
          isActive: true,
        },
        {
          id: 1,
          value: "待付款",
          isActive: false,
        },
        {
          id: 2,
          value: "待收货",
          isActive: false,
        },
        {
          id: 3,
          value: "退款/退货",
          isActive: false,
        },
      ],
      // 订单列表
      orders: [],
    };
  },
  methods: {
    // 根据标题索引来激活选中 标题数组
    changeTitleByIndex(index) {
      // 2.修改源数组
      this.tabs.forEach((v, i) => {
        i === index ? (v.isActive = true) : (v.isActive = false);
      });
    },
    handletabsItemChange(index) {
      // 1.获取被点击标题索引
      // 重新发送请求 type=1 index=0
      this.changeTitleByIndex(index);
      this.getOrders(index + 1);
      // console.log(e)
    },
    // 获取历史订单数据
    async getOrders(type) {
      const res = await request({ url: "/my/orders/all", data: { type } });
      this.orders = res.orders
      // 更改时间格式
      this.orders.forEach(v => {
        v.create_time = new Date(v.create_time*1000).toLocaleString()
      });
      // this.orders = res.orders.map(v => ({...v, create_time_cn: new Date(v.create_time*1000).toLocaleString()}))
      console.log(this.orders);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>