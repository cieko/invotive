import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormProvider, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button } from "~/components/Button";
import CustomTextInput from "~/components/CustomTextInput";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";
import { router } from 'expo-router';
import { InvoiceInfo, invoiceInfoSchema } from '~/schema/invoice';
import { useStore } from '~/store/store';

export default function GenerateInvoice() {
  const addInvoiceInfo = useStore((data) => data.addInvoiceInfo)

  const form = useForm<InvoiceInfo>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      date: new Date().toDateString(),
    }
  });

  const onSubmit = (data: InvoiceInfo) => {
    addInvoiceInfo(data)
    router.push('/invoices/generate/items')
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="mb-5 text-2xl font-bold">Invoice Info</Text>

        <View className="gap-2">
          <CustomTextInput
            name="invoiceNumber"
            label="Invoice Number"
            placeholder="Invoice Number"
          />
          <CustomTextInput
            name="date"
            label="Date"
            placeholder="Date of Generation"
          />
          <CustomTextInput
            name="dueDate"
            label="Due Date"
            placeholder="Due Date"
          />
        </View>

        <Button
          title="Next"
          className="mt-auto"
          onPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
