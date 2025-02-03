<template>
    <article
        class="card"
        :data-id="item.id"
    >
        <div
            class="body"
            v-if="!onlyImage"
        >
            <!-- 新增外层容器用于实现左右布局 -->
            <div
                class="title-and-related-container"
                style="display: flex; gap: 12px"
            >
                <!-- 标题部分 -->
                <div>
                    <h3>{{ item.name }}</h3>

                    <span class="location">
                        <svg
                            t="1734265007319"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="1626"
                            width="15"
                            height="15"
                            style="margin-top: -6px"
                        >
                            <path
                                d="M512 31.9488c-176.4352 0-320 143.5648-320 320 0 186.5728 248.7296 558.8992 320 632.2176 71.3728-73.3184 320-445.5424 320-632.2176 0-176.4352-143.5648-320-320-320z m0 464.0768c-79.5648 0-143.9744-64.512-143.9744-143.9744s64.512-143.9744 143.9744-143.9744 143.9744 64.512 143.9744 143.9744S591.5648 496.0256 512 496.0256z"
                                fill="#F0EEE2"
                                p-id="1627"
                            ></path>
                            <path
                                d="M512 752.0256c-48.7424 0-96.0512 15.9744-134.8608 45.4656C432.128 885.1456 484.864 956.3136 512 984.1664c27.136-27.8528 79.872-99.0208 134.8608-186.7776-38.8096-29.3888-86.1184-45.3632-134.8608-45.3632z"
                                fill="#BBAA9C"
                                p-id="1628"
                            ></path>
                            <path
                                d="M304.0256 352.0512h-31.9488c-8.8064 0.2048-15.7696 7.5776-15.5648 16.384 0.2048 8.4992 7.0656 15.36 15.5648 15.5648h31.9488c8.8064-0.2048 15.7696-7.5776 15.5648-16.384-0.2048-8.4992-7.0656-15.36-15.5648-15.5648z m384 63.8976H640c-8.8064 0.2048-15.7696 7.5776-15.5648 16.384 0.2048 8.4992 7.0656 15.36 15.5648 15.5648h48.0256c8.8064 0.2048 16.1792-6.7584 16.384-15.5648s-6.7584-16.1792-15.5648-16.384h-0.8192z m-416.0512-256H384c8.8064-0.2048 15.7696-7.5776 15.5648-16.384-0.2048-8.4992-7.0656-15.36-15.5648-15.5648H271.9744c-8.8064 0.2048-15.7696 7.5776-15.5648 16.384 0.2048 8.4992 7.0656 15.36 15.5648 15.5648z m527.9744 48.0256h-64c-8.8064 0.2048-15.7696 7.5776-15.5648 16.384 0.2048 8.4992 7.0656 15.36 15.5648 15.5648h64c8.8064-0.2048 15.7696-7.5776 15.5648-16.384-0.1024-8.4992-6.9632-15.36-15.5648-15.5648zM608.0512 832h-64c-8.8064 0-15.9744 7.168-15.9744 15.9744s7.168 15.9744 15.9744 15.9744h64c8.8064 0 15.9744-7.168 15.9744-15.9744s-7.168-15.9744-15.9744-15.9744zM463.9744 640h-64c-8.8064 0.2048-15.7696 7.5776-15.5648 16.384 0.2048 8.4992 7.0656 15.36 15.5648 15.5648h64c8.8064 0.2048 16.1792-6.7584 16.384-15.5648s-6.7584-16.1792-15.5648-16.384h-0.8192z m144.0768-64c-8.8064 0-15.9744 7.168-15.9744 15.9744s7.168 15.9744 15.9744 15.9744 15.9744-7.168 15.9744-15.9744-7.168-15.9744-15.9744-15.9744z"
                                fill="#D8D5BA"
                                p-id="1629"
                            ></path>
                            <path
                                d="M512 192c-88.3712 0-159.9488 71.68-159.9488 159.9488S423.6288 512 512 512s159.9488-71.68 159.9488-159.9488S600.3712 192 512 192z m0 288.0512c-70.656 0-128-57.344-128-128s57.344-128 128-128 128 57.344 128 128-57.344 128-128 128zM512 0C317.5424 0 159.9488 157.5936 159.9488 352.0512c0 224.0512 320 671.9488 352.0512 671.9488s352.0512-448 352.0512-671.9488C864.0512 157.5936 706.3552 0 512 0z m0 935.5264c-28.16-34.7136-67.584-90.5216-108.1344-155.4432 67.2768-37.376 149.0944-37.376 216.3712 0C579.584 845.0048 540.16 900.8128 512 935.5264z m0-215.552c-43.8272 0-86.8352 11.264-124.928 32.8704-81.8176-134.9632-163.0208-300.3392-163.0208-400.7936C224.0512 193.2288 353.28 64.1024 512 64.1024s287.9488 129.2288 287.9488 287.9488c0 100.4544-81.2032 265.9328-163.0208 400.7936-38.0928-21.6064-81.1008-32.8704-124.928-32.8704z"
                                fill="#5F4E56"
                                p-id="1630"
                            ></path>
                        </svg>
                        {{ item.location }}</span
                    >
                </div>

                <!-- 关联名人头像与人名展示区 -->
                <div
                    class="related-person"
                    v-if="item.relatedPersons && item.relatedPersons.length > 0"
                >
                    <div
                        v-for="(person, index) in item.relatedPersons"
                        :key="index"
                        class="person-item"
                    >
                        <div class="avatar">
                            <img
                                :src="person.avatar"
                                :alt="person.name"
                            />
                        </div>
                        <span>{{ person.name }}</span>
                    </div>
                </div>
            </div>
            <!-- 简短简介区 -->
            <p class="brief-intro">{{ item.briefIntro }}</p>
            <!-- 年份与校区位置区 -->
            <div class="detail-info">
                <span class="year">{{ item.year }}</span>
                <span class="recommend-travel"><StarRating :rating="4.5" /></span>
            </div>
        </div>
        <div
            class="cover"
            v-if="!noImage"
        >
            <Transition>
                <img
                    v-if="loaded"
                    :src="item.img"
                    alt="图片"
                />
                <svg
                    v-else
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                >
                    <g
                        fill="none"
                        fill-rule="evenodd"
                        stroke-width="2"
                    >
                        <circle
                            cx="22"
                            cy="22"
                            r="1"
                        >
                            <animate
                                attributeName="r"
                                begin="0s"
                                dur="1.8s"
                                values="1; 20"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.165, 0.84, 0.44, 1"
                                repeatCount="indefinite"
                            ></animate>
                            <animate
                                attributeName="stroke-opacity"
                                begin="0s"
                                dur="1.8s"
                                values="1; 0"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.3, 0.61, 0.355, 1"
                                repeatCount="indefinite"
                            ></animate>
                        </circle>
                        <circle
                            cx="22"
                            cy="22"
                            r="1"
                        >
                            <animate
                                attributeName="r"
                                begin="-0.9s"
                                dur="1.8s"
                                values="1; 20"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.165, 0.84, 0.44, 1"
                                repeatCount="indefinite"
                            ></animate>
                            <animate
                                attributeName="stroke-opacity"
                                begin="-0.9s"
                                dur="1.8s"
                                values="1; 0"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.3, 0.61, 0.355, 1"
                                repeatCount="indefinite"
                            ></animate>
                        </circle>
                    </g>
                </svg>
            </Transition>
        </div>
    </article>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import StarRating from './StarRating.vue'

