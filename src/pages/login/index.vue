<template>
  <view>
    <button type="primary" plain @click="getUserInfo">登录</button>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 获取个人信息
    getUserInfo() {
      uni.getUserProfile({
        desc: "个人信息",
        success: res => {
          const { userInfo } = res
          // console.log(userInfo)
          // 个人信息存储到本地
          uni.setStorageSync('userInfo', userInfo)
          // 返回上一个页面
          uni.navigateBack({
             delta: 1
          });
        }    
      })
    }
  }
};
</script>
<style scoped>
</style>