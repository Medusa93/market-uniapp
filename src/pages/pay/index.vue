<template>
  <view class="page">
    <!-- 收货地址 -->
    <view class="recive_address_row">
      <view class="user_info_row">
        <view class="user_info">
          <view class="user_name"> {{ address.userName }} </view>
          <view class="user_address">
            {{ address_all }}
          </view>
        </view>
        <view class="user_phone">
          {{ address.telNumber }}
        </view>
      </view>
    </view>
    <!-- 购物车 -->
    <view class="cart_title">购物车</view>
    <block>
      <view class="cart_content" v-for="(item, index) in cart" :key="index">
        <view class="cart_item">
          <navigator class="goods_img">
            <img mode="widthFix" :src="item.goods_small_logo" alt="" />
          </navigator>
          <view class="goods_info">
            <view class="goods_name">
              {{ item.goods_name }}
            </view>
            <view class="goods_price_warp">
              <view class="goods_price">￥{{ item.goods_price }}</view>
              <view class="goods_num_tool">
                <view class="goods_num">X {{ item.num }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </block>
    <!-- 底部工具栏 -->
    <view class="foot_tool">
      <view class="total_wrap">
        <view class="total_price_wrap">
          <view class="total_num"
            >合计: <text class="total_price">￥{{ totalPrice }}</text></view
          >
          <view class="content">包含运费</view>
        </view>
      </view>
      <view class="total_pay" @click="handleOrderPay"
        >支付({{ totalNum }})</view
      >
    </view>
  </view>
</template>

<script>
import {
  chooseAddress,
  showModal,
  showToast,
  requestPayment,
} from "../../utils/asyncWx.js";
import { request } from "../../utils/request";
export default {
  data() {
    return {
      address: {},
      address_all: "",
      cart: [],
      // 全选按钮
      totalPrice: 0,
      totalNum: 0,
    };
  },
  onShow() {
    // 获取收货地址
    this.address = uni.getStorageSync("address");
    this.address_all =
      this.address.provinceName +
      this.address.cityName +
      this.address.countyName +
      this.address.detailInfo;
    this.cart = uni.getStorageSync("cart") || [];
    // 复选框点确定的商品 checked = true
    this.cart = this.cart.filter((v) => v.checked);
    this.setCart();
  },
  methods: {
    // 购物车状态
    setCart() {
      // 总价格和总数量
      this.allChecked = true;
      this.totalNum = 0;
      this.totalPrice = 0;
      this.cart.forEach((v) => {
        this.totalPrice += v.goods_price * v.num;
        this.totalNum += v.num;
      });
      // 保存到本地缓存
      uni.setStorageSync("cart", this.cart);
    },
    // 支付按钮
    // 1.判断有没有token
    // 2.没有就跳转到授权页面 进行获取token
    // 3.有token...
    async handleOrderPay() {
      try {
        const token = uni.getStorageSync("token");
        if (!token) {
          uni.navigateTo({
            url: "/pages/auth/index",
          });
        }
        // 创建订单
        //1.创建请求头
        // const header = { Authorization: token };
        //2.创建请求提参数
        const order_price = this.totalPrice;
        const consignee_addr = this.address_all;
        const goods = [];
        this.cart.forEach((v) =>
          goods.push({
            goods_id: v.goods_id,
            goods_number: v.num,
            goods_price: v.goods_price,
          })
        );
        const orderParams = { order_price, consignee_addr, goods };
        //4.准备发送请求 创建订单 获取订单编号
        const { order_number } = await request({
          url: "/my/orders/create",
          method: "POST",
          data: orderParams,
        });
        // console.log(order_number)
        //5.发起支付接口
        const { pay } = await request({
          url: "/my/orders/req_unifiedorder",
          method: "POST",
          data: { order_number },
        });
        // console.log(pay)
        //6.发起微信支付
        await requestPayment(pay);
        //7.查询后台 订单状态
        const res = await request({
          url: "/my/orders/chkOrder",
          method: "POST",
          data: { order_number },
        });
        // console.log(res)
        await showModal({ title: "支付成功" });
        // 8.手动删除缓存中已支付的商品
        let newCart = this.cart.filter((v) => !v.checked);
        uni.setStorageSync("cart", newCart);
        // 9.支付成功了，跳转到订单页面
        uni.navigateTo({
          url: "/pages/order/index",
        });
      } catch (err) {
        await showModal({ title: "支付失败" });
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>