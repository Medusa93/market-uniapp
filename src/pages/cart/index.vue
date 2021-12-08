<template>
  <view class="page">
    <!-- 收货地址 -->
    <view class="recive_address_row">
      <!-- 当地址不存在 显示按钮 -->
      <view v-if="!address.userName" class="address_btn">
        <button type="primary" plain @click="handleChooseAddress">
          获取收货地址
        </button></view
      >
      <!-- 当地址存在 显示详细信息 -->
      <view v-else class="user_info_row">
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
      <block v-if="cart.length">
        <view class="cart_content" v-for="(item, index) in cart" :key="index">        
        <view class="cart_item">
          <checkbox-group class="cart_checkbox" @change="handleChanged(index)">
            <checkbox :checked="item.checked"></checkbox>
          </checkbox-group>
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
                <view
                  class="goods_edit"
                  :data-id="item.goods_id"
                  data-operation="-1"
                  @click="handleNumEdit"
                  >-</view
                >
                <view class="goods_num">{{ item.num }}</view>
                <view
                  class="goods_edit"
                  :data-id="item.goods_id"
                  data-operation="1"
                  @click="handleNumEdit"
                  >+</view
                >
              </view>
            </view>
          </view>
        </view>
      </view>
      </block>
    <!-- 当没有商品,显示图片 -->
    <block v-else>
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe1b1467beea0a9c7d6a56b32bac6d7e5dcd914f7c3e6-YTwUd6_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641124612&t=5da6d24f46f7de74f7fc1c3161404fca"
        mode="widthFix"
      />
    </block>
    <!-- 底部工具栏 -->
    <view class="foot_tool">
      <checkbox-group @change="handleAllChecked">
        <checkbox :checked="allChecked">全选</checkbox>
      </checkbox-group>
      <view class="total_wrap">
        <view class="total_price_wrap">
          <view class="total_num"
            >合计: <text class="total_price">￥{{ totalPrice }}</text></view
          >
          <view class="content">包含运费</view>
        </view>
      </view>
      <view class="total_pay" @click="handlePay">结算({{ totalNum }})</view>
    </view>
  </view>
</template>

<script>
import { chooseAddress, showModal, showToast } from "../../utils/asyncWx.js";
export default {
  data() {
    return {
      address: {},
      address_all: "",
      cart: [],
      // 全选按钮
      allChecked: false,
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
    // every方法检测数组所有元素,有一个不满足条件返回false
    // 空数组返回true
    // this.allChecked = this.cart.length? this.cart.every(v => v.checked) : false
    this.setCart();
  },
  methods: {
    // 点击 获取收货地址
    async handleChooseAddress() {
      // 获取收货地址
      const address = await chooseAddress();
      // 地址存入本地
      uni.setStorageSync("address", address);
      console.log(address);
    },
    // 购物车状态
    setCart() {
      // 总价格和总数量
      this.allChecked = true;
      this.totalNum = 0;
      this.totalPrice = 0;
      this.cart.forEach((v) => {
        if (v.checked) {
          this.totalPrice += v.goods_price * v.num;
          this.totalNum += v.num;
        } else {
          this.allChecked = false;
        }
      });
      // 判断数组是否为空
      this.allChecked = this.cart.length ? this.allChecked : false;
      // 保存到本地缓存
      uni.setStorageSync("cart", this.cart);
    },
    // 购物车复选框
    handleChanged(index) {
      // 选中状态取反
      this.cart[index].checked = !this.cart[index].checked;
      // 设置购物车状态
      this.setCart();
    },
    // 商品全选功能
    handleAllChecked() {
      this.allChecked = !this.allChecked;
      // 保存到data数据中
      this.cart.forEach((v) => (v.checked = this.allChecked));
      // 设置购物车状态
      this.setCart();
    },
    // 商品数量编辑
    async handleNumEdit(e) {
      // 获取传递过来的参数
      const { operation, id } = e.currentTarget.dataset;
      // 需要修改的商品的索引
      const index = this.cart.findIndex((v) => v.goods_id === id);
      // 判断删除商品
      if (this.cart[index].num === 1 && Number(operation) === -1) {
        const res = await showModal({ content: "您是否要删除" });
        if (res.confirm) {
          this.cart.splice(index, 1);
          this.setCart();
        }
      } else {
        // 进行数量修改,operation为字符串修改为数字
        this.cart[index].num += Number(operation);
        // 设置缓存和data中
        this.setCart();
      }
    },
    // 结算
   async handlePay() {
      // 判断地址
      if(!this.address) {
        return await showToast({title:"您还没有选择收货地址"})
      }
      if(!this.totalNum) {
        return await showToast({title:"您还没有选购商品"})
      }
      uni.navigateTo({url: "/pages/pay/index"})
    }
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>