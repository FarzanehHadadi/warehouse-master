import API_SERVICE_SERVER from '@/lib/server-api';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface HandlerConfig {
  method: Method;
  getUrl: (request: Request, body?: any) => string;
  getData?: (request: Request) => Promise<any>;
}

export function createApiRouteHandler(config: HandlerConfig) {
  return async function handler(request: Request) {
    try {
      const data = config.getData ? await config.getData(request) : undefined;
      const url = config.getUrl(request, data);
      const args = data === undefined ? [url] : [url, data];
      const response = await (API_SERVICE_SERVER[config.method] as any)(
        ...args
      );
      return NextResponse.json({ data: response.data });
    } catch (error) {
      const axiosError = error as AxiosError;
      return NextResponse.json(
        {
          message: axiosError.message,
          status: axiosError.response?.status ?? 500,
          data: axiosError.response?.data,
        },
        { status: axiosError.response?.status ?? 500 }
      );
    }
  };
}
