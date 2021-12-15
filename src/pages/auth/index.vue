<template>
  <view>
    <button type="primary" plain @click="getUserInfo">获取授权</button>
  </view>
</template>

<script>
import { login } from "../../utils/asyncWx.js";
import { request } from "../../utils/request"
export default {
  data() {
    return {
      loginParams: {}
    };
  },
  methods: {    
    // 获取用户信息
    async getUserInfo() {
      // 1.获取用户信息
      uni.getUserInfo({
        provider: "weixin",
        success: (res) => {
          const { encryptedData, rawData, iv, signature } = res;
          this.loginParams = { encryptedData, rawData, iv, signature }   
          // console.log(this.loginParams)       
        },
      });
      // 2.获取小程序登录成功的code
      const { code } = await login()
      this.loginParams = {...this.loginParams, code}
      // console.log(this.loginParams)
      // 3.发送请求获取用户token
      const token = await request({url: "/users/wxlogin", method: "POST", data: this.loginParams})
      uni.setStorageSync('token', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
      console.log(token)
      // 4.把token存入缓存中,跳转到上一个页面
      uni.navigateBack({
         delta: 1
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>