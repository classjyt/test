<template>
    <div :class="[isFilter ? 'grayscale-mode' : '']">
        <!-- <ElScrollbar
            ref="scrollbarRef"
            height="100vh"
            @scroll="onScroll"
            > -->
        <NuxtLayout>
            <Header v-if="!hideHeard" :isScrolled="isScrolled" />
            <NuxtPage />
            <Footer v-if="!hideHeard" />
        </NuxtLayout>
        <!-- </ElScrollbar> -->
    </div>
</template>

<script lang="tsx" setup>
import CommonService from '~/service/common'
import Header from '~/components/Header'
import Footer from '~/components/Footer.vue'
import { useScroll } from '@/composables/useScroll'
import { useElScrollbarScroll } from '@/composables/useElScrollbarScroll'
const headerStore = useHeaderStore()
const footerStore = useFooterStore()
import { useHead } from '#imports'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

useHead({
    title: '恒力重工集团 - 绿色船舶与高端海工装备制造领导者',
    viewport: 'width=device-width, initial-scale=1.0',
    meta: [
        // 百度爬虫验证标签
        { name: 'baidu-site-verification', content: 'codeva-W4PwoJjJLh' },
        { name: 'description', content: '恒力重工集团，2022年创立，是绿色船舶与高端海工装备制造领导者。我们打造智能化、现代化产业基地，已成功实现首制船与发动机交付，成为民营企业盘活资产、助力东北振兴的典范。' },
        { name: 'keywords', content: '恒力重工,绿色船舶建造,高端海工装备,智能制造基地,现代化产业基地,船舶发动机,东北振兴,民营企业典范,盘活存量资产' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.henglihi.com' },
        { property: 'og:title', content: '恒力重工集团 - 绿色船舶与高端海工装备制造领导者' },
        { property: 'og:description', content: '恒力重工集团，绿色船舶与高端海工装备制造领导者，打造智能化产业基地，助力东北振兴。' },
        { name: 'theme-color', content: '#0b73b9' },
        { name: 'robots', content: 'index, follow' },
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://www.henglihi.com' },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                // ... 您的 JSON-LD 数据
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: '恒力重工集团',
                url: 'https://www.henglihi.com',
                logo: 'https://www.henglihi.com/images/logo.svg',
                description: '绿色船舶与高端海工装备制造领导者。',
                foundingDate: '2022',
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: '中国',
                    addressRegion: '辽宁省',
                    addressLocality: '大连市',
                    addressSubLocality: '长兴岛经济区',
                    streetAddress: '兴港路315号办公大楼',
                    postalCode: '116317',
                },
                sameAs: [
                    // 社交媒体链接
                ],
            })
        },
        {
            src: '/disableDevTool.js', // 文件放在 public/ 目录下，直接使用根路径
            // 添加自定义属性
            'disable-devtool-auto': '',
            // 关键：确保脚本在客户端执行
            body: true, // 等同于 tagPosition: 'bodyClose'
            // 或者更精确的控制
            tagPosition: 'bodyClose'
        }
    ],
})

const router = useRouter()
const route = useRoute()

// 隐藏头尾的路由

const hideHeardFooterRouterList = (['/zh/privacy','/zh/appDownload','/zh/userAgreement'])

const hideHeard = hideHeardFooterRouterList.some((item=> router.currentRoute.value.fullPath.includes(item)))

console.log('router.currentRoute.value.fullPath',router.currentRoute.value.fullPath)

onMounted(()=>{
//    setHideHeard() 
})

const setHideHeard = () => {
    // hideHeard.value = hideHeardFooterRouterList.value.includes(router.currentRoute.value.fullPath)
}
// watch(() => route.fullPath, (newPath) => {
//    console.log('newPath')
// }, { immediate: true })

console.log('hideHeard', hideHeard)

console.log('router',router.currentRoute.value.fullPath);

const { top, isScrolled, scrollbarRef, onScroll } = useScroll()
// const { top, isScrolled, scrollbarRef, onScroll } = useElScrollbarScroll()

const isFilter = computed(() => {
    return dateList.value?.data?.some(item => item.specialDate === useDateFormat(new Date().getTime(), 'MM-DD').value)
})

console.log('isFilter', isFilter)

const { data: dateList } = await CommonService.querySpecialDateList()
// console.log('日期数据 :>> ', dateList.value?.data)

const { updateMenuList } = headerStore

const response = await CommonService.queryInfo()
// console.error('顶部菜单数据 :>> ', response.data.value?.data?.websiteVOList?.[0]?.websiteInfoVOList?.[0]?.menuList)
updateMenuList(response.data.value?.data?.websiteVOList?.[0]?.websiteInfoVOList?.[0]?.menuList)

const { queryCompanyInfo } = footerStore
queryCompanyInfo()
</script>

<style>
.grayscale-mode {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
}

html,
body {
    scrollbar-gutter: stable;
}

html {
    /* @apply h-no-scrollbar; */
    /* 简洁、现代感 */

    ::-webkit-scrollbar {
        position: absolute;
        top: 0;
        left: 0;
        width: 8px;
        height: 8px;
    }

    word-break: break-all;

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
}
</style>
