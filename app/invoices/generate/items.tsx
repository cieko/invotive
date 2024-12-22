import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button } from "~/components/Button";
import CustomTextInput from "~/components/CustomTextInput";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";
import { router } from 'expo-router';
import { InvoiceItem, invoiceItemSchema } from '~/schema/invoice';
import { useStore } from '~/store/store';

const itemsSchema = z.object({
  items: invoiceItemSchema.array(),
});

type Items = z.infer<typeof itemsSchema>

export default function GenerateInvoice() {
  const addItems = useStore((data) => data.addItems)

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


  const onSubmit = (data: { items: InvoiceItem[] }) => {
    addItems(data.items)
    router.push('/invoices/generate/summary')
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <View className='gap-2'>
          {fields.map((_, index) => {
            return (
              <View key={index} className='gap-3 rounded-lg bg-gray-50 p-4 shadow-md pb-8'>
                <Text className='text-lg font-semibold'>Item {index + 1}</Text>
                <CustomTextInput name={`items.${index}.name`} label='Name' />

                <View className='flex-row gap-3'>
                  <View className='flex-1'>
                    <CustomTextInput
                      name={`items.${index}.price`}
                      label="Price"
                      keyboardType="numeric"
                      onChangeText={(value) => {
                        if (/^\d*\.?\d*$/.test(value)) {
                          form.setValue(`items.${index}.price`, value); 
                        }
                      }}
                      onBlur={() => {
                        const value = form.getValues(`items.${index}.price`);
                        if (value === "" || !/^\d*\.?\d*$/.test(value)) {
                          form.setValue(`items.${index}.price`, "0"); 
                        }
                      }}
                    />
                  </View>

                  <View className='flex-1'>
                    <CustomTextInput
                      name={`items.${index}.quantity`}
                      label='Quantity'
                      keyboardType='numeric'
                      onChangeText={(value) => {
                        const numericValue = Number(value) || 0; 
                        form.setValue(`items.${index}.quantity`, numericValue);
                        return numericValue;
                      }}
                    />
                  </View>

                  <View className='flex-1'>
                    <Text className='text-lg text-center'>Total</Text>
                    <Text className='mt-4 text-lg text-center font-bold'>
                      ₹
                      {(parseFloat(form.watch(`items.${index}.price`)) || 0) * (form.watch(`items.${index}.quantity`) || 1)}
                    </Text>
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        <Button
          title='Add Item'
          className='mt-3'
          variant='outline'
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
