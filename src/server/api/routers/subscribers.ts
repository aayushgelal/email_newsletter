import { Context } from "react";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const subscriberRouter:any = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string().min(1) }))
    .mutation(async ({ ctx, input }:{ctx:any,input: z.infer<typeof subscriberRouter["input"]>,}) => {

      return await ctx.db.subscribers.create({
        data: {
          email: input.email,
          subscribedto:ctx.session.user?.email,
          mailSent:0
          
        },
      });
    }),
  getSubscribers: publicProcedure.query(({ ctx }:{ctx:any}) => {
    return ctx.db.subscribers.findMany({
      orderBy: { time: "desc" },
      where:{
        subscribedto:ctx.session.user?.email
      }
    });

})
});
