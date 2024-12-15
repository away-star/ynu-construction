import { reactive, render, h, onMounted } from 'vue'
import Card from './Card.vue'

// 计算真实高度，这里只计算除了图片的高度
function getRealHeight(item: ItemOption, realWidth: number) {
    const dom = document.createElement('div')

    render(
        h(Card, {
            item: item,
            width: realWidth + 'px',
            noImage: true
        }),
        dom
    )

    document.body.appendChild(dom)

    // 获取高度
    const height: number = dom.firstElementChild.clientHeight

    // 移除新容器
    document.body.removeChild(dom)
    // 返回高度
    return height
}

const useWaterfall = () => {
    const backTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
    }

    // 瀑布流的一些属性
    const waterfallOption = reactive({
        loading: false,
        bottomDistance: 0,
        // 是否只展示图片，这是自定义加的一个属性
        onlyImage: false,
        topPreloadScreenCount: 0,
        bottomPreloadScreenCount: 0,
        virtual: true,
        gap: 15,
        padding: 15,
        itemMinWidth: 220,
        minColumnCount: 2,
        maxColumnCount: 10
    })

    // 瀑布流元素高度的计算函数
    const calcItemHeight = (item: ItemOption, itemWidth: number) => {
        let height = 0
        // 当包含图文时，需要单独计算文字部分的高度
        // 文字部分的高度 + 图片的高度 = 真实高度
        if (!waterfallOption.onlyImage) {
            height = getRealHeight(item, itemWidth)
        }
        return item.height * (itemWidth / item.width) + height
    }

    // 需要展示数据的属性
    const data = reactive({
        page: 0,
        size: 30,
        total: 0,
        max: 0,
        list: [] as ItemOption[],
        end: false
    })

    // 加载更多数据的函数
    const loadData = async () => {
        if (data.end) {
            return
        }
        data.page += 1
        const response = await fetch(`https://mock.tatakai.top/images?page=${data.page}&size=${data.size}&mode=simple`)

        // console.error(response)

        const result = await response.json()
        if (!result.list.length) {
            data.end = true
            return
        }
        data.total = result.total
        data.max = result.max
        data.list = [...data.list, ...result.list]
        console.error(data)
        for (let i = 0; i < data.list.length; i++) {
            data.list[i].title="至公堂"
            data.list[i].url="http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg"

        }
        data.list[1].url="httpshttps://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMS50b3V0aWFvaW1nLmNvbS9vcmlnaW4vcGdjLWltYWdlLzgwYTI5OWEwY2RhZTQ2MDliODc0Y2EwMTdiNTkwZmJl&sign=yx:B7YfgKQsOwiVNt2k4IJITXEw1us=&tv=0_0"
        data.list[2].url="httpshttps://kkimgs.yisou.com/ims?kt=url&at=smstruct&key=aHR0cHM6Ly9pbWcxLnF1bmFyenouY29tL3AvdHRzNS8xNzEyLzE2LzMzNDA1ZGIwMDI2ZmZiMDIuanBnX3JfNzIweDQ4MHg5NV83MzQwMDNmOS5qcGc=&sign=yx:ZarcnrGYVcZ8b0RUeMKN0kAhuFg=&tv=400_400"
        data.list[3].url="httpshttps://kkimgs.yisou.com/ims?kt=url&at=smstruct&key=aHR0cDovL3A4Lml0Yy5jbi9xXzcwL2ltYWdlczAzLzIwMjAwNjMwL2YwZjU1MmJjOGJiNzQ4YmU5ODcxMDM3MTgwMmFiYzhlLmpwZWc=&sign=yx:aNZqOBd_8mW5xGFlhOlqMdRWjyQ=&tv=400_400"
        data.list[1].width=1024
        data.list[1].height=400

        const yunnanUniversityItems: ItemOption[] = [
            {
                id: 1,
                title: "至公堂",
                url: "http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg",
                width: 300,
                height: 200,
                avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                user: "",
                views: 1234,
                relatedPersons: [
                    {
                        avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                        name: "熊庆来"
                    },
                    {
                        avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                        name: "李广田"
                    }
                ],
                briefIntro: "云大历史文化象征",
                year: "始建于1923年",
                location: "东陆校区",
                travelStars: 5
            },
            {
                id: 2,
                title: "会泽院",
                url: "http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg",
                width: 350,
                height: 620,
                avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                user: "",
                views: 987,
                relatedPersons: [
                    {
                        avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                        name: "唐继尧"
                    }
                ],
                briefIntro: "云大标志性建筑",
                year: "1924年建成",
                location: "东陆校区",
                travelStars: 5
            },
            {
                id: 3,
                title: "银杏大道",
                url: "http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg",
                width: 400,
                height: 250,
                avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                user: "",
                views: 1567,
                relatedPersons: [],
                briefIntro: "秋日美景打卡地",
                year: "",
                location: "呈贡校区",
                travelStars: 5
            },
            {
                id: 4,
                title: "泽清堂",
                url: "http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg",
                width: 320,
                height: 210,
                avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                user: "",
                views: 876,
                relatedPersons: [
                    {
                        avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                        name: "董泽"
                    }
                ],
                briefIntro: "古典韵味建筑",
                year: "1939年修建",
                location: "东陆校区",
                travelStars: 5
            },
            {
                id: 5,
                title: "图书馆（东陆）",
                url: "http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg",
                width: 380,
                height: 240,
                avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                user: "",
                views: 1123,
                relatedPersons: [
                    {
                        avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                        name: "诸多学者"
                    }
                ],
                briefIntro: "知识汇聚之所",
                year: "1989年扩建",
                location: "东陆校区",
                travelStars: 5
            },
            {
                id: 6,
                title: "钟楼",
                url: "http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg",
                width: 330,
                height: 220,
                avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                user: "",
                views: 789,
                relatedPersons: [],
                briefIntro: "校园独特景致",
                year: "2000年建成",
                location: "呈贡校区",
                travelStars: 5
            },
            {
                id: 7,
                title: "文典广场",
                url: "http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg",
                width: 420,
                height: 260,
                avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                user: "",
                views: 1345,
                relatedPersons: [
                    {
                        avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                        name: "姜亮夫"
                    }
                ],
                briefIntro: "文化活动中心",
                year: "",
                location: "呈贡校区",
                travelStars: 5
            },
            {
                id: 8,
                title: "贡院考棚",
                url: "http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg",
                width: 360,
                height: 230,
                avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                user: "",
                views: 999,
                relatedPersons: [
                    {
                        avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                        name: "古代学子"
                    }
                ],
                briefIntro: "历史科举见证",
                year: "始建较早",
                location: "东陆校区",
                travelStars: 5
            },
            {
                id: 9,
                title: "呈贡图书馆",
                url: "http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg",
                width: 400,
                height: 250,
                avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                user: "",
                views: 1088,
                relatedPersons: [
                    {
                        avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                        name: "当代师生"
                    }
                ],
                briefIntro: "现代学习空间",
                year: "2010年启用",
                location: "呈贡校区",
                travelStars: 5
            },
            {
                id: 10,
                title: "海棠园",
                url: "http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg",
                width: 340,
                height: 210,
                avatar: "https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0",
                user: "",
                views: 1200,
                relatedPersons: [],
                briefIntro: "春日赏花佳处",
                year: "",
                location: "呈贡校区",
                travelStars: 5
            }
        ];

        data.list = yunnanUniversityItems;

    }

    // 检查是否加载更多
    const checkScrollPosition = async () => {
        if (waterfallOption.loading) {
            return
        }

        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight

        const distanceFromBottom = scrollHeight - scrollTop - clientHeight

        // 不大于最小底部距离就加载更多
        if (distanceFromBottom <= waterfallOption.bottomDistance) {
            waterfallOption.loading = true
            await loadData()
            waterfallOption.loading = false
        }

        requestAnimationFrame(checkScrollPosition)
    }

    onMounted(async () => {
        await checkScrollPosition()
    })

    return {
        backTop,
        waterfallOption,
        data,
        calcItemHeight
    }
}

export default useWaterfall
