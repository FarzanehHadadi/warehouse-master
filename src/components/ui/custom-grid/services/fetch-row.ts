import API_SERVICE_CLIENT from '@/lib/client-api';

async function fetchRows<T>({
  endpoint,
  pageParam,
  filters,
  pageSize = 20,
}: {
  endpoint: string;
  pageParam: number;
  filters: Record<string, any>;
  pageSize?: number;
}): Promise<T[]> {
  const params: Record<string, any> = {
    page: pageParam,
    size: pageSize,
  };

  // Add filter params
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      params[key] = value;
    }
  });

  const { data } = await API_SERVICE_CLIENT.get(endpoint, { params });
  return data?.data?.result?.data ?? data?.data?.result ?? [];
}

export default fetchRows;
