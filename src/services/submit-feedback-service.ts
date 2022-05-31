import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackServiceRequest {
   type: string;
   comment: string;
   screenshot?: string;
}

//Trata-se de um parametro de boas praticas, para tornar a aplicação mais manutenivel, isolamos a dependencia da função, dessa forma
//caso queira trocar o prisma por outra lib, vai ser masi fácil pois a depenência foi separada do serviço



export class SubmitFeedbackService {   
   constructor(
      private feedbacksRepository: FeedbacksRepository,
      private mailAdapter: MailAdapter,
   ) {}

   async execute(request: SubmitFeedbackServiceRequest) {
      const { type, comment, screenshot } = request;

      await this.feedbacksRepository.create({
         type, 
         comment,
         screenshot,
      })

      await this.mailAdapter.sendMail({
         subject: 'Novo feedback',
         body: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do Feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`
         ].join('')
         
      })
   }
}