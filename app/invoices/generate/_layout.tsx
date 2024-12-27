import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useStore } from "~/store/store";

export default function GenerateInvoiceLayout() {
  const startNewInvoice = useStore((data) => data.startNewInvoice);
  const newInvoice = useStore((data) => data.newInvoice);

  useEffect(() => {
    if (!newInvoice) {
      startNewInvoice();
    }
  }, [])

  if (!newInvoice) {
    return <ActivityIndicator />
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Sender' }} />
      <Stack.Screen name="recipient" options={{ title: 'Recipient' }} />
      <Stack.Screen name="invoice-info" options={{ title: 'Invoice Info' }} />
      <Stack.Screen name="items" options={{ title: 'Items' }} />
      <Stack.Screen name="summary" options={{ title: 'Summary' }} />
      <Stack.Screen name="success" options={{ title: 'Share', headerShown: false }} />
    </Stack>
  )
}