import API_SERVICE_CLIENT from '@/lib/client-api';
import { ApiResponse } from '@/types/api-types';

function serializeQueryParams(params: Record<string, any>): string {
  const queryString = Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )
    .join('&');
  return queryString ? `${queryString}` : '';
}

export async function apiRequest<TRequest, TResponse>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  body?: TRequest,
  queryParams?: Record<string, any>,
  responseType: 'json' | 'arraybuffer' | 'blob' = 'json'
): Promise<ApiResponse<TResponse>> {
  try {
    // If queryParams are provided, append them to the URL
    if (queryParams) {
      const queryString = serializeQueryParams(queryParams);
      // Check if the URL already has a query string
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}${queryString}`; // Append query string to the URL
    }

    const response = await API_SERVICE_CLIENT({
      method,
      url,
      data: body,
      responseType,
    });

    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}
