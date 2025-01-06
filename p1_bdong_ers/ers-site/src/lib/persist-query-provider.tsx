"use client"

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { isServer, QueryClient } from '@tanstack/react-query'

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
  
function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function PersistQueryClientWrapper({children} : {children : React.ReactNode}) {
    const queryClient = getQueryClient()

    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
          {children}
        </PersistQueryClientProvider>
    )
}