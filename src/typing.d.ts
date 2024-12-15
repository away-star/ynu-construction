declare interface ItemOption {
    id: number
    title: string
    url: string
    width: number
    height: number
    avatar: string
    user: string
    views: number
    relatedPersons?: RelatedPerson[]; // 新增关联名人数组属性
    briefIntro: string; // 新增简短简介属性
    year: string; // 新增年份属性
    location: string; // 新增校区位置属性
    travelStars: number; // 新增旅游星级属性
}


declare interface RelatedPerson {
    avatar: string;
    name: string;
}