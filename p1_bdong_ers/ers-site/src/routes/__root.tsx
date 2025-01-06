import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PersistQueryClientWrapper from '@/lib/persist-query-provider'
import QueryProvider from '@/lib/query-provider'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <QueryProvider>
        <Outlet />
        <Toaster position="bottom-left" />
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </QueryProvider>
    </React.Fragment>
  )
}
