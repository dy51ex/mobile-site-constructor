import AButton from "ant-design-vue/lib/button";
import APageHeader from "ant-design-vue/lib/page-header";
import ADivider from "ant-design-vue/lib/divider";
import ADatePicker from "ant-design-vue/lib/date-picker";
import AImage from "ant-design-vue/lib/image";
import { Textarea } from "ant-design-vue/lib/input";
import AAvatar from "ant-design-vue/lib/avatar";
import ACarousel from "ant-design-vue/lib/carousel";
import { h, VNode } from "vue";
import EmptyComponent from "./EmptyComponent.vue";

const defaultStyles = {
  width: "100%",
  height: "100%",
};

export interface ToolbarProps {
  disabled?: boolean;
}

export interface CustomComponent {
  id?: number;
  name: string;
  hName: string;
  renderer: VNode;
  style: Partial<CSSStyleDeclaration>;
  toolbarProps?: ToolbarProps;
}

export interface CustomComponentsMap {
  [key: string]: CustomComponent;
}

export const components: CustomComponentsMap = {
  Empty: {
    renderer: h(EmptyComponent),
    name: "Empty",
    hName: "Пустой",
    style: { ...defaultStyles },
  },
  Textarea: {
    renderer: h(Textarea, {
      style: { touchAction: "auto" },
      onClick: (e: MouseEvent) => (e.target as HTMLInputElement).focus(),
    }),
    name: "Textarea",
    hName: "Текст",
    style: { ...defaultStyles },
  },
  AButton: {
    renderer: h(AButton, null, { default: () => "Кнопка" }),
    name: "AButton",
    hName: "Кнопка",
    style: { ...defaultStyles },
  },
  APageHeader: {
    renderer: h(APageHeader, {
      title: "Заголовок",
      subTitle: "Описание",
    }),
    name: "APageHeader",
    hName: "Заголовок",
    style: { ...defaultStyles },
  },
  ADivider: {
    renderer: h(ADivider, { type: "horizontal", plain: true }),
    name: "ADivider",
    hName: "Разделитель",
    style: { ...defaultStyles },
  },
  ADatePicker: {
    renderer: h(ADatePicker, {}),
    name: "ADatePicker",
    hName: "Дата",
    style: { ...defaultStyles },
    toolbarProps: { disabled: true },
  },
  AAvatar: {
    renderer: h(AAvatar, {}),
    name: "AAvatar",
    hName: "Аватар",
    style: { ...defaultStyles },
  },
  ACarousel: {
    renderer: h(
      ACarousel,
      {
        autoplay: true,
        autoplaySpeed: 2000,
      },
      {
        default: () => [
          h(AImage, {
            preview: false,
            src: "https://picsum.photos/600/200?1",
          }),
          h(AImage, {
            preview: false,
            src: "https://picsum.photos/600/200?2",
          }),
          h(AImage, {
            preview: false,
            src: "https://picsum.photos/600/200?3",
          }),
        ],
      }
    ),
    name: "ACarousel",
    hName: "Слайдер",
    style: {
      ...defaultStyles,
      backgroundColor: "#364d79",
    },
  },
  AImage: {
    renderer: h(
      "div",
      {
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      h(AImage, {
        preview: false,
        src: "https://picsum.photos/300/150",
      })
    ),
    name: "AImage",
    hName: "Картинка",
    style: { ...defaultStyles },
  },
};
