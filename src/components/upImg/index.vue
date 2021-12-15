<template>
  <view class="upImg_item" >
    <img :src="src" alt="">
    <icon type="cancel" size="22" color="" />
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      value: ""
    },

  },
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss"
</style>