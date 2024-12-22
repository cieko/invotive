import { create } from 'zustand';
import { Invoice, BusinessEntity } from '~/schema/invoice';

export interface InvoiceState {
  newInvoice: Partial<Invoice>;
  addSenderInfo: (senderInfo: BusinessEntity) => void;
  addRecipientInfo: (senderInfo: BusinessEntity) => void;
}

export const useStore = create<InvoiceState>((set) => ({
  newInvoice: {},
  addSenderInfo: (senderInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, senderInfo } })),
  addRecipientInfo: (recipientInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, recipientInfo } })),
}));
