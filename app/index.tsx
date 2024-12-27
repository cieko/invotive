import { Stack, Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '~/components/Button';

export default function Home() {
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

        <Link 
          href={{ pathname: '/invoices/generate' }} 
          className='w-full shadow-lg shadow-gray-800'
          asChild 
          >
          <Button title='New Invoice' />
        </Link>
      </View>
    </>
  );
}
