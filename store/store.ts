import { create } from 'zustand';
import { Invoice, BusinessEntity, InvoiceInfo } from '~/schema/invoice';

export interface InvoiceState {
  newInvoice: Partial<Invoice>;
  addSenderInfo: (senderInfo: BusinessEntity) => void;
  addRecipientInfo: (senderInfo: BusinessEntity) => void;
  addInvoiceInfo: (senderInfo: InvoiceInfo) => void;
}

export const useStore = create<InvoiceState>((set) => ({
  newInvoice: {},
  addSenderInfo: (senderInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, senderInfo } })),
  addRecipientInfo: (recipientInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, recipientInfo } })),
  addInvoiceInfo: (invoiceInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, ...invoiceInfo } }))
}));
