// import { NextResponse } from 'next/server';
// import { AxiosError } from 'axios';
// import API_SERVICE_SERVER from '@/lib/server-api';

// export async function GET(
//   request: Request,
//   context: { params: { path: string[] } }
// ) {
//   const params = context.params; // <-- await here
//   return forwardRequest(request, params.path, 'get');
// }

// export async function POST(
//   request: Request,
//   context: { params: { path: string[] } }
// ) {
//   const params = context.params;
//   return forwardRequest(request, params.path, 'post');
// }

// export async function PUT(
//   request: Request,
//   context: { params: { path: string[] } }
// ) {
//   const params = context.params;
//   return forwardRequest(request, params.path, 'put');
// }

// export async function DELETE(
//   request: Request,
//   context: { params: { path: string[] } }
// ) {
//   const params = context.params;
//   return forwardRequest(request, params.path, 'delete');
// }

// export async function PATCH(
//   request: Request,
//   context: { params: { path: string[] } }
// ) {
//   const params = context.params;
//   return forwardRequest(request, params.path, 'patch');
// }

// // central function to forward request
// async function forwardRequest(
//   request: Request,
//   path: string[],
//   method: keyof typeof API_SERVICE_SERVER
// ) {
//   console.log('🚀 ~ forwardRequest ~ path:', path);
//   try {
//     const versionPrefix = '';
//     const url = versionPrefix + '/' + path.join('/');
//     console.log('🚀 ~ forwardRequest ~ url:', url);
//     const body = ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())
//       ? await request.json()
//       : undefined;

//     const args = body ? [url, body] : [url];
//     console.log('🚀 ~ forwardRequest ~ args:', args);
//     const response = await (API_SERVICE_SERVER[method] as any)(...args);

//     return NextResponse.json({ data: response.data });
//   } catch (err) {
//     const error = err as AxiosError;
//     return NextResponse.json(
//       {
//         message: error.message,
//         status: error.response?.status ?? 500,
//         data: error.response?.data,
//       },
//       { status: error.response?.status ?? 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { AxiosError } from 'axios';
import API_SERVICE_SERVER from '@/lib/server-api';
import { isAuthPath, setAuthCookies } from '@/lib/auth-cookies';

export async function GET(request: Request, context: any) {
  const { path } = await context.params;
  return forwardRequest(request, path, 'get');
}

export async function POST(request: Request, context: any) {
  const { path } = await context.params;
  return forwardRequest(request, path, 'post');
}

export async function PUT(request: Request, context: any) {
  const { path } = await context.params;
  return forwardRequest(request, path, 'put');
}

export async function DELETE(request: Request, context: any) {
  const { path } = await context.params;
  return forwardRequest(request, path, 'delete');
}

export async function PATCH(request: Request, context: any) {
  const { path } = await context.params;
  return forwardRequest(request, path, 'patch');
}

// central function to forward request
// async function forwardRequest(
//   request: Request,
//   path: string[],
//   method: keyof typeof API_SERVICE_SERVER
// ) {
//   console.log('🚀 ~ forwardRequest ~ path:', path);
//   try {
//     const versionPrefix = '';
//     const url = versionPrefix + '/' + path.join('/');
//     const body = ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())
//       ? await request.json()
//       : undefined;
//     console.log('🚀 ~ forwardRequest ~ body:', body);

//     const args = body ? [url, body] : [url];
//     console.log('🚀 ~ forwardRequest ~ args:', args);
//     const response = await (API_SERVICE_SERVER[method] as any)(...args);

//     return NextResponse.json({ data: response.data });
//   } catch (err) {
//     const error = err as AxiosError;
//     return NextResponse.json(
//       {
//         message: error.message,
//         status: error.response?.status ?? 500,
//         data: error.response?.data,
//       },
//       { status: error.response?.status ?? 500 }
//     );
//   }
// }
async function forwardRequest(
  request: Request,
  path: string[],
  method: keyof typeof API_SERVICE_SERVER
) {
  try {
    const urlObj = new URL(request.url);

    const versionPrefix = '';
    const basePath = versionPrefix + '/' + path.join('/');

    // include query params
    const queryString = urlObj.search;
    const url = basePath + queryString;

    const body = ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())
      ? await request.json()
      : undefined;

    const args = body ? [url, body] : [url];
    const response = await (API_SERVICE_SERVER[method] as any)(...args);

    if (
      ['post', 'POST'].includes(method) &&
      isAuthPath(path) &&
      response.data
    ) {
      await setAuthCookies(response.data);
    }

    return NextResponse.json({ data: response.data });
  } catch (err) {
    const error = err as AxiosError;
    return NextResponse.json(
      {
        message: error.message,
        status: error.response?.status ?? 500,
        data: error.response?.data,
      },
      { status: error.response?.status ?? 500 }
    );
  }
}
