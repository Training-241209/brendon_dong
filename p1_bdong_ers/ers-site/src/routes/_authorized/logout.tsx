import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authorized/logout')({
  component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient()
    const router = useRouter()

    useEffect(() => {
        queryClient.invalidateQueries()
        router.navigate({to: "/login"})
    });
}
