interface ToastOptions {
  title?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const useToast = () => {
  const showToast = (options: ToastOptions) => {
    const { message, type = 'info', duration = 3000 } = options

    if (process.client) {
      // Simple console-based toast for now
      // You can replace this with a proper toast library like vue-toastification
      const style = {
        success: 'color: green; font-weight: bold;',
        error: 'color: red; font-weight: bold;',
        warning: 'color: orange; font-weight: bold;',
        info: 'color: blue; font-weight: bold;'
      }

      console.log(`%c${type.toUpperCase()}: ${message}`, style[type])

      // You can implement a custom toast UI here
      // For now, this is a placeholder
    }
  }

  const success = (message: string, title?: string) => {
    showToast({ message, title, type: 'success' })
  }

  const error = (message: string, title?: string) => {
    showToast({ message, title, type: 'error' })
  }

  const warning = (message: string, title?: string) => {
    showToast({ message, title, type: 'warning' })
  }

  const info = (message: string, title?: string) => {
    showToast({ message, title, type: 'info' })
  }

  return {
    showToast,
    success,
    error,
    warning,
    info
  }
}

