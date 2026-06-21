import { NextResponse } from 'next/server';
import { AxiosError } from 'axios';
import API_SERVICE_SERVER from '@/lib/server-api';
import { setAuthCookies } from '@/lib/auth-cookies';
import { LOGIN } from '@/constants/urls';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await API_SERVICE_SERVER.post(LOGIN, {
      mobile: body.username ?? body.userName,
      password: body.password,
    });
    console.log("🚀 ~ POST ~ response:", response)

    await setAuthCookies(response.data);

    return NextResponse.json({ data: { success: true } });
  } catch (err) {
    const error = err as AxiosError;
    console.log("🚀 ~ POST ~ error:", error.request)
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
