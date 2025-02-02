declare interface ItemOption {
    id?: number; // 项目的唯一标识符，可选字段
    name?: string; // 项目的标题，表示该项内容的名称或主题，可选字段
    img: string; // 项目的图片或链接地址，必须字段
    width: number; // 图片的宽度，单位为像素，必须字段
    height: number; // 图片的高度，单位为像素，必须字段
    avatar: string; // 项目的头像URL，代表与该项目相关的主要人物或组织，必须字段
    user: string; // 用户字段，记录相关的用户信息或为空，必须字段
    views: number; // 浏览次数，表示该内容被查看的次数，必须字段
    relatedPersons?: RelatedPerson[]; // 关联人物数组，包含每个相关人物的头像和姓名，可选字段
    briefIntro: string; // 项目的简短介绍，描述该内容的背景或意义，必须字段
    year: string; // 项目建立的年份或相关时间，必须字段
    location: string; // 项目的地理位置，表示学校或区域的名称，必须字段
    travelStars: number; // 旅游评分，表示该项内容的评价星级，必须字段
    desc?: string; // 项目的详细描述，可选字段
    detail?: string; // 详细介绍字段，可能用于存放更多的信息或为空，可选字段
    latitude?: number; // 纬度，表示该项内容的地理坐标，可选字段
    longitude?: number; // 经度，表示该项内容的地理坐标，可选字段
    aliases?: string; // 别名，表示该项内容的其他名称，可选字段
}

declare interface RelatedPerson {
    avatar: string; // 相关人物的头像URL，必须字段
    name: string; // 相关人物的名字，必须字段
}