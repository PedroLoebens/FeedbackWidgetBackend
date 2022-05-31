import { MailAdapter, sendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

var transport = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   auth: {
      user: "cad08f3c91922c",
      pass: "33d91839dd9c11"
   }
});

export class NodemailerMailAdpater implements MailAdapter {
   async sendMail({subject, body}: sendMailData) {
       await transport.sendMail({
      from: 'Equipe de Suporte Widget <feedback@widget.com>',
      to: ' Criador <pedro.loebens@acertapromotora.com.br>',
      subject,
      html: body,
   })
   }
}