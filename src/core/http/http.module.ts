import { Module, DynamicModule } from '@nestjs/common';
import { HttpModule as AxiosModule, HttpModuleOptions } from '@nestjs/axios';
import { HttpService } from './http.service';

@Module({})
export class HttpModule {
  static register(options: HttpModuleOptions): DynamicModule {
    return {
      module: HttpModule,
      imports: [
        AxiosModule.register({
          ...options,
          baseURL: options.baseURL
            ? options.baseURL
            : 'https://api.example.com', // پذیرش baseURL پویا
        }),
      ],
      providers: [HttpService],
      exports: [HttpService],
    };
  }
}

// some.module.ts

// import { Module } from '@nestjs/common';
// import { HttpModule } from './http.module';

// @Module({
//   imports: [
//     HttpModule.register({
//       baseURL: 'https://api.example1.com', // تنظیم baseURL برای این ماژول
//     }),
//   ],
//   // سایر تنظیمات ماژول
// })
// export class SomeModule {}
