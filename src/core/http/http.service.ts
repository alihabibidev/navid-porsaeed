// http.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {
  private readonly logger = new Logger(HttpService.name);

  constructor(private readonly axiosHttpService: AxiosHttpService) {}

  get<T>(
    endpoint: string,
    params?: any,
    headers?: Record<string, string>,
  ): Observable<T> {
    this.logger.log(
      `GET request to ${endpoint} with params ${JSON.stringify(params)} and headers ${JSON.stringify(headers)}`,
    );
    return this.axiosHttpService.get<T>(endpoint, { params, headers }).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        this.logger.error(
          `Error fetching data from ${endpoint}: ${error.message}`,
        );
        throw new Error(`Error fetching data: ${error.message}`);
      }),
    );
  }

  post<T>(
    endpoint: string,
    data: any,
    headers?: Record<string, string>,
  ): Observable<T> {
    this.logger.log(
      `POST request to ${endpoint} with data ${JSON.stringify(data)} and headers ${JSON.stringify(headers)}`,
    );
    return this.axiosHttpService.post<T>(endpoint, data, { headers }).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        this.logger.error(
          `Error posting data to ${endpoint}: ${error.message}`,
        );
        throw new Error(`Error posting data: ${error.message}`);
      }),
    );
  }

  put<T>(
    endpoint: string,
    data: any,
    headers?: Record<string, string>,
  ): Observable<T> {
    this.logger.log(
      `PUT request to ${endpoint} with data ${JSON.stringify(data)} and headers ${JSON.stringify(headers)}`,
    );
    return this.axiosHttpService.put<T>(endpoint, data, { headers }).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        this.logger.error(
          `Error updating data at ${endpoint}: ${error.message}`,
        );
        throw new Error(`Error updating data: ${error.message}`);
      }),
    );
  }

  delete<T>(endpoint: string, headers?: Record<string, string>): Observable<T> {
    this.logger.log(
      `DELETE request to ${endpoint} with headers ${JSON.stringify(headers)}`,
    );
    return this.axiosHttpService.delete<T>(endpoint, { headers }).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        this.logger.error(
          `Error deleting data at ${endpoint}: ${error.message}`,
        );
        throw new Error(`Error deleting data: ${error.message}`);
      }),
    );
  }

  patch<T>(
    endpoint: string,
    data: any,
    headers?: Record<string, string>,
  ): Observable<T> {
    this.logger.log(
      `PATCH request to ${endpoint} with data ${JSON.stringify(data)} and headers ${JSON.stringify(headers)}`,
    );
    return this.axiosHttpService.patch<T>(endpoint, data, { headers }).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        this.logger.error(
          `Error patching data at ${endpoint}: ${error.message}`,
        );
        throw new Error(`Error patching data: ${error.message}`);
      }),
    );
  }
}
