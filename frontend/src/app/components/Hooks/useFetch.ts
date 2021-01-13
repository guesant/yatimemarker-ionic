import { useCallback, useState } from "react";

export const useFetch = <IData = any, IError = any>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IError | null>(null);
  const [data, setData] = useState<IData | null>(null);

  const makeFetch = useCallback(async (fetchFunction: () => Promise<IData>) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const responseData = await Promise.resolve(fetchFunction());
      setData(responseData);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, makeFetch, error, data };
};
