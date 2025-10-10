import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios'
import type { ApiResponse } from '~/types'

/**
 * Enhanced API composable with comprehensive error handling
 */
export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const toast = useToast()

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.public.apiBase || '/api',
    timeout: 15000, // 15 seconds timeout
    headers: {
      'Content-Type': 'application/json'
    }
  })

  /**
   * Request interceptor - Add auth token to requests
   */
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add authentication token if available
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
      }
      
      // Add request timestamp for debugging
      if (import.meta.dev) {
        config.headers['X-Request-Time'] = new Date().toISOString()
      }
      
      return config
    },
    (error) => {
      console.error('Request interceptor error:', error)
      return Promise.reject(error)
    }
  )

  /**
   * Response interceptor - Handle common errors globally
   */
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
      // Handle network errors
      if (!error.response) {
        toast.error('Network error. Please check your connection.')
        return Promise.reject(new Error('Network error'))
      }

      const { status, data } = error.response

      // Handle different HTTP status codes
      switch (status) {
        case 400:
          toast.error(data?.message || 'Invalid request')
          break
        
        case 401:
          toast.error('Session expired. Please login again.')
          await authStore.logout()
          break
        
        case 403:
          toast.error('You do not have permission to perform this action')
          break
        
        case 404:
          toast.error(data?.message || 'Resource not found')
          break
        
        case 422:
          // Validation errors - let the calling code handle these
          break
        
        case 429:
          toast.error('Too many requests. Please try again later.')
          break
        
        case 500:
          toast.error('Server error. Please try again later.')
          break
        
        case 503:
          toast.error('Service temporarily unavailable')
          break
        
        default:
          toast.error(data?.message || 'An unexpected error occurred')
      }

      return Promise.reject(error)
    }
  )

  /**
   * GET request with error handling
   */
  const get = async <T = any>(
    url: string, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<T>>(url, config)
      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch data'
      throw new Error(message)
    }
  }

  /**
   * POST request with error handling
   */
  const post = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.post<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create resource'
      throw new Error(message)
    }
  }

  /**
   * PUT request with error handling
   */
  const put = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.put<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update resource'
      throw new Error(message)
    }
  }

  /**
   * PATCH request with error handling
   */
  const patch = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.patch<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update resource'
      throw new Error(message)
    }
  }

  /**
   * DELETE request with error handling
   */
  const del = async <T = any>(
    url: string, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance.delete<ApiResponse<T>>(url, config)
      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete resource'
      throw new Error(message)
    }
  }

  /**
   * Download file with progress tracking
   */
  const download = async (
    url: string,
    filename?: string
  ): Promise<void> => {
    try {
      const response = await axiosInstance.get(url, {
        responseType: 'blob'
      })
      
      const blob = new Blob([response.data])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error: any) {
      toast.error('Failed to download file')
      throw error
    }
  }

  /**
   * Upload file with progress tracking
   */
  const upload = async <T = any>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axiosInstance.post<ApiResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        }
      })

      return response.data
    } catch (error: any) {
      toast.error('Failed to upload file')
      throw error
    }
  }

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    download,
    upload,
    instance: axiosInstance
  }
}

