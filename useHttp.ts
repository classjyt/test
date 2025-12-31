import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack'
import { useNuxtApp, type UseFetchOptions, useFetch, useRuntimeConfig, navigateTo, showError } from 'nuxt/app'
import type { Ref } from 'vue'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface HttpOptions<T> extends UseFetchOptions<T> {
    method?: HttpMethod
    data?: any // 对应请求体（POST/PUT/PATCH）
    params?: Record<string, any> // 对应查询参数（GET）
}

interface ApiResponse<T = any> {
    code: number
    msg?: string
    data?: T
    [key: string]: any
}

// 核心请求函数
export const useHttp = async <T, K = any>(url: NitroFetchRequest, params?: any, options: HttpOptions<K> = {}) => {
    const { $i18n } = useNuxtApp()
    const locale = $i18n.locale.value
    // const config = useRuntimeConfig()

    // 全局配置（类似 Axios 的 defaults）
    const defaults: NitroFetchOptions<any> = {
        baseURL: '',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Language': locale || 'zh',
        },
        credentials: 'include',
        retry: 1,
        method: 'POST',
    }

    // 请求拦截器
    const onRequest = ({ options }: { options: NitroFetchOptions<any> }) => {
        return {
            ...options,
            websiteCode: 3,
        }
        console.log('Request:', options)
    }

    // 响应拦截器
    const onResponse = ({ response }: { response: any }): ApiResponse<T> => {
        console.log('[HTTP Response]', response)

        // 处理无响应数据的情况
        if (!response._data) {
            console.error('No response data')
            return {
                code: -1,
                msg: 'No response data',
            }
        }

        const { code, message, data } = response._data

        // 业务逻辑错误处理
        if (code !== 0) {
            // showError(JSON.stringify(response))
            // showError(message)
            return { code, message, data }
        }

        return { code, msg: message, data }
    }

    // 错误拦截器
    const onResponseError = ({ error }: { error: any }) => {
        console.error('[HTTP Error]', error)

        const statusCode = error.response?.status

        // 特定状态码处理
        switch (statusCode) {
            case 404:
                showError('Resource not found')
                break
            case 500:
                showError('Server error')
                break
            default:
                showError('系统异常')
        }

        return {
            code: statusCode || -1,
            msg: '系统异常',
            data: null,
        }
    }

    const { method = 'POST', ...rest } = options

    params.websiteCode = 3

    const fetchOptions: NitroFetchOptions<any> = {
        ...defaults,
        ...rest,
        method,
        body: method !== 'GET' ? params : undefined,
        query: method === 'GET' ? params : undefined,
        onRequest,
        onResponse,
        onResponseError,
        server: true,
    }

    console.log('fetchOptions :>> ', fetchOptions);
    
    return await useFetch('/api' + url, fetchOptions)
}

// 快捷方法
export const httpGet = <T = any>(url: string, query?: Record<string, any>, options?: Omit<HttpOptions<T>, 'method' | 'query'>) => useHttp<T>(url, query, { ...options, method: 'GET' })

export const httpPost = <T = any>(url: string, body?: any, options?: Omit<HttpOptions<T>, 'method' | 'body'>) => useHttp<T>(url, body, { ...options, method: 'POST' })

export const httpPut = <T = any>(url: string, body?: any, options?: Omit<HttpOptions<T>, 'method' | 'body'>) => useHttp<T>(url, body, { ...options, method: 'PUT' })

export const httpDelete = <T = any>(url: string, options?: Omit<HttpOptions<T>, 'method'>) => useHttp<T>(url, { ...options, method: 'DELETE' })
