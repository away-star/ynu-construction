import { onMounted, onUnmounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const useApp = () => {
    const asideShow = ref(true)
    const setAppStyle = () => {
        document.body.style.height = window.innerHeight + 'px'
        if (window.innerWidth > 640) {
            asideShow.value = true
            document.body.style.paddingRight = '300px'
            return
        }
        asideShow.value = false
        document.body.style.paddingRight = '0'
    }

    onMounted(() => {
        setAppStyle()
        window.addEventListener('resize', useDebounceFn(setAppStyle, 125))
    })

    onUnmounted(() => {
        window.removeEventListener('resize', useDebounceFn(setAppStyle, 125))
    })

    return {
        asideShow
    }
}

export const YNUImage = {
    user: [
        'https://s1.imagehub.cc/images/2025/02/03/53e2709d117ed0e05b71c58764e18cd1.png',
        'https://s1.imagehub.cc/images/2025/02/03/c6a6a1c9d43be2c76224d7279df232fb.png',
        'https://s1.imagehub.cc/images/2025/02/03/f80287a2b25e930afa6a1f22ea455465.png',
        'https://s1.imagehub.cc/images/2025/02/03/2f8ea2953f7c6c3870a94113cbb56bab.png'
    ],
    zeqingtang: ['https://s1.imagehub.cc/images/2025/02/03/c9d7b3ec20614c875826996ef5875f85.png', 'https://s1.imagehub.cc/images/2025/02/03/5122e08812b5207f225caf64360cc29f.png'],
    huizeyuan: ['https://s1.imagehub.cc/images/2025/02/03/93f341dc1cd677a39c29ea5c30631a55.png', ' https://s1.imagehub.cc/images/2025/02/03/24118eacdd69788f0a934eb2e8466fec.png'],
    yinxindadao: ['https://s1.imagehub.cc/images/2025/02/03/d68cc1c3a28678d6671605c6e8d5911f.png', 'https://s1.imagehub.cc/images/2025/02/03/aa442b85f5897ba5f7ec0e476336727a.png'],
    library: ['https://s1.imagehub.cc/images/2025/02/03/3373e6e1dc09edfaedcf5989f28f0d81.png', 'https://s1.imagehub.cc/images/2025/02/03/dfcf57b62874490da8abbc2a0cb88632.png', 'https://s1.imagehub.cc/images/2025/02/03/89d4bd6ce57346ac1599fac3c53bb574.png'],
    zhonglou: ['https://s1.imagehub.cc/images/2025/02/03/8c609793b3e75f731c8acdb24f3a5392.png', 'https://s1.imagehub.cc/images/2025/02/03/ff4d3aa50765054e9392e4db1530e96d.png'],
    // 姚瞻教授
    zhonglouUser: ['https://s1.imagehub.cc/images/2025/02/03/5fb6298e23c593717743b610735b75a8.png'],
    // 林则徐，闻一多
    zhigongtangUser: ['https://s1.imagehub.cc/images/2025/02/03/55a560306b11e7de335b4a26350372e8.png', 'https://s1.imagehub.cc/images/2025/02/03/fb41515e5bdefdb090ec66209bd550d0.png'],
    zhigongtang: ['https://s1.imagehub.cc/images/2025/02/03/ec8e6e0894e2e2d24b761a7c21f9ffe3.png', 'https://s1.imagehub.cc/images/2025/02/03/704fbf8ea75a01d365f0ef1f53b8a499.png'],
    zehu: ['https://s1.imagehub.cc/images/2025/02/03/789f0849dc035942b4598ed91b219637.png', 'https://s1.imagehub.cc/images/2025/02/03/f92e2a6eef09ca79266dece626bb5f80.png']
}

export default useApp
