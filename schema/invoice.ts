import { z } from "zod"

export const businessEntityInfoSchema = z.object({
  name: z.string({ required_error: 'Name is Required' }).min(1, 'Name is required'),
  address: z.string({ required_error: 'Address is Required' }).min(1, 'Address is required'),
  taxId: z.string().optional(),
})

export type BusinessEntity = z.infer<typeof businessEntityInfoSchema>

export const invoiceInfoSchema = z.object({
  invoiceNumber: z
    .string({ required_error: 'Invoice number is Required' })
    .min(1, 'Invoice number is required'),
  date: z.string({ required_error: 'Date is Required' }).min(1, 'Date is required'),
  dueDate: z.string({ required_error: 'Due Date is Required' }).min(1, 'Due Date is required'),
})

export type InvoiceInfo = z.infer<typeof invoiceInfoSchema>

export type Invoice = InvoiceInfo & {
  sender: BusinessEntity;
  recipient: BusinessEntity;
};