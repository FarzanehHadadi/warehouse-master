import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { ApiResponse } from '../types/api-types';
import type { QueryEnhanced } from '../types/enhanced-query-types';
// import { ValidationError } from 'yup';
import { apiRequest } from '../services/api-request';

export const useEnhancedQuery = <TResponse, TRequest = unknown>({
  url,
  method = 'GET',
  body,
  options,
  validationSchema,
  queryParams,
  keys = [],
  responseType = 'json',
}: QueryEnhanced<TResponse> & { body?: TRequest }) => {
  return useQuery<ApiResponse<TResponse>, Error>({
    queryKey: [url, method, queryParams, body, ...keys],
    queryFn: async (): Promise<ApiResponse<TResponse>> => {
      const response = await apiRequest<TRequest, TResponse>(
        method,
        url,
        body,
        queryParams,
        responseType
      );

      if (validationSchema) {
        try {
          await validationSchema.validate(response, { abortEarly: false });
        } catch (error) {
          // if (error instanceof ValidationError) {
          //   console.error('Validation Error:', error);
          //   (
          //     error as unknown as { __isValidationError?: boolean }
          //   ).__isValidationError = true;
          // }
          throw error;
        }
      }

      return response;
    },
    retry: (_, error) => {
      // if (
      //   error instanceof ValidationError ||
      //   (error as unknown as { __isValidationError?: boolean })
      //     .__isValidationError
      // ) {
      //   return false; // No retry for validation errors
      // }
      return options?.retry !== false;
    },
    staleTime: 0,
    networkMode: 'always',
    ...options,
  } as UseQueryOptions<ApiResponse<TResponse>, Error>);
};
