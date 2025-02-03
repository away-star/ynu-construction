import { reactive, render, h, onMounted } from 'vue'
import Card from './Card.vue'
import { YNUImage } from './useApp.ts'

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
                id: 2025020301,
                name: '图书馆',
                img: YNUImage.library[0],
                width: Math.floor(Math.random() * (600 - 200 + 1)) + 200,
                height: Math.floor(Math.random() * (600 - 200 + 1)) + 200,
                avatar: YNUImage.library[1],
                views: Math.floor(Math.random() * 50000) + 10000,
                relatedPersons: [
                    {
                        avatar: YNUImage.user[3],
                        name: '熊庆来'
                    },
                    {
                        avatar: YNUImage.user[2],
                        name: '李广田'
                    }
                ],
                briefIntro: '云大书海明珠',
                year: '2008年',
                location: '呈贡校区',
                travelStars: 4.8,
                desc: '云南大学呈贡校区图书馆是知识的殿堂，承载着无数师生的梦想与追求，建筑宏伟，馆藏丰富。',
                detail: `# 云南大学图书馆介绍
云南大学图书馆始建于1923年，经过百年建设，已成为典藏丰富、功能齐全的现代化综合性大学图书馆。以下是详细介绍：

## 馆舍建设
- **东陆馆**：位于校本部，建筑面积1.8万平方米，由邵逸夫先生捐资兴建，也称“逸夫楼”，为全校师生提供大量教学、科研支持。
- **呈贡馆**：位于呈贡校区核心位置，建筑面积5.8万平方米，是校区标志性建筑。采用开放式“管、藏、借、阅”四合一开架管理服务模式，结合现代信息技术和数字化技术，提供多元载体、多类型、多功能一体化服务。

## 馆藏资源
- **纸质资源**：截至2021年底，纸质文献总量为3790953册，其中古籍17万册，以生物生态学、历史学、民族学及地方民族文献为收藏重点和特色。
- **数字资源**：电子图书1579834册，电子期刊320987册，中外文数据库123个，并有多个自建数据库。建有10.5TB容量的数字资源存储平台，存储容量和性能居云南省前列。

## 机构设置
设置五部一室：办公室、技术部、采编部、读者服务部、信息咨询部和古籍部。另有一个内设机构：云南大学图书馆信息资源开发研究所，和一个挂靠机构：云南大学知识产权信息服务中心。

## 服务水平
- **服务模式**：实现全开架借阅，提供纸质、电子文献，书、刊、报等多元载体、多类型、多功能一体化服务。
- **服务设施**：设有会议报告厅、自修区、藏借阅查一体化学习区、展览区、研讨区、专题学习区、数字化学习区、休闲区、发呆区等，充分满足读者多元化需求。
- **智慧教室**：采用申请、审批的方式进行管理，方便教师进行教学科研活动。

## 现代化建设
- **计算机自动化管理**：引进图书馆自动化管理系统软件，实现图书采购、编目、典藏、外借等工作的计算机自动化管理。
- **座位预约系统**：座位预约系统试运行，提高座位利用率，方便读者。

## 捐赠与文献传递
- **接受捐赠**：欢迎本校师生、校友及社会各界人士捐赠图书文献，对捐赠图书进行甄别取舍。
- **文献传递**：与中国国家图书馆、上海图书馆、CALIS、CASHL等建立文献传递服务关系，解决文献资源不足的问题。

## 阅读推广活动
举办“4.23世界读书日”系列活动、“理解中国•育人计划 | 金钥匙讲坛”等，丰富读者阅读体验，促进校园文化建设。

云南大学图书馆将继续加强文献信息资源建设，提升服务水平，为学校的教学、科研和人才培养提供有力支持。 `
            },
            {
                id: 1,
                name: '会泽院',
                img: YNUImage.huizeyuan[1],
                width: 402,
                height: 599,
                avatar: YNUImage.huizeyuan[0],
                views: 5000,
                relatedPersons: [
                    {
                        avatar: YNUImage.user[1],
                        name: '唐继尧'
                    },
                    {
                        avatar: YNUImage.user[0],
                        name: '董泽'
                    }
                ],
                briefIntro: '会泽古韵悠长',
                year: '1923年',
                location: '东陆校区',
                travelStars: 4.5,
                desc: '会泽院是云南大学的标志性建筑，具有深厚的历史文化底蕴。',
                detail: `# 云南大学会泽院介绍
云南大学会泽院是云南大学的标志性建筑，位于云南省昆明市五华区云南大学东陆校区，坐北朝南，处于校园的中轴线上。以下为其详细介绍： 

## 历史沿革
1. **奠基与建成**：民国十二年（1923年）4月20日至民国十三年（1924年）12月18日，在明清云南贡院明远楼原址上修建东陆大学主教学楼，并命名为“会泽院”。 
2. **历史事件**
    - 民国十四年（1925年）和民国十五年（1926年），东陆大学学生由会泽院出发，参与声援上海工人和北京市民的斗争。 
    - 民国三十年（1941年）5月12日，云南大学会泽院遭日寇轰炸，炸弹洞穿楼板。 
    - 民国三十七年（1948年）7月15日，昆明学生在此发起“七一五”“反美扶日”爱国民主运动，与反动军警展开激烈斗争。 
3. **后续发展**
    - 抗战胜利后，在大厅加了两根顶梁柱，又加盖了第三层楼，命名为仰止楼。 
    - 2016年，云南大学决定将云南大学会泽院一楼作为云南大学历史博物馆展厅进行布展。 
    - 2021年12月30日，云南大学历史博物馆开馆。 

## 建筑特色
1. **整体布局**：会泽院为地上2层（局部3层）结构，砖木、砖石、钢筋混凝土混合结构，主楼长77.58米，宽22.63米，高17米，局部地下1层。 
2. **外观设计**：立面采用西式建筑风格，横五段、竖三段构图。底层为基座层，块石勒脚，以青石腰线与上部分隔，红砖墙开矩形窗。二层用拱形窗。外墙转角及门窗四周，均以细凿青石宽窄交替镶砌。正面4根10米高的古典柱子，中部设门厅楼梯，大门外有95级台阶，台阶中段第二平台有西式喷水池一座。 
3. **文物遗存**：主楼前后门的门楣之上镌刻“会泽院”三个字。门前95级青石台阶，寓意《易经·乾卦》：“九五飞龙在天”，是进入校园的主要通道，也是历届毕业生合影的地方。云南大学校徽上的图案就是会泽院的正立面线稿图，院前阶梯将龙门道的95级台阶抽象简化为九条长阶与五条短阶。 

## 价值意义
1. 会泽院见证了云南大学的发展历程，发生在其间的许多重大历史事件对云南教育文化和中国近现代历史的发展产生了深远影响。 
2. 对于研究西南地区文化教育发展和历史建筑具有重要价值，其独特的建筑风格和历史文化内涵，使其成为云南大学乃至昆明市的著名文化景观。 
3. 2019年10月7日，云南大学会泽院被中华人民共和国国务院公布为第八批全国重点文物保护单位。 

云南大学会泽院不仅是云南大学的象征，也是中国近代教育历史的见证者，承载着丰富的历史文化价值。 `
            },
            {
                id: 2,
                name: '银杏大道',
                img: YNUImage.yinxindadao[0],
                width: 596,
                height: 355,
                avatar: YNUImage.yinxindadao[1],
                views: 4500,
                briefIntro: '银杏金韵流芳',
                year: '具体年份不详',
                location: '东陆校区',
                travelStars: 4.2,
                desc: '秋冬时节银杏叶金黄，景色迷人。',
                detail: `# 云南大学银杏大道介绍
云南大学银杏大道位于云南大学东陆校区内，全长约300米，从文渊楼一直延伸到会泽院，是云大校园内一道亮丽的风景线。以下为其详细介绍：
## 历史渊源
银杏大道的银杏树是建国之初由云南大学的校工武文忠和同事们亲手种下的。武文忠虽然文化水平不高，但通过自学园艺知识，在十年间和同事们种下了近3000棵树，其中包括银杏道两边的银杏树。
## 景观特色
1. **秋季盛景**：每到深秋，银杏树叶变黄，整个大道被金黄色的银杏叶覆盖，阳光透过树枝的缝隙散落在银杏道上，形成一幅色彩绚丽的油画，美不胜收。
2. **生态氛围**：大道上常有活泼不怕人的松鼠出现，为景色增添了一份灵动。
## 文化意义
1. **校园文化象征**：银杏大道已成为云南大学的标志性景观之一，是云大校园文化和历史的重要象征，见证了无数学子的成长与青春。
2. **文学创作灵感**：云南大学的“银杏文学社”以银杏为名，银杏大道的美景激发了众多文学爱好者的创作灵感。
## 游览信息
1. **最佳观赏时间**：每年的11月中旬到12月初，此时银杏叶金黄灿烂，景色最为壮观。
2. **周边景点**：银杏大道附近有云南贡院至公堂、梁思成夫妇设计的晚秋堂等建筑，游客在欣赏银杏美景的同时，还可感受浓厚的历史文化氛围。

云南大学银杏大道以其独特的魅力，吸引了无数游客前来观赏，成为了昆明秋天一道亮丽的风景线。 `
            },
            {
                id: 3,
                name: '泽清堂',
                img: YNUImage.zeqingtang[0],
                width: 321,
                height: 578,
                avatar: YNUImage.zeqingtang[1],
                views: 3800,
                briefIntro: '堂宇古韵流芳',
                year: '2010年',
                location: '东陆校区',
                travelStars: 4.0,
                desc: '建筑风格典雅。',
                detail: `# 云南大学泽清堂介绍
云南大学泽清堂是由卢汉夫人龙泽清于1941年捐款修建的小型礼堂，可容纳约400人。它位于云南大学东陆校区，由著名建筑学家梁思成及其夫人林徽因设计。泽清堂与映秋院相连，二者共同构成了云南大学早期的重要建筑群。
## 建筑风格
泽清堂的建筑风格中西合璧，屋顶形式多样，包括悬山顶、卷棚顶和四角攒尖顶等，屋顶采用琉璃瓦，整体设计古朴典雅，与周围的至公堂等建筑遥相呼应，共同构成了至公堂中心建筑群。
## 历史价值
作为云南大学历史建筑群的一部分，泽清堂不仅是学校历史文化的见证，也是中国近代教育史和建筑史的重要实物资料。它代表了当时国内大学建筑的较高水平，对于研究和保护我国西南地区文化教育发展和历史建筑具有重要的历史价值、科学价值、艺术价值及社会文化价值。
## 使用现状
如今，泽清堂仍然是云南大学校园内重要的文化和学术活动场所，用于举办讲座、会议和其他校园活动，继续为学校的教育和文化交流服务。 `
            },
            {
                id: 4,
                name: '钟楼',
                img: YNUImage.zhonglou[0],
                width: 512,
                height: 237,
                avatar: YNUImage.zhonglou[1],
                relatedPersons: [
                    {
                        avatar: YNUImage.zhonglouUser[0],
                        name: '姚瞻'
                    }
                ],
                views: 5600,
                briefIntro: '钟楼古韵悠长',
                year: '1923年',
                location: '东陆校区',
                travelStars: 4.5,
                desc: '古典建筑典范',
                detail: `# 云南大学钟楼介绍
云南大学钟楼是云南大学校园内的一座标志性建筑，建于1955年，最初作为水塔使用，兼有报时功能。以下是关于云南大学钟楼的详细介绍：
## 建筑特点
- **建筑结构**：钟楼共7层，高26米，连塔顶钢架共高30米，由云南大学土木系主任姚瞻教授设计。
- **建筑风格**：钟楼的设计兼具实用性和美观性，其独特的建筑风格与云南大学校园内的其他历史建筑相得益彰。
## 历史意义
- **历史背景**：钟楼建于1955年，正值云南大学发展的重要时期，它的建成不仅解决了校园供水问题，也成为了校园内的一个重要地标。
- **文化价值**：钟楼作为云南大学的一部分，见证了学校的发展历程，承载着丰富的历史文化价值。
## 校园景观
- **钟楼接晖**：钟楼与周围的自然景观和建筑群共同构成了“钟楼接晖”这一校园美景，尤其在夕阳时分，钟楼在余晖的映照下显得格外庄严美丽。
- **校园生活**：钟楼不仅是校园的标志性建筑，也是学生日常生活的一部分，它的存在为校园增添了一份历史的厚重感。
## 保护与传承
- **文物保护**：2005年，云南大学钟楼被列为昆明市历史文化遗产保护建筑，体现了对其历史价值的认可和保护。

云南大学钟楼不仅是校园内的一处重要景观，也是云南大学历史文化的重要载体，见证了学校的发展历程，承载着无数学子的青春记忆。 `
            },
            {
                id: 5,
                name: '至公堂',
                img: YNUImage.zhigongtang[0],
                width: 347,
                height: 489,
                avatar: YNUImage.zhigongtang[1],
                views: 6200,
                relatedPersons: [
                    {
                        avatar: YNUImage.zhigongtangUser[0],
                        name: '林则徐'
                    },
                    {
                        avatar: YNUImage.zhigongtangUser[1],
                        name: '闻一多'
                    }
                ],
                briefIntro: '堂韵古风犹存',
                year: '1499年',
                location: '东陆校区',
                travelStars: 4.7,
                desc: '历史文化瑰宝',
                detail: `# 云南大学至公堂介绍
云南大学至公堂是位于昆明市云南大学校本部的一座历史悠久的建筑，是云南贡院的主体建筑，建筑面积564平方米，坐北朝南，前坡作卷棚式延伸，柱粗梁大，庄重典雅。南北两面皆雕花门窗，金碧彩绘。以下是关于云南大学至公堂的详细介绍：
## 历史沿革
- **明清时期**：至公堂于1499年建成，是明清云南乡试活动的中心，民族英雄林则徐曾两次在此主考。南明时期，云南贡院成为永历皇帝朱由榔的皇宫。
- **抗日战争时期**：全国性的学术活动和著名学者的精彩演讲经常在云大至公堂举行，至公堂成为全国最活跃的科学大讲堂。
- **1987年**：云南贡院被公布为第三批省级重点文物保护单位。
## 建筑特色
- **建筑风格**：至公堂坐北朝南，面阔五间，单檐硬山顶，前坡作卷棚式延伸，柱粗梁大，庄重典雅。南北两面皆雕花门窗，金碧彩绘。
- **建筑布局**：堂前有一方形平台，既增添了建筑的气势，又便于组织人员进退。
## 重要事件
- **1923年**：4月20日在此举行东陆大学的开学典礼，揭开了至公堂作为礼堂的历史篇章。
- **1944年**：6月25日，美国副总统华莱士参观云大，并在此发表演说。
- **1946年**：7月15日，闻一多在此发表了《最后一次演讲》，当天在回家的路上即遭特务杀害。
## 轶事典故
- **乡试大典**：至公堂是举行乡试大典的重地，每三年一次的乡试，皆在秋季举行，故称秋闱。朝廷派往各省的主考官多是硕学鸿儒或名宦，如李澄中、鄂尔泰、林则徐等，他们都曾在贡院工作和生活，为云南文化教育的发展作出了贡献。
- **皇宫**：南明时期，云南贡院成为永历皇帝朱由榔的皇宫，至公堂就是大内的朝堂，永历帝经常在此处理政务，接见臣僚。
## 文物保护
- **1987年**：云南贡院被公布为第三批省级重点文物保护单位。
- **1988年**：至公堂按原样落架重修。
## 教育景观
- **革命烈士纪念碑**：至公堂前有革命烈士纪念碑，云南大学是一所具有光荣革命传统的学校，在抗日战争和解放战争时期被誉为“民主堡垒”，共有烈士68人，烈士数目之多，在全国高校中仅次于北京大学。经中共中央宣传部批准，1993年建成云南大学革命烈士纪念碑。
- **文物古迹**：云南大学是文物富集区，汇聚了文物古迹与山水园林之胜，其完整保留的文物的空间格局和历史环境，使我们今天还有可能体察500年来的历史进程，其性质属历史文化景观，是一处难得的教育景观。

云南大学至公堂不仅是历史的见证者，也是文化传承的重要场所，承载着丰富的历史和文化价值。 `
            },
            {
                id: 7,
                name: '泽湖',
                img: YNUImage.zehu[0],
                width: 389,
                height: 512,
                avatar: YNUImage.zehu[1],
                views: 7200,
                briefIntro: '泽湖碧波含韵',
                year: '2009年',
                location: '呈贡校区',
                travelStars: 4.2,
                desc: '校园灵动之景',
                detail: `# 云南大学呈贡校区泽湖介绍
云南大学呈贡校区的泽湖是一个风景秀美的人工湖，位于广田东路与庆来西路交叉口，是校园内重要的生态和景观区域。以下是泽湖的详细介绍：
## 历史背景
泽湖的前身是呈贡校区内一片地势低洼的小树林，雨季容易积水。2015年6月，为了增加校园内生态多样性，校方决定修建人工湖，利用地势低洼的优势，深挖并引水汇入，同时对周围环境进行改造。
## 命名含义
泽湖的名字有两层含义：
- 对洋浦校区景行广场泽湖的传承。
- “泽”字体现了云大“会泽百家，至公天下”的精神，寓意着人才汇集。
## 生态功能
泽湖由一湖三水构成，三级水体设计体现了生态与环保的理念：
- 第一级水体有东西两个入水口，分别引自东湖和西门低洼处的自然冒水。
- 第二级水体集中处理学校污水。
- 第三级形成中水，用于浇灌花草树木。
## 景观特色
泽湖周围环绕着林、园等主体建筑，布局自然，环境优美。湖中有天鹅、锦鲤等动物，与四周的院士林、玫瑰园、樱花林、薰衣草园等共同组成北门景观群。
## 文化意义
泽湖命名蕴含了“泽润心灵”之意，是云大推进环境育人的重大举措之一。泽湖文化区集生态与环保、自然与人文为一体，展现了百年云大的人文传承。

泽湖不仅是云南大学呈贡校区的一道亮丽风景线，也是学校生态环保和文化传承的重要体现。 `
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

// 生成 200 - 600 之间的随机数
function getRandomValue() {
    return Math.floor(Math.random() * (600 - 200 + 1)) + 200
}

export default useWaterfall
