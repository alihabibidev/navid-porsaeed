import { Module, OnModuleInit } from '@nestjs/common';
import { SendSMSDto, SmsService } from './sms.service';
import { HttpModule } from '../http/http.module';

@Module({
  imports: [
    HttpModule.register({
      // baseURL: 'http://185.112.33.62/api/v1/rest', // تنظیم baseURL ظبرای این ماژول
      //baseURL: 'https://my.hiro-sms.com/api/v1/rest', // تنظیم baseURL ظبرای این ماژول
      baseURL:
        'https://api-gateway.adsefid.com/webservice/api/v1.0/SendSingleMessage', // تنظیم baseURL ظبرای این ماژول
    }),
  ],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule implements OnModuleInit {
  constructor(private readonly smsService: SmsService) {}

  async onModuleInit() {
    console.log('The module has been initialized.');

    // مقداردهی اولیه برای ارسال پیامک
    // const smsDetails: SendSMSDto = {
    //   receptor: '09358199598',
    //   message: 'متن پیام لغو 11',
    //   lineNumber: '989998883664',
    //   // lineNumber: '9890000000',
    //   tag: 'test',
    // };

    // // صدا زدن تابع sendSMS
    // const result = await this.smsService.sendSMS(smsDetails);
    // console.log('SMS Send Result:', result);
  }
}
