import { NextResponse } from 'next/server';
import API_SERVICE_SERVER from '@/lib/server-api';

export async function GET() {
  try {
    const response = await API_SERVICE_SERVER.get('/api/v1/orders/export/', {
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
