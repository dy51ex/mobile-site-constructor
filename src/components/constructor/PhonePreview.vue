<template>
    <div ref="phone" @dragenter.prevent @dragover.prevent class="phone-preview">
        <transition-group name="flip-list">
            <entity-group
                v-for="(components, entryIdx) in entries"
                :component="components"
                :key="getGroupIdentity(components)"
                @change="(componentIdx, component) => onGroupChange(entryIdx, componentIdx, component)"
                @add="onGroupEntryAdd(entryIdx, $event)"
                @move="onGroupEntryMove(entryIdx, $event)"
                @menu="onMenuClick(entryIdx, $event)"
                @delete="onComponentDelete(entryIdx, $event)"
                @edit="onComponentEdit(entryIdx, $event)"
                @group-move="onGroupMove(entryIdx, $event)"
            ></entity-group>
        </transition-group>
        <a-button @click.stop="onGroupAdd" shape="circle" size="small">
            <template #icon>
                <PlusOutlined />
            </template>
        </a-button>
    </div>
    <ant-drawer
        placement="right"
        :mask="false"
        v-model:visible="settings"
        class="settings"
        @close="toolbarStore.visible = true"
    >Тут должны быть настройки элемента, но их еще нет :(</ant-drawer>
    <ant-drawer placement="left" v-model:visible="menu" class="menu">
        <toolbar-area direction="column" :border="false" @click="onToolbarComponentClick" />
    </ant-drawer>
</template>

<script setup lang="ts">import { markRaw, ref } from 'vue';
import { components, CustomComponent } from '../constructor/entites'
import AntDrawer from 'ant-design-vue/es/drawer'
import EntityGroup from './EntityGroup.vue'
import PlusOutlined from '@ant-design/icons-vue/PlusOutlined'
import AButton from 'ant-design-vue/es/button'
import ToolbarArea from '../../views/ToolbarArea.vue'
import cloneDeep from 'lodash-es/cloneDeep';
import { toolbarStore } from '../../utils/toolbarStore';

const getGroupIdentity = (components: CustomComponent[]) => {
    return Reflect.get(components, 'id')
}

const createObjWithIdentity = (customComponent: CustomComponent) => {
    const copy = cloneDeep(customComponent)
    Reflect.defineProperty(copy, 'id', {
        value: Date.now(),
        enumerable: false,
    })
    return copy
}

const entries = ref<CustomComponent[][]>([])
const settings = ref(false)
const menu = ref(false)

const currentMenu = ref<{ groupIdx: number, componentIdx: number } | undefined>(undefined)
const onMenuClick = (groupIdx: number, componentIdx: number) => {
    currentMenu.value = { groupIdx, componentIdx }
    menu.value = true
}

const onToolbarComponentClick = (component: CustomComponent) => {
    if (!currentMenu.value || !component) {
        return
    }
    entries.value[currentMenu.value.groupIdx][currentMenu.value.componentIdx] = component
    menu.value = false
}

const currentDragged = ref<{ groupIdx: number, componentIdx: number } | undefined>(undefined)
const onGroupEntryMove = (groupIdx: number, componentIdx: number) => {
    currentDragged.value = { groupIdx, componentIdx }
}
const onGroupAdd = () => {
    const group = [components.Empty]
    Reflect.defineProperty(group, 'id', {
        value: Date.now(),
        enumerable: false,
    })
    entries.value.push(group)
}
onGroupAdd()

const onGroupEntryAdd = (groupIdx: number, componentIdx: number) => {
    entries.value[groupIdx].splice(componentIdx + 1, 0, createObjWithIdentity(components.Empty))
}

const onGroupChange = (groupIdx: number, componentIdx: number, component: CustomComponent) => {
    if (currentDragged.value) {
        entries.value[currentDragged.value.groupIdx][currentDragged.value.componentIdx] = components.Empty
        currentDragged.value = undefined
    }
    entries.value[groupIdx][componentIdx] = components.Empty
    entries.value[groupIdx][componentIdx] = component
}

const onComponentDelete = (groupIdx: number, componentIdx: number) => {
    const currentComponent = entries.value[groupIdx][componentIdx]
    if (currentComponent.name === 'Empty') {
        entries.value[groupIdx].splice(componentIdx, 1)
        if (entries.value[groupIdx].length === 0) {
            entries.value.splice(groupIdx, 1)
        }
        return
    }
    entries.value[groupIdx][componentIdx] = components.Empty
}

const onComponentEdit = (groupIdx: number, componentIdx: number) => {
    toolbarStore.value.visible = false
    const currentComponent = entries.value[groupIdx][componentIdx]
    settings.value = true
}

const onGroupMove = (groupIdx: number, direction: number) => {
    const group = entries.value[groupIdx]
    entries.value.splice(groupIdx, 1)
    entries.value.splice(groupIdx + direction, 0, group)
}


</script>

<style lang="scss" scoped>
.phone-preview {
    background-color: #fafafa;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    width: 100%;
    min-height: 900px;
    border: 10px solid #ccc;
    border-radius: 10px;
    max-width: 600px;
}
.flip-list-move {
    transition: transform 0.6s ease;
}
</style>

<style>
.ant-drawer-content-wrapper {
    min-width: 33vw;
}
.settings {
    opacity: 0.6;
}
</style>
