declare interface ItemOption {
    id?: number; // 项目的唯一标识符，可选字段
    name?: string; // 标题（最简化，比如云南大学呈贡校区图书馆那么就是图书馆）
    img: string; // 项目的图片或链接地址，必须字段
    width: number; // 图片的宽度，（请设立200-600之间的随机值，值越乱越好）
    height: number; // 图片的高度，单位为像素，必须字段（请设立200-600之间的随机值，值越乱越好）
    avatar: string; // 项目的头像URL，代表与该项目相关的主要人物或组织，必须字段
    views: number; // 浏览次数，表示该内容被查看的次数，必须字段
    relatedPersons?: RelatedPerson[]; // 关联人物数组，包含每个相关人物的头像和姓名，可选字段（如果该建筑或者地点有相关的人物就展示，最多两个）
    briefIntro: string; // 项目的简短介绍(不能超过8个字，最好要有诗意)
    year: string; // 建立或者重建的相关年份，必须字段
    location: string; // 只有呈贡校区和东陆校区两个地点，必须字段
    travelStars: number; // 旅游评分，表示该项内容的评价星级（0-5，可以是小数）
    desc?: string; // 项目的详细描述，可选字段
    detail?: string; // 详细介绍字段（使用markdown格式，在手机上展示，请确保markdown符合手机端风格，尽量精美一点，请不要在标题中出现结语这种，请尽量像景区的介绍，如果relatedPersons有的话必须要包含并详细介绍，2000字左右，篇幅要够）
}

declare interface RelatedPerson {
    avatar: string; // 相关人物的头像URL，必须字段
    name: string; // 相关人物的名字，必须字段
}