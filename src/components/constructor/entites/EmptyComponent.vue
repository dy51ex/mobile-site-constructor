<template>
    <div class="empty-component">
        <a-button @click.stop="$emit('click', 'menu')" shape="circle" size="small">
            <template #icon>
                <PlusOutlined />
            </template>
        </a-button>
    </div>
</template>

<script setup lang="ts">
import AButton from 'ant-design-vue/es/button'
import PlusOutlined from '@ant-design/icons-vue/PlusOutlined'

</script>

<style lang="scss">
.empty-component {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>