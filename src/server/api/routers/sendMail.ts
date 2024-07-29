import * as trpc from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import {google} from 'googleapis'



export const mailRouter:any = createTRPCRouter({
    sendMail:publicProcedure.
    input(z.object({
      subject: z.string(),
      message: z.string(),
    }))
    .mutation(async ({ input, ctx }:{input: z.infer<typeof mailRouter["input"]>,ctx:any}) => {
        console.log(ctx.session.accessToken);
        const subscribers=await ctx.db.subscribers.findMany({
          where:{
            subscribedto:ctx.session.user?.email
          }
        })
        
        if (!ctx.session || !ctx.session.accessToken) {
            throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
          }
    
          const oauth2Client = new google.auth.OAuth2();
          oauth2Client.setCredentials({
            access_token: ctx.session.accessToken,
          });
          const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
          for(const subscriber of subscribers){
            const rawMessage = [
              `From: ${ctx.session?.user?.email}`,
              `To: ${subscriber.email}`,
              'Content-Type: text/html; charset=utf-8',
              'MIME-Version: 1.0',
              `Subject: ${input.subject}`,
              '',
              input.message.replace(/\n/g, '<br>'),
            ].join('\r\n');
            try {
              await gmail.users.messages.send({
                userId: 'me',
                requestBody: {
                  raw: Buffer.from(rawMessage).toString('base64'),
                  
                },
                
              });
            } catch (error:any) {
              throw new trpc.TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
            }
            console.log(subscriber.email)
          }
     
    
    })

        
      

      
  });


