import { FormProvider, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button } from "~/components/Button";
import CustomTextInput from "~/components/CustomTextInput";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";

export default function GenerateInvoice() {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
            control={form.control}
            rules={{
              required: "Name is required!",
              maxLength: { value: 50, message: "Name cannot exceed 50 characters!" },
            }}
          />
          <CustomTextInput
            name="address"
            label="Address"
            multiline
            placeholder="Enter your address"
            control={form.control}
            rules={{
              required: "Address is required!",
            }}
          />
          <CustomTextInput
            name="taxId"
            label="Tax ID"
            placeholder="Enter your Tax ID"
            control={form.control}
            rules={{
              required: "Tax ID is required!",
              pattern: {
                value: /^[0-9]{9}$/,
                message: "Tax ID must be a 9-digit number!",
              },
            }}
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
