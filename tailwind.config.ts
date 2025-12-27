/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: 'h-',
    content: [
        './components/**/*.{vue,ts,tsx,less}',
        './layouts/**/*.{vue,ts,tsx}',
        './pages/**/*.{vue,ts,tsx}',
        './app.vue',
    ],
    theme: {
        extend: {
            display: ['group-hover'], // 确保启用 group-hover 变体
            colors: {
                footer: '#1D4883',
                "footer-second": '#1C3F70',
                grey: '#878D96',
                primary: '#004098',  // 深蓝色
                // main: '#303133',  // 主要文字颜色
                main: '#3F4249',  // 主要文字颜色
                secondary: '#909399',  // 再次文字颜色
                submain: '#697077',  // 次要文字颜色
                'border-normal': '#DCDFE6', // 默认边框颜色
            }
        },
        screens: {
            sm: '640px', // ≥640px 手机横屏、小平板
            md: '768px', // ≥768px 平板
            lg: '1024px', // ≥1024px 小型笔记本
            xl: '1280px', // ≥1280px 桌面显示器
            '2xl': '1536px', // ≥1536px 超宽屏
            '3xl': '1920px', // ≥1536px 超宽屏
            
            // xl: '1440px', // ≥1200px 桌面显示器
        },

    },
    plugins: [],
}
