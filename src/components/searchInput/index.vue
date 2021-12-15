<template>
  <view>
     <navigator url="/pages/search/index" open-type="navigate">
       搜索
     </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
view {
  height: 90rpx;  
  padding: 10rpx;
  background: $uni-color-theme;
  navigator {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15rpx;
    background: #fff;
  }
}
</style>