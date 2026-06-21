// import { queryClient } from '@/app/query-client';
import { handleError } from '@/lib/handle-error';
import { handleSuccess } from '@/lib/handle-success';
import { apiRequest } from '@/services/api-request';
import { ApiResponse } from '@/types/api-types';
import { MutationEnhanced } from '@/types/enhanced-query-types';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
// import type { ApiResponse } from '../types/api-types';
// import { handleSuccess } from '../utils/handle-success';
// import { handleError } from '../utils/handle-error';
// import type { MutationEnhanced } from '../types/enhanced-query-types';
// import { apiRequest } from '../services/api-request';
// import { queryClient } from '../providers/query-client';

// export const useEnhancedMutation = <TRequest, TResponse>({
//   url,
//   method = 'POST',
//   invalidateQueries,
//   onSuccess,
//   showSuccessModal = true,
// }: MutationEnhanced<TResponse>) => {
//   return useMutation<ApiResponse<TResponse>, Error, TRequest>({
//     mutationKey: [url],
//     mutationFn: (body) => apiRequest<TRequest, TResponse>(method, url, body),
//     onSuccess: (result) => {
//       handleSuccess({
//         showModal: showSuccessModal,
//         onSuccess: () => onSuccess && onSuccess(result),
//       });
//       if (invalidateQueries?.length) {
//         queryClient.invalidateQueries({
//           predicate: (query) =>
//             invalidateQueries.some((keyToInvalidate) =>
//               query.queryKey.includes(keyToInvalidate)
//             ),
//         });
//       }
//     },
//     onError: (error) => {
//       handleError({ error });
//     },
//   });
// };
type RequestMode = 'body' | 'path' | 'query';

interface EnhancedMutationProps<TRequest, TResponse>
  extends MutationEnhanced<TResponse> {
  mode?: RequestMode; // <-- explicitly define how to pass variables
}

export const useEnhancedMutation = <TRequest = any, TResponse = any>({
  url,
  method = 'POST',
  mode = 'body', // default
  invalidateQueries,
  onSuccess,
  showSuccessModal = true,
}: EnhancedMutationProps<TRequest, TResponse>) => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<TResponse>,
    Error,
    TRequest | string | number | Record<string, any>
  >({
    mutationKey: [url],
    mutationFn: (variables) => {
      let requestUrl = url;

      if (
        mode === 'path' &&
        (typeof variables === 'string' || typeof variables === 'number')
      ) {
        requestUrl = `${url}/${variables}`;
        return apiRequest(method, requestUrl);
      }

      if (mode === 'query' && typeof variables === 'object') {
        return apiRequest(
          method,
          url,
          undefined,
          variables as Record<string, any>
        );
      }

      // default: body
      return apiRequest<TRequest, TResponse>(
        method,
        url,
        variables as TRequest
      );
    },
    onSuccess: (result) => {
      handleSuccess({
        showModal: showSuccessModal,
        onSuccess: () => onSuccess && onSuccess(result),
      });

      if (invalidateQueries && invalidateQueries?.length > 0) {
        queryClient.invalidateQueries({
          predicate: (query) =>
            invalidateQueries.some((keyToInvalidate) =>
              query.queryKey
                .map((q) => String(q))
                .some((part) => part.includes(keyToInvalidate))
            ),
          exact: false,
          refetchType: 'active',
        });
      }
    },
    onError: (error) => {
      console.log('first');
      handleError({ error });
    },
  });
};
