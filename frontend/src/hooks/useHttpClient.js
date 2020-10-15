import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Stores abort controllers. Stays the same on component re-renders
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, { 
          method, 
          body, 
          headers, 
          signal: httpAbortCtrl.signal 
        });
        const responseData = await response.json();

        // Remove current request controller used in this completed request
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        // 400 or 500 error code check
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        throw error;
      }
  }, []);

  const clearError = () => {
    setError(null);
  };

  // clean up to make sure requests do not continue after user switches away
  useEffect(() => {
    const httpRequests = activeHttpRequests;
    return () => {
      httpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError }
};
