import { useEffect, useState } from "react"
import { apiUrl } from "../api/apiUrl"

type DispatchPropTypes = {
  apiEndpoint: string
  method?: string
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

const useDataFetch = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [abortController, setAbortController] = useState(new AbortController())

  const fetchData = async ({
    apiEndpoint,
    method = "GET",
    onSuccess,
  }: DispatchPropTypes) => {
    try {
      setLoading(true)
      const controller = new AbortController()
      setAbortController(controller)
      const response = await fetch(`${apiUrl.base_url}/${apiEndpoint}`, {
        method: method,
        signal: controller.signal,
      })
      const data = await response.json()
      if (onSuccess) {
        onSuccess(data)
      }
      setLoading(false)
    } catch (error) {
      if (!abortController.signal.aborted) {
        let errorMessage = ""
        if (error instanceof Error) {
          errorMessage = error.message
        }
        setError(errorMessage)
      }
    }
  }

  const abortPreviousRequest = () => {
    abortController.abort()
  }

  useEffect(() => {
    return () => abortController.abort()
  }, [abortController])

  return { loading, error, fetchData, abortPreviousRequest }
}

export default useDataFetch
