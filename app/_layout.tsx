import { Stack } from 'expo-router';
import { vexo } from 'vexo-analytics'

import '../global.css';

if (!__DEV__) {
  vexo(process.env.VEXO_API_KEY || '')
}

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name='invoices/generate' options={{ headerShown: false }} />
    </Stack>
  );
}
