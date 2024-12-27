import { Stack, Link, router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { customEvent } from 'vexo-analytics';
import { Button } from '~/components/Button';

export default function Home() {
  const onNewInvoice = () => {
    customEvent('start_generating_invoice', {});
    router.push('/invoices/generate');
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View className='flex-1 items-center justify-center gap-8 p-8'>
        <View className='items-center gap-2'>
          <Text className='text-2xl font-bold'>Invoice Generator</Text>
          <Text className='text-sm text-center'>
            Create and share professional invoices in seconds.
          </Text>
        </View>


        <Button title='New Invoice' className='w-full shadow-lg shadow-gray-800' onPress={onNewInvoice} />

      </View>
    </>
  );
}
