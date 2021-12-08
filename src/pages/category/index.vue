<template>
  <view class="cates">
    <search-input></search-input>
    <view class="cate_container">
      <!-- 左侧菜单 -->
      <view class="left_menu">
        <scroll-view scroll-y>
          <view
            :class="['menu_item', {'active': index===currentIndex}]"
            v-for="(item, index) in leftMenuList"
            :key="index"
            :data-index="index"
            @click="handleItem"
          >
            {{ item }}
          </view>
        </scroll-view>
      </view>
      <!-- 右侧商品内容 -->
      <view class="right_content">
        <scroll-view scroll-y :scroll-top="scrollTop">
          <view
            class="goods_group"
            v-for="(item1, index1) in rightMenuList"
            :key="index1"
          >
            <!-- 标题 -->
            <view class="goods_title">
              <text class="delmiter">/</text>
              <text class="title">{{ item1.cat_name }}</text>
              <text class="delmiter">/</text>
            </view>
            <!-- 商品列表 -->
            <view class="goods_list">
              <navigator :url="['/pages/goods_list/index?cid=' + item2.cat_id]" v-for="item2 in item1.children" :key="item2.cat_id">
                <view class="image">
                  <img :src="item2.cat_icon" alt="" mode="widthFix" />
                </view>
                <view class="title">
                  {{ item2.cat_name }}
                </view>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from "@/utils/request";
import searchInput from "../../components/searchInput";
export default {
  components: {
    searchInput,
  },
  data() {
    return {
      // 商品分类数据
      cates: [],
      // 左侧菜单数据
      leftMenuList: [],
      // 右侧商品列表数据
      rightMenuList: [],
      // 当前点击的菜单项
      currentIndex: 0,
      // 右侧内容滚动条距离顶部内容
      scrollTop: 0,
    };
  },
  onLoad() {
    // 1.先判断本地存储有没有数据
    // {tiem: Date.now(), data: [...]}
    // 2.没有旧数据,直接发送新请求
    // 3.有旧数据,且没有过期,就直接用本地存储的旧数据

    // 获取本地存储数据
    const Cates = uni.getStorageSync("Cates");
    if (!Cates) {
      this.getCates();
    } else {
      // 有旧数据,定义过期时间 10s
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates();
      } else {
        // 可以使用旧数据
        this.cates = Cates.data;
        this.leftMenuList = this.cates.map((v) => v.cat_name);
        this.rightMenuList = this.cates[0].children;
      }
    }
  },
  methods: {
    // 获取商品分类数据
    async getCates() {
      const res = await request({ url: "/categories" });
      this.cates = res;
      // 把接口数据存入本地数据
      uni.setStorageSync("Cates", { time: Date.now(), data: this.cates });
      // 构造左侧大菜单数据
      this.leftMenuList = this.cates.map((v) => v.cat_name);
      // 构造右侧商品数据
      this.rightMenuList = this.cates[0].children;
    },
    // 左侧菜单的点击事件
    handleItem(e) {
      // 获取被点击标题的索引
      const { index } = e.currentTarget.dataset;
      this.currentIndex = index;
      // 获取商品数据
      this.rightMenuList = this.cates[index].children;
      // 重新设置右侧内容滚动条距离顶部距离
      this.scrollTop = this.scrollTop === 0 ? -1 : 0;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>