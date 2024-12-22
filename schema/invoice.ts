import { z } from "zod"

export const businessEntityInfoSchema = z.object({
  name: z.string({ required_error: 'Name is Required' }).min(1, 'Name is required'),
  address: z.string({ required_error: 'Address is Required' }).min(1, 'Address is required'),
  taxId: z.string().optional(),
})

export type BusinessEntity = z.infer<typeof businessEntityInfoSchema>

export type Invoice = {
  sender: BusinessEntity;
  recipient: BusinessEntity;
};