import { defineNuxtConfig } from 'nuxt/config'

const API_BASE = process.env.NUXT_PUBLIC_API_BASE
// const API_BASE = import.meta.env.NITRO_API_BASE

export default defineNuxtConfig({
    ssr: true, // 启用服务端渲染
    runtimeConfig: {
        // 私有变量，只能 server 端用
        apiBase: API_BASE,

        // 公开变量，前端后端都能用
        public: {
            apiBase: API_BASE,
        },
    },
    nitro: {
        prerender: {
            crawlLinks: false,
        },
        routeRules: {
            '/api/**': {
                // proxy: `https://testapi.henglink.com/**`, // 测试环境
                // proxy: `http://192.168.138.11:9527/**`, // 预发环境
                // proxy: `https://api.henglink.com/**`, // 生产环境
                proxy: `${API_BASE}/**`, // 环境变量
            },
        },
        minify: true,
        sourceMap: false,
    },
    routeRules: {
        // 为 SEO 目的在构建时生成
        '/': { prerender: true },
        // 缓存 1 小时
        '/api/*': { cache: { maxAge: 60 * 60 } },
        // Nuxt 3 中的客户端路由例子（如需要）
        // '/screen': { ssr: false }
        '/_nuxt/**': { headers: { 'Cache-Control': 'max-age=31536000' } }, // 静态资源长期缓存
        '/api/**': { cors: true, headers: { 'Access-Control-Allow-Origin': '*' } },
        '/en/**': {
            redirect: {
                to: '/zh/**',
                statusCode: 301,
            },
        },
    },
    debug: true,
    devServer: {
        host: '0.0.0.0',
        port: 9460, // 设置端口为 9460
    },
    vite: {
        server: {
            proxy: {
                '/api': {
                    target: API_BASE,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ''),
                },
            },
        },
    },
    modules: [
        '@nuxtjs/i18n', // 国际化支持（如需）
        '@pinia/nuxt', // 状态管理
        '@vueuse/nuxt', // 实用的组合式API
        '@nuxt/image', // 图片优化
        '@element-plus/nuxt',
    ],
    i18n: {
        strategy: 'prefix', // 使用路径前缀（/zh/、/en/）
        defaultLocale: 'zh', // 默认语言
        lazy: true, // 懒加载语言文件
        langDir: './locales', // 语言文件存放目录
        locales: [
            {
                code: 'zh',
                iso: 'zh-CN', // SEO 优化
                name: '中文',
                file: 'zh-CN.ts', // 语言文件
            },
            {
                code: 'en',
                iso: 'en-US',
                name: 'English',
                file: 'en-US.ts',
            },
        ],
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root', // 仅根路径才重定向
            alwaysRedirect: false,
        },
        // detectBrowserLanguage: false, // 关闭自动检测浏览器语言
    },
    image: {
        loading: 'lazy', // 全局默认懒加载
        format: 'webp', // 自动转换为 webp 格式
        preload: true, // 预加载图片
        quality: 50,
        dir: 'public',
        domains: ['testwfio.henglink.com', 'wfio.henglink.com'],
        provider: 'ipx',
        ipx: {
            // 禁用GIF的优化
            options: {
                gif: {
                    optimize: false,
                },
            },
            maxPixelDimension: 20000, // 增加到20000×20000像素
            // 或者
            maxSize: 200000000, // 200百万像素
        },
        screens: {
            xs: 360, // 手机竖屏
            sm: 640, // 手机横屏 / 小平板
            md: 768, // 平板竖屏
            lg: 1024, // 平板横屏 / 小桌面
            xl: 1280, // 桌面端主流分辨率
            '2xl': 1536, // 大屏 / 4K 显示器
        },
        format: ['webp', 'jpeg'],
    },
    elementPlus: {
        importStyle: 'scss',
    },
    app: {
        head: {
            charset: 'utf-8',
            // title: '恒力重工集团',
            title: '恒力重工集团 - 绿色船舶与高端海工装备制造领导者',
            viewport: 'width=device-width, initial-scale=1.0',
            meta: [
                // { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
                // { name: 'description', content: '恒力重工集团始于2022年，专注于绿色船舶建造和高端海工装备，打造现代化、智能化产业基地。产业园实现首制船和首台发动机交付，助力东北振兴，成为民营企业盘活存量资产、扩大有效投资的典范。' },
                // { name: 'keywords', content: '恒力重工，绿色船舶，海洋工程，智能制造，现代化产业基地，未来工厂，东北振兴，高端装备。' },
                
                // 百度爬虫验证标签
                { name: 'baidu-site-verification', content: 'codeva-W4PwoJjJLh' },

                { name: 'description', content: '恒力重工集团，2022年创立，是绿色船舶与高端海工装备制造领导者。我们打造智能化、现代化产业基地，已成功实现首制船与发动机交付，成为民营企业盘活资产、助力东北振兴的典范。' },
                { name: 'keywords', content: '恒力重工,绿色船舶建造,高端海工装备,智能制造基地,现代化产业基地,船舶发动机,东北振兴,民营企业典范,盘活存量资产' },
                
                // Open Graph (Facebook, LinkedIn, 微信等)
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: 'https://www.henglihi.com' },
                { property: 'og:title', content: '恒力重工集团 - 绿色船舶与高端海工装备制造领导者' },
                { property: 'og:description', content: '恒力重工集团，绿色船舶与高端海工装备制造领导者，打造智能化产业基地，助力东北振兴。' },

                // 其他重要Meta标签
                { name: 'theme-color', content: '#0b73b9' },
                { name: 'robots', content: 'index, follow' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'canonical', href: 'https://www.henglihi.com' },
            ],
            script: [
                // { src: '/disableDevTool.js', 'disable-devtool-auto': '' },
                {
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify({
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
                        location: {
                            '@type': 'Place',
                            name: '恒力重工集团产业园',
                            address: {
                                '@type': 'PostalAddress',
                                addressCountry: '中国',
                                addressRegion: '辽宁省',
                                addressLocality: '大连市',
                                streetAddress: '兴港路315号办公大楼',
                            },
                        },
                        sameAs: [
                            // ... 补充社交媒体链接，如 LinkedIn, Twitter 等
                        ],
                    }),
                },
            ],
        },
    },
    components: true, // 自动导入 components 文件夹中的组件
    typescript: {
        strict: true,
        shim: false, // 让TSX更纯净
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    css: ['~/assets/css/tailwind.css', '~/assets/css/font.css', '~/assets/iconfont/iconfont.css', '~/assets/css/element-plus.scss'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build: {
        transpile: ['element-plus'],
    },
    // 可选：自定义 Pinia 配置
    pinia: {
        autoImports: ['defineStore', 'storeToRefs'],
    },
})
