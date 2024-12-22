import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormProvider, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button } from "~/components/Button";
import CustomTextInput from "~/components/CustomTextInput";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";
import { router } from 'expo-router';
import { BusinessEntity, businessEntityInfoSchema } from '~/schema/invoice';
import { useStore } from '~/store/store';

export default function GenerateInvoice() {
  const addRecipientInfo = useStore((data) => data.addRecipientInfo)

  const form = useForm<BusinessEntity>({
    resolver: zodResolver(businessEntityInfoSchema),
  });

  const onSubmit = (data: BusinessEntity) => {
    addRecipientInfo(data)
    router.push('/invoices/generate/invoice-info')
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="mb-5 text-2xl font-bold">Recipient Info</Text>

        <View className="gap-2">
          <CustomTextInput
            name="name"
            label="Name"
            placeholder="Enter your name"

          />
          <CustomTextInput
            name="address"
            label="Address"
            multiline
            placeholder="Enter your address"
          />
          <CustomTextInput
            name="taxId"
            label="Tax ID"
            placeholder="Enter your Tax ID"
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
