import UsersTable from '@/features/users/components/users-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/_admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="py-8 min-w-[50%] max-w-screen-lg">
      <h2 className="py-1 text-center border-2 bg-slate-50 text-gray-600"><strong>All Users</strong></h2>
      <UsersTable />
    </div>
  )
}
