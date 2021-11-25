<template>
  <view class="content">
    <!-- 搜索框 -->
    <serachInput></serachInput>
    <!-- 轮播图 -->
    <view>
      <swiper class="index_swiper" indicator-dots autoplay circular>
        <swiper-item v-for="item in swiperList" :key="item.goods_id">
          <img :src="item.image_src" alt="" mode="widthFix" />
        </swiper-item>
      </swiper>
    </view>
    <!-- 导航栏 -->
    <view class="index_cate">
      <navigator v-for="(item, index) in cateList" :key="index">
        <img :src="item.image_src" alt="" mode="widthFix" />
      </navigator>
    </view>
    <!-- 楼层 -->
    <view class="index_floot">
      <view
        v-for="(item1, index) in floorList"
        :key="index"
        class="floor_group"
      >
        <view class="floor_title"
          ><img :src="item1.floor_title.image_src" alt="" mode="widthFix"
        /></view>
        <navigator v-for="(item2, index) in item1.product_list" :key="index">
          <img :src="item2.image_src" alt="" mode="widthFix" />
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import serachInput from "../../components/serachInput";
import { request } from "../../utils/request.js";
// import { uniCalendarm, uniCard } from "@dcloudio/uni-ui";
export default {
  // components: { uniCalendar, uniCard },
  components: { serachInput },
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
      // uni.request({
      //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
      //   success: (res) => {
      //     this.swiperList = res.data.message;
      //     // console.log(this.swiperList);
      //   },
      // });
      request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
      }).then((res) => (this.swiperList = res.data.message));
    },
    // 获取导航数据
    getNavigator() {
      // uni
      //   .request({
      //     url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
      //   })
      //   .then((res) => {
      //     this.cateList = res.data.message;
      //     console.log(this.cateList);
      //   });
      request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
      }).then((res) => (this.cateList = res.data.message));
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
        url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
      }).then((res) => (this.floorList = res.data.message));
    },
  },
};
</script>

<style lang="scss" scoped>
.index_swiper {
  width: 750rpx;
  height: 340rpx;
  img {
    width: 100%;
  }
}

.index_cate {
  display: flex;
  text-align: center;
  margin-top: 20rpx;
  navigator {
    width: 25%;
    img {
      width: 150rpx;
      height: 150rpx;
    }
  }
}
</style>
