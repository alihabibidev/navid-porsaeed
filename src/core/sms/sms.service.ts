import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
@Injectable()
export class SmsService {
  private axiosInstance: AxiosInstance;
  private readonly BASE_URL =
    'https://api-gateway.adsefid.com/webservice/api/v1.0/SendSingleMessage';
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
    receptor,
    message,
    tag,
    lineNumber = '989998883664',
  }: SendSMSDto): Promise<any> {
    try {
      const headers: any = {};

      headers['x-api-key'] = 'e4a210753806824ce159ef1de52dbb94884059c5';
      console.log('aliiiiiiii-1');

      const response = await this.axiosInstance.post(
        // 'SendSingleMessage',
        '',
        {
          receptor,
          lineNumber,
          message,
          tag,
        },
        {
          headers,
        },
      );
      console.log(response, 'aliiiiiiii-2');

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
  receptor: string;
  message: string;
  lineNumber?: string;
  tag?: string;
}
