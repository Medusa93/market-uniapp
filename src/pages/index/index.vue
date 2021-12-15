<template>
<<<<<<< HEAD
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
=======
  <view class="content">
    <!-- 搜索框 -->
    <search-input></search-input>
    <!-- 轮播图 -->
    <view>
      <swiper class="index_swiper" indicator-dots autoplay circular>
        <swiper-item v-for="item in swiperList" :key="item.goods_id">
          <navigator :url="['/pages/goods_detail/index?goods_id=' + item.goods_id]">
            <img :src="item.image_src" alt="" mode="widthFix" />
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- 导航栏 -->
    <view class="index_cate">
      <navigator url="/pages/category/index" v-for="(item, index) in cateList" :key="index" open-type="switchTab">
        <img :src="item.image_src" alt="" mode="widthFix" />
      </navigator>
    </view>
    <!-- 楼层 -->
    <view class="index_floor">
      <view
        v-for="(item1, index) in floorList"
        :key="index"
        class="floor_group"
      >
        <!-- 标题 -->
        <view class="floor_title"
          ><img :src="item1.floor_title.image_src" alt="" mode="widthFix"
        /></view>
        <!-- 内容 -->
        <view class="floor_list">
          <navigator url="/pages/goods_list/index?query=服饰" v-for="(item2, index2) in item1.product_list" :key="index2">
            <img :src="item2.image_src" alt="" :mode="index2 === 0? 'widthFix' : 'scaleToFill'" />
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import searchInput from "../../components/searchInput";
import { request } from "../../utils/request.js";
// import { uniCalendarm, uniCard } from "@dcloudio/uni-ui";
export default {
  // components: { uniCalendar, uniCard },
  components: { searchInput },
  data() {
    return {
      // 轮播图数组
      swiperList: [],
      // 导航数组
      cateList: [],
      nav: ["category", "goods_list", "cart", "goods_detail"],
      // 楼层数组
      floorList: [],
    };
  },
  onLoad() {
    this.getSwiper();
    this.getNavigator();
    this.getFloorList();
  },
  methods: {
    // 获取轮播图数据
    getSwiper() {
      request({
        url: "/home/swiperdata",
      }).then((res) => (this.swiperList = res));
    },
    // 获取导航数据
    getNavigator() {
      request({
        url: "/home/catitems",
      }).then((res) => (this.cateList = res));
    },
    // goCate(index) {
    //   const url = "/pages/" + this.nav[index] + "/index";
    //   uni.navigateTo({
    //     url,
    //   });
    //   console.log(url);
    // },
    // 获取楼层数据
    getFloorList() {
      request({
        url: "/home/floordata",
      }).then((res) => (this.floorList = res));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss"
>>>>>>> main
</style>
