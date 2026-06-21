import { createApiRouteHandler } from '@/services/create-api-route-handler';

export const GET = createApiRouteHandler({
  method: 'get',
  getUrl: (req) => {
    return `/api/v1/products/`;
  },
});
