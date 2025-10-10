import { reactive } from 'vue'

interface LoaderState {
  isLoading: boolean
  text: string
}

// Global reactive state
export const loaderState = reactive<LoaderState>({
  isLoading: false,
  text: 'Loading...'
})

export const useLoader = () => {
  const show = (text: string = 'Loading...') => {
    loaderState.isLoading = true
    loaderState.text = text
  }

  const hide = () => {
    loaderState.isLoading = false
  }

  const setText = (text: string) => {
    loaderState.text = text
  }

  return {
    show,
    hide,
    setText,
    isLoading: loaderState.isLoading
  }
}

