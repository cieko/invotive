import { View, Text } from "react-native";
import { Link, Redirect } from "expo-router";
import { Button } from "~/components/Button";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";
import { useStore } from "~/store/store";

export default function InvoiceSummary() {
  const newInvoice = useStore((data) => data.newInvoice); // this method is to avoid unnecessary re-renderings
  const subTotal = useStore((data) => data.getSubtotal);

  if (!newInvoice) {
    return (
      <Redirect href="/" />
    )
  }

  return (
    <KeyboardAwareScrollView>
      <View className="gap-4">
        <View className="rounded-lg p-4">
          <Text className="text-sm text-stone-400 font-semibold">Invoice Details</Text>
          <View className="gap-1">
            <Text className="text-2xl font-semibold">#{newInvoice?.invoiceNumber}</Text>
            <Text className="mt-2">Date: {newInvoice?.date?.toDateString()}</Text>
            {newInvoice?.dueDate ? <Text>Due Date: {newInvoice?.dueDate?.toDateString()}</Text> : null}
          </View>
        </View>

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
          <Text className="mb-2 text-lg font-semibold">Items</Text>
          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text className="flex-1 font-medium">Item</Text>
              <Text className="w-20 text-right font-medium">Qty</Text>
              <Text className="w-20 text-right font-medium">Price</Text>
              <Text className="w-24 text-right font-medium">Total</Text>
            </View>

            {newInvoice?.items?.map((item, index) => {
              return (
                <View className="flex-row justify-between" key={index}>
                  <Text className="flex-1 font-medium">{item.name}</Text>
                  <Text className="w-20 text-right font-medium">{item.quantity}</Text>
                  <Text className="w-20 text-right font-medium">₹ {new Intl.NumberFormat('en-IN').format(parseFloat(item.price))}</Text>
                  <Text className="w-24 text-right font-medium">₹ {new Intl.NumberFormat('en-IN').format(item.quantity * parseFloat(item.price))}</Text>
                </View>
              )
            })}
          </View>
        </View>

        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="mb-2 text-lg font-semibold">Totals</Text>
          <View className="*:gap-2">
            <View className="flex-row justify-between">
              <Text>Subtotal</Text>
              <Text>₹ {new Intl.NumberFormat('en-IN').format(subTotal())}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text>Tax (10%)</Text>
              <Text>₹ {new Intl.NumberFormat('en-IN').format(0.1 * subTotal())}</Text>
            </View>
            <View className="flex-row justify-between border-t border-dashed border-gray-300 pt-3">
              <Text className="font-semibold">Total</Text>
              <Text className="font-semibold">₹ {new Intl.NumberFormat('en-IN').format(subTotal() * 1.1)}</Text>
            </View>
          </View>
        </View>

        <Link href={'/invoices/generate/success'} asChild>
          <Button
            title="Generate Invoice"
            className="mt-auto"
            // onPress={handleGeneratePDF}
          />
        </Link>

      </View>
    </KeyboardAwareScrollView>
  )
}