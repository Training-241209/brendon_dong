import UseGetUsers from '@/features/users/hooks/use-get-users'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authorized/_admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: userData } = UseGetUsers();
  return <div>Hello "/"!</div>
}
