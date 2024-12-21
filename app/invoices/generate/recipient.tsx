import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormProvider, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button } from "~/components/Button";
import CustomTextInput from "~/components/CustomTextInput";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";

const senderInfoSchema = z.object({
  name: z.string({ required_error: 'Name is Required' }).min(1, 'Name is required'),
  address: z.string({ required_error: 'Address is Required' }).min(1, 'Address is required'),
  taxId: z.string().optional(),
})

type SenderInfo = z.infer<typeof senderInfoSchema>

export default function GenerateInvoice() {
  const form = useForm<SenderInfo>({
    resolver: zodResolver(senderInfoSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
