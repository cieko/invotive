import { create } from 'zustand';
import { Invoice, BusinessEntity, InvoiceInfo, InvoiceItem } from '~/schema/invoice';

export interface InvoiceState {
  newInvoice: Partial<Invoice>;
  addSenderInfo: (senderInfo: BusinessEntity) => void;
  addRecipientInfo: (senderInfo: BusinessEntity) => void;
  addInvoiceInfo: (senderInfo: InvoiceInfo) => void;
  addItems: (items: InvoiceItem[]) => void;
  getSubtotal: () => number;
}

export const useStore = create<InvoiceState>((set, get) => ({
  newInvoice: {},
  addSenderInfo: (senderInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, sender: senderInfo } })),
  addRecipientInfo: (recipientInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, recipient: recipientInfo } })),
  addInvoiceInfo: (invoiceInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, ...invoiceInfo } })),
  addItems: (items) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, items } })),
  getSubtotal: () => {
    const items = get().newInvoice.items || [];
    return items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
  }
}));
