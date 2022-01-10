<template>
    <div class="entity-group-wrapper">
        <div class="entity-group" @dragend.stop="onEnd">
            <entity-entry
                v-for="(entry, idx) in currentComponents"
                :entry="entry"
                :component-data="entry"
                class="entity"
                editable
                deletable
                @dragstart="onEntityDrag(idx)"
                @change="(component) => onEntityChange(component, idx)"
                @menu="$emit('menu', idx)"
                @delete="$emit('delete', idx)"
                @edit="$emit('edit', idx)"
            />
            <a-button
                @click.stop="$emit('group-move', -1)"
                shape="circle"
                size="small"
                class="up-btn"
            >
                <template #icon>
                    <ArrowUpOutlined />
                </template>
            </a-button>
            <a-button
                @click.stop="$emit('group-move', 1)"
                shape="circle"
                size="small"
                class="down-btn"
            >
                <template #icon>
                    <ArrowDownOutlined />
                </template>
            </a-button>
        </div>
        <div class="separators">
            <div v-for="(entry, idx) in currentComponents">
                <a-button @click.stop="onEntryAdd(idx)" shape="circle" size="small">
                    <template #icon>
                        <PauseOutlined />
                    </template>
                </a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import EntityEntry from './EntityEntry.vue'
import AButton from 'ant-design-vue/es/button'
import PauseOutlined from '@ant-design/icons-vue/PauseOutlined'
import { ref, watch } from 'vue'
import ArrowUpOutlined from '@ant-design/icons-vue/ArrowUpOutlined'
import ArrowDownOutlined from '@ant-design/icons-vue/ArrowDownOutlined'
import { CustomComponent } from './entites'

const props = withDefaults(
    defineProps<{ component: CustomComponent[] }>(),
    { component: () => [], }
)
const emits = defineEmits<{
    (e: "change", idx: number, component: CustomComponent): void;
    (e: "add", idx: number): void;
    (e: "delete", index: number): void;
    (e: "edit", index: number): void;
    (e: "move", index: number): void;
    (e: "menu", index: number): void;
    (e: "group-move", direction: number): void;
}>();

const currentComponents = ref<CustomComponent[]>(props.component);

const onEntityDrag = (idx: number) => {
    emits('move', idx)
}

const onEnd = () => {
    document.querySelectorAll('.hovered').forEach((elem) => {
        elem.classList.remove('hovered')
    })
}

const onEntityChange = (component: CustomComponent, idx: number) => {
    emits('change', idx, component)
}
const onEntryAdd = (idx: number) => {
    emits('add', idx)
}

watch(
    () => props.component,
    () => { currentComponents.value = props.component },
    { immediate: true, deep: true }
);

</script>

<style lang="scss" scoped>
.entity-group-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.entity-group {
    position: relative;
    width: 100%;
    border: 1px dashed #ccc;
    border-radius: 2px;
    min-height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 5px;
}
.hovered {
    border: 1px dashed red;
}
.separators {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    margin-top: -10px;
    padding: 0 5px;
}
.up-btn {
    position: absolute;
    left: -10px;
    top: -10px;
}
.down-btn {
    position: absolute;
    left: -10px;
    bottom: -10px;
}
</style>