import { View, Text } from "react-native";
import { Button } from "~/components/Button";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";
import { useStore } from "~/store/store";

export default function InvoiceSummary() {
  const newInvoice = useStore((data) => data.newInvoice); // this method is to avoid unnecessary re-renderings
  return (
    <KeyboardAwareScrollView>
      <View className="gap-4">

        {newInvoice?.sender ? (
          <View className="rounded-lg bg-gray-50 p-4">
            <Text className="mb-2 text-lg font-semibold">Sender Information</Text>
            <View className="gap-1">
              <Text>{newInvoice.sender?.name}</Text>
              <Text>{newInvoice.sender?.address}</Text>
              <Text>{newInvoice.sender?.taxId}</Text>
            </View>
          </View>
        ) : null}

        {newInvoice?.recipient ? (
          <View className="rounded-lg bg-gray-50 p-4">
            <Text className="mb-2 text-lg font-semibold">Recipient Information</Text>
            <View className="gap-1">
              <Text>{newInvoice.recipient?.name}</Text>
              <Text>{newInvoice.recipient?.address}</Text>
              <Text>{newInvoice.recipient?.taxId}</Text>
            </View>
          </View>
        ) : null}

        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="mb-2 text-lg font-semibold">Invoice Details</Text>
          <View className="gap-1">
            <Text>Invoice #: {newInvoice?.invoiceNumber}</Text>
            <Text>Date: {newInvoice?.date}</Text>
            <Text>Due Date: {newInvoice?.dueDate}</Text>
          </View>
        </View>

        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="mb-2 text-lg font-semibold">Items</Text>
          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text className="flex-1 font-medium">Item</Text>
              <Text className="w-20 text-right font-medium">Qty</Text>
              <Text className="w-20 text-right font-medium">Price</Text>
              <Text className="w-24 text-right font-medium">Total</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="flex-1 font-medium">Web Design</Text>
              <Text className="w-20 text-right font-medium">1</Text>
              <Text className="w-20 text-right font-medium">₹ 1000</Text>
              <Text className="w-24 text-right font-medium">₹ 1,000</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="flex-1 font-medium">Development Hours</Text>
              <Text className="w-20 text-right font-medium">20</Text>
              <Text className="w-20 text-right font-medium">₹ 100</Text>
              <Text className="w-24 text-right font-medium">₹ 2,000</Text>
            </View>
          </View>
        </View>

        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="mb-2 text-lg font-semibold">Totals</Text>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text>Subtotal</Text>
              <Text>₹ 3,000</Text>
            </View>
            <View className="flex-row justify-between">
              <Text>Tax (10%)</Text>
              <Text>₹ 300</Text>
            </View>
            <View className="flex-row justify-between border-t border-dashed border-gray-300 pt-3">
              <Text className="font-semibold">Total</Text>
              <Text className="font-semibold">₹ 3300</Text>
            </View>
          </View>
        </View>

        <Button
          title="Generate Invoice"
          className="mt-4"
          onPress={() => { }}
        />

      </View>
    </KeyboardAwareScrollView>
  )
}