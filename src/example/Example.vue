<template>
    <VirtualWaterfall
        :virtual="waterfallOption.virtual"
        :gap="waterfallOption.gap"
        :padding="waterfallOption.padding"
        :preload-screen-count="[waterfallOption.topPreloadScreenCount, waterfallOption.bottomPreloadScreenCount]"
        :item-min-width="waterfallOption.itemMinWidth"
        :max-column-count="waterfallOption.maxColumnCount"
        :min-column-count="waterfallOption.minColumnCount"
        :calc-item-height="calcItemHeight"
        :items="data.list"
    >
        <template #default="{ item }: { item: ItemOption }">
            <Card
                @click="openPopup(item)"
                :item="item"
                :onlyImage="waterfallOption.onlyImage"
            />
        </template>
    </VirtualWaterfall>


    <!-- 优化后的弹窗结构 -->
    <transition name="popup-fade">
        <div
            v-if="showPopup"
            class="popup-overlay"
            @click.self="closePopup"
        ></div>
    </transition>

    <transition name="popup-scale">
        <div
            v-if="showPopup"
            class="popup-wrapper"
            role="dialog"
            aria-modal="true"
        >
            <div class="popup-content">
                <button
                    @click="closePopup"
                    class="close-button"
                    aria-label="关闭弹窗"
                >
                    <svg class="close-icon" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>

                <div class="popup-body">
                    <img
                        v-if="selectedItem?.avatar"
                        :src="selectedItem.avatar"
                        class="popup-image"
                        alt="详情图片"
                    />
                    <div class="markdown-content" v-html="renderedDetail"></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import VirtualWaterfall from '../vue-virtual-waterfall/virtual-waterfall.vue'
import Card from './Card.vue'
import useWaterfall from './useWaterfall.ts'
import { ref, computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const { backTop, waterfallOption, data, calcItemHeight } = useWaterfall()

const showPopup = ref(false)
const selectedItem = ref<ItemOption | null>(null)

const openPopup = (item: ItemOption) => {
    selectedItem.value = item
    showPopup.value = true
}

const closePopup = () => {
    showPopup.value = false
    selectedItem.value = null
}

const renderedDetail = computed(() => {
    marked.setOptions({
        async: false, // 强制同步模式
        // 其他配置...
    })
    if (!selectedItem.value?.detail) return ''
    const rawMarkdown = selectedItem.value.detail
    const cleanMarkdown = DOMPurify.sanitize(marked.parse(rawMarkdown) as string)
    return cleanMarkdown
})
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.page-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0; /* 覆盖上面三分之二区域 */
    left: 0;
    z-index: 9998; /* 确保在弹窗内容之下，但在其他页面元素之上 */
    background-color: rgba(0, 0, 0, 0.3); /* 灰暗层效果，透明度可根据需求调整 */
}

body {
    padding-top: 72px;
    background: #f1f2f6;
    user-select: none;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 72px;
    background-color: white;
    border-bottom: 1px solid #f1f2f6;

    strong {
        margin-right: 8px;
        font-size: 24px;
    }
}

aside {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    padding-top: 72px;
    background-color: white;
    border-left: 1px solid #f1f2f6;

    form {
        width: 100%;
        height: 100%;
        padding: 20px;

        p {
            margin: 0;
        }
    }
}
/* 优化后的样式 */
.popup-fade-enter-active,
.popup-fade-leave-active {
    transition: opacity 0.2s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
    opacity: 0;
}

.popup-scale-enter-active,
.popup-scale-leave-active {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.popup-scale-enter-from,
.popup-scale-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 9998;
}

.popup-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    width: 90%;
    max-width: 640px;
    max-height: 90vh;
}

.popup-content {
    position: relative;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    overflow: hidden;
}

.popup-body {
    padding: 0 0 0 0;
    max-height: 80vh;
    overflow-y: auto;
}

.close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 8px;
    background: rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 1000;

    &:hover {
        background: rgba(0, 0, 0, 0.15);
        transform: rotate(90deg);
    }

    .close-icon {
        width: 24px;
        height: 24px;
        fill: #666;
    }
}

.popup-image {
    width: 100%;
    max-height: 50vh;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.markdown-content {
    font-size: 16px;
    line-height: 1.7;
    color: #333;

    h1, h2, h3 {
        margin: 0.2em 0 0.2em;
        color: #2c3e50;
    }

    p {
        margin-bottom: 1.2em;
    }

    a {
        color: #3498db;
        text-decoration: underline;
    }

    code {
        padding: 2px 6px;
        background: #f8f9fa;
        border-radius: 4px;
        font-family: Monaco, Consolas, monospace;
    }

    pre {
        padding: 16px;
        background: #f8f9fa;
        border-radius: 8px;
        overflow-x: auto;
        margin: 16px 0;
    }

    blockquote {
        border-left: 4px solid #ddd;
        padding-left: 16px;
        color: #666;
        margin: 16px 0;
    }
}

@media (max-width: 640px) {
    .popup-wrapper {
        width: 95%;
    }

    .markdown-content {
        padding: 24px 16px;
    }

    .markdown-content {
        font-size: 14px;
    }
}
</style>
