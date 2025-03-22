import { useEffect, useRef } from "react"

const useDebounce = <T>(callback: (arg: T) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debounceFunction = (arg: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(arg)
    }, delay)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debounceFunction
}

export default useDebounce
