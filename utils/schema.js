import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id:serial('id').primaryKey(), 
    jsonMockResp:text('jsonMockResp').notNull(), 
    jobPosition:varchar('jobPosition').notNull(), 
    jobDescription:varchar('jobDescription').notNull(), 
    jobExperience:varchar('jobexperience').notNull(), 
    createBy: varchar('createdBy').notNull(), 
    createdAt: varchar('createdAt').notNull(), 
    mockId: varchar('mockID').notNull(), 
})