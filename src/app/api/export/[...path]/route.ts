import { NextResponse } from 'next/server';
import API_SERVICE_SERVER from '@/lib/server-api';

export async function GET(request: Request) {
  try {
    const urlObj = new URL(request.url);
    //return any thing after /export in url
    const endpoint = urlObj.pathname.replace(/^\/api\/export/, '');
    const queryString = urlObj.search; // includes leading `?` or empty string

    const finalEndpoint = `${endpoint}${queryString}`;
    const response = await API_SERVICE_SERVER.get(finalEndpoint, {
      responseType: 'arraybuffer', // important
    });

    const contentType =
      response.headers['content-type'] || 'application/octet-stream';
    const contentDisposition =
      response.headers['content-disposition'] ||
      'attachment; filename=file.xlsx';

    // Convert ArrayBuffer to Node.js Buffer
    const buffer = Buffer.from(response.data);

    return new NextResponse(buffer, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
      },
    });
  } catch (err: any) {
    console.log('🚀 ~ GET ~ err:', err?.response);
    return NextResponse.json(
      {
        message: err.message,
        status: err.response?.status ?? 500,
        data: err.response?.data,
      },
      { status: err.response?.status ?? 500 }
    );
  }
}
