<template>
  <view>
    <search-input></search-input>
    <tabs :tabs="tabs" @tabsItemChange="handletabsItemChange">
      <block v-if="tabs[0].isActive">
        <navigator :url="'/pages/goods_detail/index?goods_id=' + item.goods_id" class="goods_item" v-for="item in goods_list" :key="item.goods_id">
          <!-- 左侧 图片容器 -->
          <view class="goods_img_warp">
            <img
              :src="item.goods_small_logo"
              alt=""
              mode="widthFix"
            />
          </view>
          <!-- 右侧 商品容器 -->
          <view class="goods_info_warp">
            <view class="goods_name">
              {{item.goods_name}}
            </view>
            <view class="goods_price"> ￥{{item.goods_price}} </view>
          </view>
        </navigator>
      </block>
      <block v-else-if="tabs[1].isActive">1</block>
      <block v-else="tabs[2].isActive">2</block>
    </tabs>
  </view>
</template>

<script>
import searchInput from "../../components/searchInput";
import tabs from "../../components/tabs";
import "../../utils/request";
import { request } from '../../utils/request';
export default {
  components: {
    searchInput,
    tabs,
  },
  data() {
    return {
      tabs: [
        {
          id: 0,
          value: "综合",
          isActive: true,
        },
        {
          id: 1,
          value: "销量",
          isActive: false,
        },
        {
          id: 2,
          value: "价格",
          isActive: false,
        },
      ],
      // 接口要的参数
      queryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10,
      },
      // 总页数
      totalPages: 0,
      // 商品数据列表
      goods_list: []
    };
  },
  onLoad(options) {
    this.queryParams.cid = options.cid
    this.getGoodsList()
  },
  // 上拉刷新
  onReachBottom() {   
    // 当前页数大于等于总页数,没有更多数据
    if(this.queryParams.pagenum >= this.totalPages) {
      uni.showToast({
        title: '没有更多数据了',
        duration: 2000
      });
    }else {
      // 加载下一页数据
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 重置页码
    this.queryParams.pagenum = 1
    // 发送请求
    this.getGoodsList()
  },
  methods: {
    // 标题点击事件,从子组件传来
    handletabsItemChange(index) {
      // 1.获取被点击标题索引
      // 2.修改源数组
      this.tabs.forEach((v, i) => {
        i === index ? (v.isActive = true) : (v.isActive = false);
      });
      // console.log(e)
    },
    // 获取商品数据
    async getGoodsList() {
      const res = await request({url: "/goods/search", data: this.queryParams})
      // console.log(res)     
      // 获取页面总页数
      this.totalPages = Math.ceil(res.total / this.queryParams.pagesize)
      // 上拉加载下一页数据,拼接goods_list数组数据
      this.goods_list = [...this.goods_list, ...res.goods]
      // 关闭上拉刷新效果,如果没有调用下拉刷新窗口,直接关闭也不会报错
      uni.stopPullDownRefresh()
    }
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>