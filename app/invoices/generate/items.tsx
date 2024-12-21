import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button } from "~/components/Button";
import CustomTextInput from "~/components/CustomTextInput";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";
import { router } from 'expo-router';

const invoiceItemSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  quantity: z.number({ required_error: 'Quantity is required' }),
  price: z
    .string({ required_error: "Price is required" }).min(1, 'Price is required')
    .refine((val) => /^\d*\.?\d*$/.test(val), { message: "Price must be a valid number" }),
});

// type invoiceItem = z.infer<typeof invoiceItemSchema>

const itemsSchema = z.object({
  items: invoiceItemSchema.array(),
});

type Items = z.infer<typeof itemsSchema>

export default function GenerateInvoice() {
  const form = useForm<Items>({
    resolver: zodResolver(itemsSchema),
    defaultValues: {
      items: [{
        name: '',
        quantity: 1,
        price: '',
      }]
    }
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'items'
  })


  const onSubmit = (data: any) => {
    router.push('/invoices/generate/recipient')
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <Text className="mb-5 text-2xl font-bold">Items</Text>

        <View className='gap-2'>
          {fields.map((_, index) => {
            return (
              <View key={index} className='gap-3'>
                <Text className='text-lg font-semibold'>Item {index + 1}</Text>
                <CustomTextInput name={`items.${index}.name`} label='Name' />
                <CustomTextInput
                  name={`items.${index}.quantity`}
                  label='Quantity'
                  keyboardType='numeric'
                  onChangeText={(value) => {
                    const numericValue = Number(value) || 0; // Fallback to 0 for invalid input
                    form.setValue(`items.${index}.quantity`, numericValue);
                    return numericValue;
                  }}
                />
                <CustomTextInput
                  name={`items.${index}.price`}
                  label="Price"
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    // Allow numbers with optional decimals
                    if (/^\d*\.?\d*$/.test(value)) {
                      form.setValue(`items.${index}.price`, value); // Keep as string during input
                    }
                  }}
                  onBlur={() => {
                    const value = form.getValues(`items.${index}.price`);
                    if (value === "" || !/^\d*\.?\d*$/.test(value)) {
                      form.setValue(`items.${index}.price`, "0"); // Default to "0" if invalid or empty
                    }
                  }}
                />

              </View>
            )
          })}
        </View>

        <Button
          title='Add Item'
          className='mt-3'
          onPress={() => {
            append({ name: '', quantity: 1, price: '' })
          }}
        />

        <Button
          title="Next"
          className="mt-auto"
          onPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
