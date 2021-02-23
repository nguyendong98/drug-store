import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {SendGridService} from '@anchan828/nest-sendgrid';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly sendGrid: SendGridService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/mail')
  async root(@Body() data: any): Promise<void> {
    const mailTo = data.email;
    await this.sendGrid.send({
      to: mailTo,
      from: "dv.pharmacyy@gmail.com",
      subject: "Đặt hàng thành công",
      text: "and easy to do anywhere, even with Node.js",
      html: "" +
          "<div>Bạn đã đặt hàng thành công, hãy chờ xác nhận của quản trị viên</div>" +

          "<div>Hóa đơn của bạn: </div>" +
          data.bill.map(val => (
              `<div>${val.name} x ${val.qty}</div>`
          )) +
          `<div>Tổng số tiền phải trả: <b>${data.totalAmount.toLocaleString()} VND</b></div>`
    });
  }

  @Post('/mail/approve')
  async approve(@Body() data: any): Promise<void> {
    const mail = data.email;
    await this.sendGrid.send({
      to: mail,
      from: "dv.pharmacyy@gmail.com",
      subject: "Đơn hàng được duyệt",
      text: "and easy to do anywhere, even with Node.js",
      html: "" +
          "<div>Đơn hàng của bạn đã được duyệt, sản phẩm sẽ được giao đến bạn trong thời gian sớm nhất</div>"


    });
  }

}
