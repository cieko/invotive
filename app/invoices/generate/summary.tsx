import { View, Text } from "react-native";
import { Button } from "~/components/Button";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";

export default function InvoiceSummary() {
  return (
    <KeyboardAwareScrollView>
      <View className="gap-4">

        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="mb-2 text-lg font-semibold">Sender Information</Text>
          <View className="gap-1">
            <Text>John Doe</Text>
            <Text>123 Business Street</Text>
            <Text>City, State 12345</Text>
            <Text>john@example.com</Text>
          </View>
        </View>

        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="mb-2 text-lg font-semibold">Recipient Information</Text>
          <View className="gap-1">
            <Text>Jane Smith</Text>
            <Text>456 Client Avenue</Text>
            <Text>City, State 67890</Text>
            <Text>jane@example.com</Text>
          </View>
        </View>

        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="mb-2 text-lg font-semibold">Invoice Details</Text>
          <View className="gap-1">
            <Text>Invoice #: INV-2023-001</Text>
            <Text>Date: November 15, 2023</Text>
            <Text>Due Date: December 15, 2023</Text>
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
          onPress={() => {}}
        />

      </View>
    </KeyboardAwareScrollView>
  )
}