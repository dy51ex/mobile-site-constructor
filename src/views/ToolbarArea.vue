<template>
  <div class="toolbar-area">
    <div
      class="toolbar-area-item"
      v-for="component of availableComponents"
      @click.stop="onComponentClick(component)"
    >
      <div class="toolbar-area-item__name">{{ component.hName }}:</div>
      <entity-entry
        draggable
        :disabled="component.toolbarProps?.disabled"
        :component-data="component"
        class="toolbar-area-item__preview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import filter from 'lodash-es/filter';
import { computed } from 'vue';
import { components, CustomComponent } from '../components/constructor/entites'
import EntityEntry from '../components/constructor/EntityEntry.vue'

const props = withDefaults(
  defineProps<{ direction?: 'row' | 'column', border?: boolean }>(),
  { direction: 'row', border: true }
);

const emits = defineEmits<{
  (e: "click", component: CustomComponent): void;
}>();

const borderValue = computed(() => props.border ? '3px solid #ccc' : 'none')

const availableComponents = filter(components, (component) => component.name !== 'Empty')

const onComponentClick = (component: CustomComponent) => {
  emits('click', component)
}
</script>

<style lang="scss" scoped>
.toolbar-area {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: v-bind(borderValue);
  border-radius: 3px;
  background-color: #fff;
  min-height: 200px;
  overflow: auto;
  &-item {
    position: relative;
    display: flex;
    flex-direction: v-bind(direction);
    gap: 10px;
    justify-content: space-between;
    &__name {
      min-width: 100px;
    }
  }
}
</style>