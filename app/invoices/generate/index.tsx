import { Text } from 'react-native';
import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';

import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView'

export default function GenerateInvoice() {
  return (
    <KeyboardAwareScrollView>
      <Text className='mb-5 text-2xl font-bold'>Sender Info</Text>

      <CustomTextInput label='Name' placeholder='Enter your name' />
      <CustomTextInput label='Address' multiline placeholder='Enter your address' />
      <CustomTextInput label='Tax ID' placeholder='Enter your Tax ID' />

      <Button title='Next' className='mt-auto' />
    </KeyboardAwareScrollView>
  );
}