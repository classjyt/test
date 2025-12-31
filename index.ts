// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
export const timeFormat = (dateTime: any = null, fmt = 'yyyy-mm-dd') => {
    // 如果为null,则格式化当前时间
    if (!dateTime) dateTime = Number(new Date())
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (dateTime.toString().length == 10) dateTime *= 1000
    let date = new Date(dateTime)
    let ret
    let opt: any = {
        'y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'h+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
        }
    }
    return fmt
}

// 分组
export const groupBy = (arr, key) =>
    arr?.reduce(
        (acc, obj) => ({
            ...acc,
            [obj[key]]: [...(acc[obj[key]] || []), obj],
        }),
        {},
    )

// export const url = 'https://wfio.henglink.com/hengli-cims-desktop/HENGLINK_2.33.2.exe' // 正式
// export const url = 'https://wfio.henglink.com/hengli-cims-desktop'

export const clientDownUrl = 'https://wfio.henglink.com/hengli-cims-desktop'
// export const clientDownUrl = 'https://testwfio.henglink.com/henglink-desktop/cims'
export const winsClientYmlUrl = `${clientDownUrl}/latest.yml`;
export const macClientDownUrl = `${clientDownUrl}/latest-mac.yml`;

import axios from "axios"
export function downloadClient(computerType: string) {
  const orginUrl = computerType === "windows" ? winsClientYmlUrl : macClientDownUrl;

    axios.get(orginUrl).then(res=>{
        if(res.status === 200){
            let rawData = res.data;
            const reg = /HENGLICIMS.*/g;
            const appNames = rawData.match(reg);
            const installName = appNames.find(
              (item:any) => item.includes(".exe") || item.includes(".dmg")
            );
            const destinUrl = clientDownUrl + "/" + installName;
            const linkA = document.createElement("a");
            linkA.href = destinUrl;
            linkA.style.display = "none";
            document.body.appendChild(linkA);
            linkA.click();
            document.body.removeChild(linkA);
        }
    })
}
