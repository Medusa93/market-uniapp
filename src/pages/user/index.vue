<template>
  <view>
    <view class="user_info_wrap">
      <view v-if="userInfo.avatarUrl" class="img_info_wrap">
        <img :src="userInfo.avatarUrl" alt="" class="img_bg" />
        <view class="img_info">
          <img :src="userInfo.avatarUrl" alt="" class="user_icon" />
          <view class="user_name">{{ userInfo.nickName }}</view>
        </view>
      </view>
      <navigator v-else class="login_btn" url="/pages/login/index">
        <button type="primary" plain>登录</button>
      </navigator>
    </view>
    <view class="user_content">
      <view class="user_main">
        <!-- 历史记录 -->
        <view class="history_wrap">
          <navigator>
            <view class="his_number">0</view>
            <view class="his_name">收藏的店铺</view>
          </navigator>
          <navigator url="/pages/collect/index">
            <view class="his_number">{{collectNums}}</view>
            <view class="his_name">收藏的商品</view>
          </navigator>
          <navigator>
            <view class="his_number">0</view>
            <view class="his_name">关注的商品</view>
          </navigator>
          <navigator>
            <view class="his_number">0</view>
            <view class="his_name">我的足迹</view>
          </navigator>
        </view>
        <!-- 我的订单 -->
        <view class="order_content">
          <view class="order_title">我的订单</view>
          <view class="order_wrap">
            <navigator url="/pages/order/index?type=1">
              <view class="iconfont icon-ding_dan"></view>
              <view class="order_name">全部订单</view>
            </navigator>
            <navigator url="/pages/order/index?type=2">
              <view class="iconfont icon-dingdandaifukuan"></view>
              <view class="order_name">待付款</view>
            </navigator>
            <navigator url="/pages/order/index?type=3">
              <view class="iconfont icon-daishouhuo"></view>
              <view class="order_name">待收货</view>
            </navigator>
            <navigator>
              <view class="iconfont icon-tuikuan"></view>
              <view class="order_name">退款/退货</view>
            </navigator>
          </view>
        </view>
        <!-- 收货地址 -->
        <view class="address_info">收货地址管理</view>
        <!-- 应用信息相关 -->
        <view class="app_info_wrap">
          <view class="app_item_wrap app_contact">
            <text>联系客服</text>
            <text>400-618-4000</text>
          </view>
          <navigator url="/pages/feedback/index" class="app_item_wrap">
            <!-- <button open-type="feedback" >意见反馈</button> -->
            意见反馈
          </navigator>
          <view class="app_item_wrap">关于我们</view>
        </view>
        <!-- 推荐 -->
        <view class="recommend_wrap">把应用推荐给别人</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 用户信息
      userInfo: {},
      // 商品收藏数量
      collectNums: 0
    };
  },
  onShow() {
    // 获取用户信息
    this.userInfo = uni.getStorageSync("userInfo");
    console.log(this.userInfo);
    // 获取商品收藏数量
    this.collectNums = uni.getStorageSync('collect').length
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>