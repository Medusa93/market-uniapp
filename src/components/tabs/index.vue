<template>
  <view class="tabs">
    <view class="tabs_title">
      <view :class="['title_item', {'active': item.isActive}]" v-for="(item, index) in tabs" :key="index" :data-index="index" @click="handleItemTap">
        {{ item.value }}
      </view>
    </view>
    <view class="tabs_content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    tabs: {
      type: Array,
    },
  },
  methods: {
    handleItemTap(e) {     
      // 1.获取被点击的索引
      const { index } = e.currentTarget.dataset
      console.log(index)
      // 2.触发父组件事件
      this.$emit("tabsItemChange", index)

    }
  }
};
</script>
<style lang="scss" scoped>
@import "./tabs.scss";
</style>