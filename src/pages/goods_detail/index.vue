<template>
  <view class="page">
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular>
      <swiper-item
        v-for="(item, index) in goodsObj.pics"
        :key="item.pics_id"
        :data-index="index"
        @click="handlePreviewImg"
      >
        <img :src="item.pics_mid" alt="" mode="widthFix" />
      </swiper-item>
    </swiper>
    <view class="goods_price">￥{{ goodsObj.goods_price }}</view>
    <view class="goods_name_row">
      <view class="goods_name">{{ goodsObj.goods_name }}</view>
      <view class="goods_collect">
        <text
          :class="['iconfont', isCollect ? 'icon-shoucang1' : 'icon-shoucang']"
          @click="handleCollect"
        ></text>
        <view class="collect_text">收藏</view>
      </view>
    </view>
    <view class="goods_info">
      <view class="goods_title"> 图文详情 </view>
      <view class="goods_content">
        <rich-text :nodes="goodsObj.goods_introduce"></rich-text>
      </view>
    </view>
    <view class="btm_tools">
      <view class="tools_item">
        <view class="iconfont icon-kefu"></view>
        <view>客服</view>
      </view>
      <view class="tools_item">
        <view class="iconfont icon-fenxiang"></view>
        <view>分享</view>
      </view>
      <navigator
        open-type="switchTab"
        url="/pages/cart/index"
        class="tools_item"
      >
        <view class="iconfont icon-31gouwuche"></view>
        <view>购物车</view>
      </navigator>
      <view class="tools_item btn-cart" @click="handleCartAdd">
        <view>加入购物车</view>
      </view>
      <view class="tools_item btn-buy">
        <view>立即购买</view>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from "../../utils/request";
export default {
  onLoad(options) {
    // 获取商品goods_id
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
    console.log(goods_id);
  },
  onShow(options) {
  },
  data() {
    return {
      // 商品详情数据
      goodsObj: {
        pics: [],
        goods_id: "",
        goods_price: "",
        goods_name: "",
        goods_introduce: "",
      },
      // 图片预览数据
      goodsInfo: {},
      // 商品是否被收藏过
      isCollect: false,
    };
  },
  methods: {
    // 获取商品详情数据
    async getGoodsDetail(goods_id) {
      const res = await request({
        url: "/goods/detail",
        data: {goods_id},
      });
      // this.goodsObj.pics = res.pics;
      // this.goodsObj.goods_price = res.goods_price;
      // this.goodsObj.goods_name = res.goods_name;
      // this.goodsObj.goods_id = res.goods_id
      this.goodsObj = res;
      // 后台部分手机不识别webp图片格式
      // 临时自己改确保后台在 1.webp => 1.jpg
      this.goodsObj.goods_introduce = res.goods_introduce.replace(
        /\.webp/g,
        ".jpg"
      );
      this.goodsInfo = this.goodsObj;
      console.log(res);
      //1.获取缓存中的商品收藏数组
      let collect = uni.getStorageSync("collect") || [];
      //2.判断当前商品是否被收藏
      this.isCollect = collect.some((v) => {
        v.goods_id === this.goodsInfo.goods_id;
      });
    },
    // 点击图片预览
    handlePreviewImg(e) {
      const urls = this.goodsInfo.pics.map((v) => v.pics_mid);
      const current = e.currentTarget.dataset.index;
      uni.previewImage({
        current,
        urls,
      });
    },
    // 点击添加购物车
    handleCartAdd() {
      // 获取缓存中的购物车数组
      let cart = uni.getStorageSync("cart") || [];
      // 获取商品索引
      const index = cart.findIndex(
        (v) => v.goods_id === this.goodsInfo.goods_id
      );
      if (index === -1) {
        // 不存在,第一次添加
        this.goodsInfo.num = 1;
        // 购物车checkbox选中
        this.goodsInfo.checked = true;
        cart.push(this.goodsInfo);
      } else {
        // 已存在的购物车数据,执行num++
        cart[index].num++;
      }
      // 把购物车重新添加到缓存中
      uni.setStorageSync("cart", cart);
      // 弹窗提示
      uni.showToast({
        title: "加入成功",
        mask: true,
      });
    },
    // 点击收藏商品
    handleCollect() {
      // 1.获取缓存中的收藏数组
      let collect = uni.getStorageSync("collect") || [];
      // 2.获取该商品的索引
      const index = collect.findIndex(
        (v) => v.goods_id === this.goodsInfo.goods_id
      );
      // 3.判断商品是否收藏过 index !== -1表示已收藏过
      if (index !== -1) {
        // 已收藏则取消收藏
        collect.splice(index, 1);
        this.isCollect = false;
        uni.showToast({
          title: "取消收藏",
          duration: 1000,
          mask: true,
        });
      } else {
        // 没有收藏过   
        collect.push(this.goodsInfo);
        this.isCollect = true;
        uni.showToast({
          title: "收藏成功",
          duration: 1000,
          mask: true,
        });
      }
      // 4.把数组存入缓存
      uni.setStorageSync("collect", collect);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>