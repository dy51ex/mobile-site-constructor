<template>
    <div class="entity-entry" @drop.stop="onDrop">
        <div
            draggable="true"
            @dragstart="onDrag($event, currentComponent!.name)"
            class="entity-entry-wrapper"
        >
            <transition name="bounce" mode="out-in">
                <component
                    v-if="currentComponent && currentComponent.renderer"
                    :key="currentComponent.id"
                    :is="currentComponent.renderer"
                    :style="currentComponent.style"
                    :disabled="disabled"
                    draggable
                    @click="onComponentClick"
                ></component>
            </transition>
        </div>

        <a-button
            v-if="deletable"
            @click.stop="$emit('delete')"
            shape="circle"
            size="small"
            class="delete-btn"
        >
            <template #icon>
                <DeleteOutlined />
            </template>
        </a-button>
        <a-button
            v-if="currentComponent?.name !== 'Empty' && deletable"
            @click.stop="$emit('edit')"
            shape="circle"
            size="small"
            class="settings-btn"
        >
            <template #icon>
                <SettingOutlined />
            </template>
        </a-button>
    </div>
</template>

<script setup lang="ts">
import { markRaw, ref, watch } from "vue";
import { components, CustomComponent } from "./entites";
import AButton from 'ant-design-vue/es/button'
import DeleteOutlined from '@ant-design/icons-vue/DeleteOutlined'
import SettingOutlined from '@ant-design/icons-vue/SettingOutlined'

const props = withDefaults(
    defineProps<{ componentData: CustomComponent, deletable?: boolean, disabled?: boolean }>(),
    { componentData: undefined, deletable: false, disabled: false }
);

const emits = defineEmits<{
    (e: "change", component: CustomComponent): void;
    (e: "menu"): void;
    (e: "delete"): void;
    (e: "edit"): void;
}>();

const currentComponent = ref<CustomComponent | undefined>(props.componentData);

watch(
    () => props.componentData,
    () => {
        currentComponent.value = props.componentData ? {
            ...props.componentData,
            renderer: markRaw(props.componentData.renderer || {}),
        } : undefined;
    },
    { immediate: true, deep: true }
);

const onDrop = (e: DragEvent) => {
    document.querySelectorAll(".hovered").forEach((elem) => {
        elem.classList.remove("hovered");
    });
    if (!e.dataTransfer) {
        return
    }
    const componentName = e.dataTransfer.getData("component");
    emits('change', {
        ...components[componentName],
        renderer: markRaw(components[componentName].renderer),
    })
};

const onDrag = (e: DragEvent, componentName: string) => {
    if (!e.dataTransfer) {
        return
    }
    e.dataTransfer.setData("component", componentName);
};

const onComponentClick = (type: string) => {
    if (type === 'menu') {
        emits('menu')
    }
}

</script>

<style lang="scss" scoped>
.entity-entry {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    border: 1px dashed #eee;
    border-radius: 2px;
    position: relative;
    .delete-btn {
        position: absolute;
        right: 0px;
        top: 0px;
    }
    .settings-btn {
        position: absolute;
        right: 0px;
        bottom: 0px;
    }
    &-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.bounce-enter-active {
    animation: bounce-in 0.4s;
}
.bounce-leave-active {
    animation: bounce-in 0.4s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
