<template>
  <view>
    <tabs :tabs="tabs" @tabsItemChange="handletabsItemChange"> </tabs>
    <view class="fb_main">
      <view class="fb_title">问题的种类</view>
      <view class="fb_tips">
        <text>功能建议</text>
        <text>购买遇到问题</text>
        <text>性能问题</text>
        <text>其他</text>
      </view>
      <view class="fb_content">
        <textarea v-model="textVal" placeholder="请描述您的问题"></textarea>
        <view class="fb_tools">
          <button @click="handleChooseImg">+</button>
          <view
            v-for="(item, index) in chooseImgs"
            :key="index"
            class="up_Img_item"
            @click="handleRemoveImg"
          >
            <upImg :src="item"></upImg>
          </view>
        </view>
      </view>
      <view class="fb_btn">
        <button @click="handleFormSubmit">
          <icon type="success_no_circle" color="white" />
          提交
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import tabs from "../../components/tabs";
import upImg from "../../components/upImg";
export default {
  components: {
    tabs,
    upImg,
  },
  data() {
    return {
      tabs: [
        {
          id: 0,
          value: "体验问题",
          isActive: true,
        },
        {
          id: 1,
          value: "商品、商家投诉",
          isActive: false,
        },
      ],
      // 图片路径列表
      chooseImgs: [],
      // 文本框输入内容
      textVal: "",
      // 上传图片路径
      uploadImgs: [],
    };
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
    //  点击按钮 添加图片
    handleChooseImg() {
      uni.chooseImage({
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["camera", "album"], //从相机、相册选择 默认二者都有
        success: (res) => {
          // 获取图片路径数组
          this.chooseImgs = [...this.chooseImgs, ...res.tempFilePaths];
        },
      });
    },
    // 删除图片
    handleRemoveImg(index) {
      this.chooseImgs.splice(index, 1);
    },
    // 点击提交
    handleFormSubmit() {
      // 判断是否有输入
      if (!this.textVal.trim()) {
        uni.showToast({
          title: "输入不合法",
          duration: 1000,
          mask: true,
        });
        return;
      }
      uni.showLoading({
        title: "正在上传中",
        mask: true,
      });

      // 判断有没有需要上传的图片数组
      if (this.chooseImgs.length) {
        this.chooseImgs.forEach((v, i) => {
          // 上传文件API不支持多文件一起上传 遍历数组 挨个上传
          uni.uploadFile({
            // 图片要上传到哪
            url: "https://imgurl.org/",
            // 被上传的文件路径
            filePath: v,
            // 上传文件的名称 后台来获取文件 file
            name: "file",
            // 顺带的文本信息
            formData: {},
            success: (res) => {
              console.log(res);
              // let url = JSON.parse(res.data).url
              // 所有图片上传完毕才触发
              if (i === this.chooseImgs.length - 1) {
                uni.hideLoading();
                console.log("把文本和图片数组上传到后台");
                // 重置页面
                this.textVal = "";
                this.chooseImgs = [];
                // 返回上一个页面
                uni.navigateBack({
                  delta: 1,
                });
              }
            },
          });
        });
      } else {
        uni.hideLoading();
        console.log("只是提交了文本");
        uni.navigateBack({
           delta: 1
        });
      }
    },
  },
};
</script>
<style lang="scss" >
@import "./index.scss";
</style>