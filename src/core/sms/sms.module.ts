import { Module, OnModuleInit } from '@nestjs/common';
import { SendSMSDto, SmsService } from './sms.service';
import { HttpModule } from '../http/http.module';

@Module({
  imports: [
    HttpModule.register({
      // baseURL: 'http://185.112.33.62/api/v1/rest', // تنظیم baseURL ظبرای این ماژول
      baseURL: 'https://my.hiro-sms.com/api/v1/rest', // تنظیم baseURL ظبرای این ماژول
    }),
  ],
  providers: [SmsService],
})
export class SmsModule implements OnModuleInit {
  constructor(private readonly smsService: SmsService) {}

  async onModuleInit() {
    console.log('The module has been initialized.');

    // مقداردهی اولیه برای ارسال پیامک
    const smsDetails: SendSMSDto = {
      token: '274960aa63f900c0e6b1be5031615f952dc837ff',
      username: '09336130786',
      password: 'n9140n',
      recipient: ['09358199598'],
      message: {
        state: 'salam3',
      },
      patternId: 1217,
      from: '10003393',
      type: 0,
    };
    // from: '21000051112',

    // صدا زدن تابع sendSMS
    const result = await this.smsService.sendSMS(smsDetails);
    console.log('SMS Send Result:', result);
  }
}
