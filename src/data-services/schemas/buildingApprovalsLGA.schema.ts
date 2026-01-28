import z from "zod";

export const BuildingApprovalZ = z.object({
    Number_House: z.number(),
    Number_Other: z.number(),
    Number_Total: z.number(),
    Year: z.number(),
    Year_Label: z.string(),
}).strip();

export const BuildingApprovalsLGAZ = z.object({
    LGA: z.array(BuildingApprovalZ).default([]),
}).strip();


export type BuildingApproval = z.infer<typeof BuildingApprovalZ>;
export type BuildingApprovalsLGA = z.infer<typeof BuildingApprovalsLGAZ>;