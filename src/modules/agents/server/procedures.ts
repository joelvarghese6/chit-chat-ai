import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { db } from "@/db"
import { agents } from "@/db/schema"
import { TRPCError } from "@trpc/server";
import { AgentsInsertSchema } from "../schema";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        const [existingAgent] = await db
            .select({
                ...getTableColumns(agents),
                meetingCount: sql<number>`5`
            })
            .from(agents)
            .where(eq(agents.id, input.id))

        //throw new TRPCError({ code: "BAD_REQUEST" })
        return existingAgent;
    }),
    getMany: protectedProcedure.query(async () => {
        const data = await db
            .select({
                ...getTableColumns(agents),
                meetingCount: sql<number>`5`
            })
            .from(agents);

        //throw new TRPCError({ code: "BAD_REQUEST" })
        return data;
    }),
    create: protectedProcedure
        .input(AgentsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning();

            return createdAgent
        })
})