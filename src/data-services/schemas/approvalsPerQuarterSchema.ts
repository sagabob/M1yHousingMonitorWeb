import z from "zod";

export const SingleApprovalsPerQuarterZ = z.object({
    Houses: z.number(),
    Period: z.string(),
    Other_residential: z.number(),
    Total_Residential: z.number(),
}).strip();

export type SingleApprovalsPerQuarter = z.infer<typeof SingleApprovalsPerQuarterZ>;


export const ApprovalsPerQuarterZ = z.object({
    Approvals_Per_Quarter: z.array(SingleApprovalsPerQuarterZ).default([]),
}).strip();

export type ApprovalsPerQuarter = z.infer<typeof ApprovalsPerQuarterZ>;