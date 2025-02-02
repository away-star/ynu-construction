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
        // const result = {}
        data.total = result.total
        data.max = result.max
        data.list = [...data.list, ...result.list]
        for (let i = 0; i < data.list.length; i++) {
            data.list[i].name = '至公堂'
            data.list[i].img = 'http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg'
        }
        data.list[1].img = 'httpshttps://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMS50b3V0aWFvaW1nLmNvbS9vcmlnaW4vcGdjLWltYWdlLzgwYTI5OWEwY2RhZTQ2MDliODc0Y2EwMTdiNTkwZmJl&sign=yx:B7YfgKQsOwiVNt2k4IJITXEw1us=&tv=0_0'
        data.list[2].img = 'httpshttps://kkimgs.yisou.com/ims?kt=url&at=smstruct&key=aHR0cHM6Ly9pbWcxLnF1bmFyenouY29tL3AvdHRzNS8xNzEyLzE2LzMzNDA1ZGIwMDI2ZmZiMDIuanBnX3JfNzIweDQ4MHg5NV83MzQwMDNmOS5qcGc=&sign=yx:ZarcnrGYVcZ8b0RUeMKN0kAhuFg=&tv=400_400'
        data.list[3].img = 'httpshttps://kkimgs.yisou.com/ims?kt=url&at=smstruct&key=aHR0cDovL3A4Lml0Yy5jbi9xXzcwL2ltYWdlczAzLzIwMjAwNjMwL2YwZjU1MmJjOGJiNzQ4YmU5ODcxMDM3MTgwMmFiYzhlLmpwZWc=&sign=yx:aNZqOBd_8mW5xGFlhOlqMdRWjyQ=&tv=400_400'
        data.list[1].width = 1024
        data.list[1].height = 400

        const yunnanUniversityItems: ItemOption[] = [
            {
                id: 1,
                name: '云南大学呈贡校区图书馆',
                img: 'https://example.com/yunnan-university-library.jpg',
                width: 800,
                height: 600,
                avatar: 'https://example.com/yunnan-university-avatar.jpg',
                user: '云南大学',
                views: 12345,
                relatedPersons: [
                    {
                        avatar: 'https://example.com/related-person-1.jpg',
                        name: '张三'
                    },
                    {
                        avatar: 'https://example.com/related-person-2.jpg',
                        name: '李四'
                    }
                ],
                briefIntro: '云南大学呈贡校区图书馆是云南大学的主要图书馆之一，位于昆明市呈贡区，是学校学术研究和学生学习的重要场所。',
                year: '2010',
                location: '昆明市呈贡区',
                travelStars: 4.5,
                desc: '云南大学呈贡校区图书馆是一座现代化的图书馆，拥有丰富的藏书和先进的设施。',
                detail: `云南大学呈贡校区图书馆位于昆明市呈贡区，是云南大学的主要图书馆之一。图书馆于2010年正式投入使用，占地面积约5万平方米，建筑面积约3.5万平方米，是云南大学呈贡校区的标志性建筑之一。图书馆的设计融合了现代与传统元素，外观宏伟，内部设施先进，为师生提供了良好的学习和研究环境。

图书馆的藏书量极为丰富，涵盖了人文、社会科学、自然科学、工程技术等多个学科领域。截至2023年，图书馆的纸质藏书量已超过300万册，电子图书和期刊资源更是达到了数百万种。此外，图书馆还订阅了大量的国内外学术数据库，为师生提供了便捷的文献检索和下载服务。

图书馆的内部空间设计合理，分为多个功能区。一楼设有大厅、咨询台、自助借还书机和休闲阅读区，方便师生快速办理借还书手续和进行短暂的休息。二楼至五楼分别为不同的学科阅览区，每个阅览区都配备了舒适的座椅和充足的自然光线，为师生提供了安静、舒适的阅读环境。六楼和七楼是多媒体学习区和研讨室，配备了先进的电脑设备和投影仪，方便师生进行小组讨论和学术交流。

图书馆还设有多个特色空间，如古籍阅览室、特藏阅览室和学术报告厅。古籍阅览室收藏了大量的珍贵古籍和文献，是研究中国古代文化和历史的重要资源。特藏阅览室则收藏了云南地方文献和少数民族文化资料，为研究云南地方文化和少数民族文化提供了宝贵的资料。学术报告厅定期举办学术讲座和研讨会，邀请国内外知名学者和专家进行学术交流，为师生提供了广阔的学术视野。

图书馆的服务也非常人性化。除了传统的借阅服务外，图书馆还提供了文献传递、查新检索、定题服务等多项增值服务，帮助师生更好地利用图书馆资源。图书馆还开设了信息素养教育课程，帮助师生提高信息检索和利用能力。此外，图书馆还推出了移动图书馆服务，师生可以通过手机或平板电脑随时随地访问图书馆的电子资源。

云南大学呈贡校区图书馆不仅是学校的学术资源中心，也是校园文化的重要载体。图书馆定期举办各种文化活动，如读书会、书展、摄影展等，丰富了师生的校园文化生活。图书馆还积极参与社会服务，向公众开放部分资源，为地方文化建设和教育事业做出了贡献。

总的来说，云南大学呈贡校区图书馆是一座现代化、多功能、服务优质的图书馆，为云南大学的师生提供了丰富的学术资源和完善的服务，是学校学术研究和学生学习的重要支撑。无论是从建筑规模、藏书量、设施设备，还是从服务质量、文化氛围等方面来看，云南大学呈贡校区图书馆都堪称一流，是云南大学乃至昆明市的文化地标之一。`,
                latitude: 24.8207,
                longitude: 102.842,
                aliases: '云大图书馆'
            },
            {
                id: 2,
                name: '会泽院',
                img: 'http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg',
                width: 350,
                height: 620,
                avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                user: '',
                views: 987,
                relatedPersons: [
                    {
                        avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                        name: '唐继尧'
                    }
                ],
                briefIntro: '云大标志性建筑',
                year: '1924年建成',
                location: '东陆校区',
                travelStars: 5
            },
            {
                id: 3,
                name: '银杏大道',
                img: 'http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg',
                width: 400,
                height: 250,
                avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                user: '',
                views: 1567,
                relatedPersons: [],
                briefIntro: '秋日美景打卡地',
                year: '',
                location: '呈贡校区',
                travelStars: 5
            },
            {
                id: 4,
                name: '泽清堂',
                img: 'http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg',
                width: 320,
                height: 210,
                avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                user: '',
                views: 876,
                relatedPersons: [
                    {
                        avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                        name: '董泽'
                    }
                ],
                briefIntro: '古典韵味建筑',
                year: '1939年修建',
                location: '东陆校区',
                travelStars: 5
            },
            {
                id: 5,
                name: '图书馆（东陆）',
                img: 'http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg',
                width: 380,
                height: 240,
                avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                user: '',
                views: 1123,
                relatedPersons: [
                    {
                        avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                        name: '诸多学者'
                    }
                ],
                briefIntro: '知识汇聚之所',
                year: '1989年扩建',
                location: '东陆校区',
                travelStars: 5
            },
            {
                id: 6,
                name: '钟楼',
                img: 'http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg',
                width: 330,
                height: 220,
                avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                user: '',
                views: 789,
                relatedPersons: [],
                briefIntro: '校园独特景致',
                year: '2000年建成',
                location: '呈贡校区',
                travelStars: 5
            },
            {
                id: 7,
                name: '文典广场',
                img: 'http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg',
                width: 420,
                height: 260,
                avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                user: '',
                views: 1345,
                relatedPersons: [
                    {
                        avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                        name: '姜亮夫'
                    }
                ],
                briefIntro: '文化活动中心',
                year: '',
                location: '呈贡校区',
                travelStars: 5
            },
            {
                id: 8,
                name: '贡院考棚',
                img: 'http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg',
                width: 360,
                height: 230,
                avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                user: '',
                views: 999,
                relatedPersons: [
                    {
                        avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                        name: '古代学子'
                    }
                ],
                briefIntro: '历史科举见证',
                year: '始建较早',
                location: '东陆校区',
                travelStars: 5
            },
            {
                id: 9,
                name: '呈贡图书馆',
                img: 'http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg',
                width: 400,
                height: 250,
                avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                user: '',
                views: 1088,
                relatedPersons: [
                    {
                        avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                        name: '当代师生'
                    }
                ],
                briefIntro: '现代学习空间',
                year: '2010年启用',
                location: '呈贡校区',
                travelStars: 5
            },
            {
                id: 10,
                name: '海棠园',
                img: 'http://zsb.ynu.edu.cn/__local/A/1C/74/73693A6AC3399ECB6AB65D55F7A_1CEBD0F8_E2EC.jpg?e=.jpg',
                width: 340,
                height: 210,
                avatar: 'https://kkimgs.yisou.com/ims?kt=url&at=ori&key=aHR0cHM6Ly9wMy5pdGMuY24vcV83MC9pbWFnZXMwMy8yMDIxMTIyMy9lMDBlMDUwNjk4MDQ0ZjU5YjFiMTIyMWFmMTZiZDJjMS5qcGVn&sign=yx:JTpOxRmNjonvUba7xvFFu0KRxFc=&tv=0_0',
                user: '',
                views: 1200,
                relatedPersons: [],
                briefIntro: '春日赏花佳处',
                year: '',
                location: '呈贡校区',
                travelStars: 5
            }
        ]

        data.list = yunnanUniversityItems
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
