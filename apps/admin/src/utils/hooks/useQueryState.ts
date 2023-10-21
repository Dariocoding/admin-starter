import { QueryFunction, useQuery, UseQueryResult } from "@tanstack/react-query";
import React from "react";
const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

const useQueryState = <T = unknown>(
  queryKey: string[],
  queryFn: QueryFunction<T, any>,
  initialData: any
): UseQueryResult<T, unknown> & {
  setData: React.Dispatch<React.SetStateAction<T>>;
  isLoading: boolean;
} => {
  const [data, setData] = React.useState(initialData);

  const query = useQuery(queryKey, queryFn, {
    initialData,
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    setData(query.data);
  }, [query.data]);

  const isLoading = query.isFetching || query.isRefetching || query.isLoading;

  //@ts-ignore
  return {
    ...query,
    data: data || query.data,
    setData,
    isFetching: isLoading,
    isLoading,
  };
};

export default useQueryState;
