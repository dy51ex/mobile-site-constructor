<template>
  <div class="constructor-area">
    <phone-preview></phone-preview>
  </div>
</template>

<script setup lang="ts">
import PhonePreview from '../components/constructor/PhonePreview.vue'
</script>

<style lang="scss">
.constructor-area {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>