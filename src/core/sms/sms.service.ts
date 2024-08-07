import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
@Injectable()
export class SmsService {
  private axiosInstance: AxiosInstance;
  private readonly BASE_URL = 'http://185.112.33.62/api/v1/rest';
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const errorHandler = async (error) => {
      if (error.response?.status === 401) {
        console.error(
          `error 401 received going to authenticate`,
          error.response.data,
        );
      }
      return Promise.reject(error);
    };
    this.axiosInstance.interceptors.response.use(null, errorHandler);
  }

  async sendSMS({
    token,
    username,
    password,
    from,
    recipients,
    message,
    patternId,
    type,
  }: SendSMSDto): Promise<any> {
    try {
      const headers: any = {};

      // تنظیم احراز هویت
      if (token) {
        headers['token'] = token;
      } else {
        headers['username'] = username;
        headers['password'] = password;
      }

      const response = await this.axiosInstance.post(
        '/sms/pattern-send',
        {
          recipients,
          message,
          from,
          type,
          patternId,
        },
        {
          headers,
        },
      );
      console.log(response);

      if (response.status !== 200) {
        throw new Error(`Authentication failed, status: ${response.status}`);
      }
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        error: `خطا در ارتباط با سرور: ${error.message}`,
      };
    }
  }
}

export interface SendSMSDto {
  token?: string;
  username?: string;
  password?: string;
  recipients: string[];
  message: { [key: string]: string };
  from: string;
  type: number;
  patternId: number | string;
}
