import type { UseQueryOptions } from '@tanstack/react-query';
import type { ApiResponse } from './api-types';
import * as Yup from 'yup';

type OmitQueryKeyAndFn<T> = Omit<
  UseQueryOptions<T, Error>,
  'queryKey' | 'queryFn'
>;

/**
 * Enhanced query options for useEnhancedQuery hook
 */
export interface QueryEnhanced<
  T,
  TQueryParams extends Record<string, string | number | boolean> = Record<
    string,
    string | number | boolean
  >
> {
  url: string;
  keys?: string[];
  options?: OmitQueryKeyAndFn<ApiResponse<T>>;
  method?: 'GET' | 'POST' | 'DELETE';
  queryParams?: TQueryParams; // strongly typed query parameters
  validationSchema?: Yup.Schema<{ data: T }>;
  responseType?: 'json' | 'arraybuffer' | 'blob';
}

/**
 * Enhanced mutation options for useEnhancedMutation hook
 */
export interface MutationEnhanced<
  T,
  TRequestBody = unknown,
  TQueryParams extends Record<string, unknown> = Record<string, object>
> {
  url: string;
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: TRequestBody; // strongly typed request body
  queryParams?: TQueryParams; // strongly typed query parameters
  invalidateQueries?: string[];
  onSuccess?: (result: ApiResponse<T>) => void;
  onReturn?: (result: ApiResponse<T>) => void;
  showSuccessModal?: boolean;
}
