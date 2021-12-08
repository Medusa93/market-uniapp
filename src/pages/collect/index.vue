<template>
  <view>
    <tabs :tabs="tabs" @tabsItemChange="handletabsItemChange"></tabs>
    <view class="collect_main">
      <view class="collect_title">
        <text class="collect_tips active">全部</text>
        <text class="collect_tips">正在热卖</text>
        <text class="collect_tips">即将上线</text>
      </view>
      <navigator
        :url="'/pages/goods_detail/index?goods_id=' + item.goods_id"
        class="goods_item"
        v-for="item in collect"
        :key="item.goods_id"
      >
        <!-- 左侧 图片容器 -->
        <view class="goods_img_warp">
          <img :src="item.goods_small_logo" alt="" mode="widthFix" />
        </view>
        <!-- 右侧 商品容器 -->
        <view class="goods_info_warp">
          <view class="goods_name">
            {{ item.goods_name }}
          </view>
          <view class="goods_price"> ￥{{ item.goods_price }} </view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script>
import tabs from "../../components/tabs";
export default {
  components: {
    tabs,
  },
  onShow() {
    this.collect = uni.getStorageSync('collect')
  },
  data() {
    return {
      tabs: [
        {
          id: 0,
          value: "商品收藏",
          isActive: true,
        },
        {
          id: 1,
          value: "品牌收藏",
          isActive: false,
        },
        {
          id: 2,
          value: "店铺收藏",
          isActive: false,
        },
        {
          id: 3,
          value: "浏览足迹",
          isActive: false,
        },
      ],
      collect: []
    };
  },
  methods: {
    // 根据标题索引来激活选中 标题数组
    handletabsItemChange(index) {
      this.tabs.forEach((v, i) =>
        i === index ? (v.isActive = true) : (v.isActive = false)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>