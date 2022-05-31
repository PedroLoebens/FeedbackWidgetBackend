import express from "express";
import { prisma } from './prisma';
import nodemailer from 'nodemailer'
import { PrismaFeedbackRepository } from "./repositories/prisma/prisma-feedbacks-repository"
import { SubmitFeedbackService } from "./services/submit-feedback-service";
import { NodemailerMailAdpater } from "./adapters/nodemailer/nodemailer-mail-adapter";

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {

   const { type, comment, screenshot } = req.body; //conceito de desetruturação, estou retirando três valores de dentro do objeto

   const prismaFeedbacksRepository = new PrismaFeedbackRepository()
   const nodemailerMailAdpater = new NodemailerMailAdpater()

   const submitFeedbackService = new SubmitFeedbackService(
      prismaFeedbacksRepository,
      nodemailerMailAdpater
   )
   await submitFeedbackService.execute({
      type,
      comment,
      screenshot,
   })



   return res.status(201).send()

});
