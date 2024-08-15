import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
@Injectable()
export class SmsService {
  private axiosInstance: AxiosInstance;
  // private readonly BASE_URL = 'http://185.112.33.62/api/v1/rest';
  private readonly BASE_URL =
    'https://api-gateway.adsefid.com/webservice/api/v1.0/SendSingleMessage';
  // private readonly BASE_URL =
  //   'http://api-gateway.adsefid.com/webservice/api/v1.0/SendSingleMessage';
  // private readonly BASE_URL =
  //   '/api-gateway.adsefid.com/webservice/api/v1.0/SendSingleMessage';
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
    lineNumber,
    receptor,
    message,
    tag,
  }: SendSMSDto): Promise<any> {
    try {
      const headers: any = {};

      headers['x-api-key'] = 'e4a210753806824ce159ef1de52dbb94884059c5';
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
  receptor: string;
  message: string;
  lineNumber: string;
  tag?: string;
}
