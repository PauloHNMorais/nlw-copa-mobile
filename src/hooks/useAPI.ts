import { AxiosRequestConfig } from './../../node_modules/axios/index.d';
import { useState } from 'react';
import { api } from '../services/api';

export function useAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState<any>(null);

  async function fetchAPI(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ) {
    try {
      setHasError(false);
      setIsLoading(true);
      setError(error);
      return await api({ ...options, url, data, method });
    } catch (error) {
      setHasError(true);
      setError(error);
      throw error;
    } finally {
      setCalled(true);
      setIsLoading(false);
    }
  }

  return { fetchAPI, isLoading, hasError, called };
}
