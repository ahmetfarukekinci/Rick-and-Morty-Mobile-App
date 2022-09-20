import React from 'react';
import Navigator from './src/navigation/';
import {QueryClientProvider, QueryClient} from 'react-query';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigator />
    </QueryClientProvider>
  );
}
