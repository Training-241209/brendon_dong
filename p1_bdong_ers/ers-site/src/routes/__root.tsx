import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import QueryProvider from '@/lib/query-provider'
import { Toaster } from '@/components/ui/sonner'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <QueryProvider>
        <Outlet />
        <Toaster position="bottom-left" />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryProvider>
    </React.Fragment>
  )
}
