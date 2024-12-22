import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormProvider, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button } from "~/components/Button";
import CustomTextInput from "~/components/CustomTextInput";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";
import { router } from 'expo-router';
import { useStore } from '~/store/store';
import { BusinessEntity, businessEntityInfoSchema } from '~/schema/invoice';

export default function GenerateInvoice() {
  const addSenderInfo = useStore((data) => data.addSenderInfo);

  const form = useForm<BusinessEntity>({
    resolver: zodResolver(businessEntityInfoSchema),
    defaultValues: {
      name: 'Arnold',
      address: 'Mumbai, bandra'
    }
  });

  const onSubmit = (data: BusinessEntity) => {
    addSenderInfo(data)
    router.push('/invoices/generate/recipient')
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="mb-5 text-2xl font-bold">Sender Info</Text>

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
