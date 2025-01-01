<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
    // 动态添加第一个脚本
    const script1 = document.createElement('script');
    script1.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.0/libs/cn/index.js';
    script1.async = true;
    document.body.appendChild(script1);

    // 等待第一个脚本加载完成后再添加第二个脚本
    script1.onload = () => {
        const script2 = document.createElement('script');
        script2.innerHTML = `
new CozeWebSDK.WebChatClient({
  config: {
    botId: '7355054488501764096',
  },
  userInfo: {
      id: '123',
      url: 'https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/obric/coze/favicon.1970.png',
      nickname: '3qweqweqwe',
    },
    ui: {
      base: {
          layout: 'mobile',
      }
    },
});

    `;
        document.body.appendChild(script2);
    };
});
</script>

<template>
    <div>
        <!-- 你的组件内容 -->
    </div>
</template>
