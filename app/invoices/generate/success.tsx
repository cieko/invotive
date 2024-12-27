import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { shareAsync } from 'expo-sharing';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import { customEvent } from 'vexo-analytics';

import { Button } from '~/components/Button'
import { Invoice } from '~/schema/invoice';
import { useStore } from '~/store/store';
import { generateInvoicePDF } from '~/utils/pdf';

export default function Success() {

  const [loading, setLoading] = useState(true);
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  const resetNewInvoice = useStore((data) => data.resetNewInvoice);
  const newInvoice = useStore((data) => data.newInvoice); // this method is to avoid unnecessary re-renderings
  const subTotal = useStore((data) => data.getSubtotal);

  const handleGeneratePDF = async () => {
    try {
      setLoading(true);
      const uri = await generateInvoicePDF(newInvoice as Invoice)

      if (uri) {
        setPdfUri(uri);

        customEvent('invoice_pdf_generated', {
        })
      } else {
        throw new Error('Something went wrong while generating PDF');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error while generating PDF:', error);
    }
  }

  const handleShare = async () => {

    if (!pdfUri) {
      return;
    }

    await shareAsync(pdfUri, { UTI: '.pdf', mimeType: 'application/pdf' });
    customEvent('invoice_pdf_shared', {
    })
  }

  useEffect(() => {
    handleGeneratePDF();
  }, [])

  return (
    <View className='flex-1 items-center justify-center p-4'>
      {loading ? (
        <View className='mb-8 items-center gap-4'>
          <MaterialCommunityIcons name='loading' size={80} color='gray' />
          <Text className='text-center text-2xl font-bold'>Generating Invoice...</Text>

          <Text className='text=center text-gray-600'>
            Please wait while we generate your invoice
          </Text>
        </View>
      ) : (
        <View className='mb-8 items-center gap-4'>
          <MaterialCommunityIcons name='check-circle' size={80} color='green' />
          <Text className='text-center text-2xl font-bold'>Invoice Generated!</Text>

          <Text className='text-center text-gray-600'>
            Your invoice has been generated and ready to share
          </Text>
        </View>
      )}

      <View className='w-full gap-4'>
        <Button
          title='Share Invoice'
          // icon='share'
          onPress={handleShare}
        />
        <Button
          title='Back to Home'
          onPress={() => {
            resetNewInvoice();
            router.push('/');
          }}
          variant='link'
        />
      </View>
    </View>
  )
}