const props = withDefaults(
    defineProps<{
        item: ItemOption
        onlyImage?: boolean
        noImage?: boolean
        width?: string
    }>(),
    {
        onlyImage: false,
        noImage: false,
        width: '100%'
    }
)

const loaded = ref(false)
const height = ref('auto')

onBeforeMount(() => {
    if (!props.noImage) {
        height.value = '100%'
        new Promise(resolve => {
            const image = new Image()
            image.src = props.item.img
            if (image.complete) {
                loaded.value = true
                resolve(true)
                return
            }

            image.onload = () => {
                loaded.value = true
                resolve(true)
            }

            image.onerror = error => {
                console.error(props.item.img, error)
                loaded.value = true
                resolve(true)
            }
        })
    }
})
</script>

<style scoped lang="scss">
.card {
    display: flex;
    flex-direction: column-reverse;
    width: v-bind(width);
    height: v-bind(height);
    overflow: hidden;
    background: white;
    border: 1px solid #e3e8f7;
    border-radius: 10px;

    .cover {
        display: flex;
        flex: 1;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #e3e8f7;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .body {
        flex-shrink: 0;
        box-sizing: border-box;
        height: fit-content;
        padding: 2px;

        h3 {
            margin: 0;
            padding: 0;
            font-weight: bolder;
            font-size: 15px;
        }

        /* 关联名人头像与人名展示区样式 */
        .related-person {
            display: flex;
            flex-direction: row;
            gap: 2px; // 调整名人信息之间的间距
            align-items: center;
            margin-top: 2px;

            .person-item {
                display: flex;
                flex-direction: column;
                align-items: center;

                .avatar {
                    width: 30px; // 适当增大头像尺寸
                    height: 30px;
                    overflow: hidden;
                    border-radius: 50%;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                span {
                    margin-top: 2px;
                    color: #333333;
                    font-size: 4px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    //transform: scale(0.8);
                }
            }
        }

        /* 简短简介区样式 */
        .brief-intro {
            margin-top: 4px;
            margin-bottom: 4px;
            color: #666666; // 简介文字颜色调整
            font-size: 12px;
            line-height: 1;
            text-align: center; // 可根据需求调整对齐方式
            position: relative; // 为了让伪元素能基于此元素定位
            &::before,
            &::after {
                content: "";
                position: absolute;
                top: 50%; // 垂直居中
                width: calc(50% - 50px); // 根据文字长度自适应调整横线长度，这里预留了文字左右各50px空间，可按需修改
                height: 1px; // 横线粗细
                background-color: darkgrey; // 横线颜色，可以修改为你想要的颜色
            }
            &::before {
                left: 0;
                transform: translateY(-50%); // 精确垂直居中
            }
            &::after {
                right: 0;
                transform: translateY(-50%); // 精确垂直居中
            }
        }
        /* 年份与校区位置区样式 */
        .detail-info {
            display: flex;
            justify-content: space-between;
            margin-top: 0;

            .year {
                color: gray;
                font-size: 4px; // 调大字体大小，可根据实际需求再调整具体数值
            }

            .recommend-travel {
                color: gray;
                font-size: 4px; // 调大字体大小
            }
        }
    }
}

.location {
    color: gray;
    font-size: 1px;
}

.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition: all 0.4s linear;
    will-change: opacity;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    will-change: opacity;
}

.title-and-related-container {
    display: flex;
    align-items: center; // 垂直方向上居中对齐
    justify-content: space-between; // 让标题和关联名人信息分别靠左和靠右，中间自动分配剩余空间形成间隙
    h3 {
        //font-size: 26px;
        flex-shrink: 0; // 防止标题文字过多被过度压缩
        font-family:
            'Arial Black',
            Gadget,
            sans - serif;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        //background: -webkit-linear-gradient(45deg, #ff0000, #0000ff); /* 渐变方向和颜色 */
        //-webkit-background-clip: text;
        //-webkit-text-fill-color: transparent;
    }

    .related-person {
        flex-shrink: 0; // 防止关联名人信息区域被过度压缩
    }
}
</style>
