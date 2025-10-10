import { reactive } from 'vue'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

// Global reactive state
export const toastState = reactive<{ toasts: Toast[] }>({
  toasts: []
})

let toastIdCounter = 0

export const useToast = () => {
  const showToast = (
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    title?: string,
    duration: number = 4000
  ) => {
    const id = `toast-${++toastIdCounter}-${Date.now()}`
    
    const toast: Toast = {
      id,
      type,
      title,
      message,
      duration
    }

    toastState.toasts.push(toast)

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = toastState.toasts.findIndex(t => t.id === id)
    if (index !== -1) {
      toastState.toasts.splice(index, 1)
    }
  }

  const success = (message: string, title?: string, duration?: number) => {
    return showToast('success', message, title, duration)
  }

  const error = (message: string, title?: string, duration?: number) => {
    return showToast('error', message, title, duration)
  }

  const warning = (message: string, title?: string, duration?: number) => {
    return showToast('warning', message, title, duration)
  }

  const info = (message: string, title?: string, duration?: number) => {
    return showToast('info', message, title, duration)
  }

  const clear = () => {
    toastState.toasts = []
  }

  return {
    showToast,
    success,
    error,
    warning,
    info,
    removeToast,
    clear
  }
}

