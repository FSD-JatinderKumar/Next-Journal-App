'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient()

const ClientProvider = ({children,}:{children:any}) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer newestOnTop={false} closeOnClick />
      </QueryClientProvider>
    </div>
  )
}

export default ClientProvider;