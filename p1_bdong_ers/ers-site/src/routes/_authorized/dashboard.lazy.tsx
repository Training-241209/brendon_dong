import CreateReimbursementDialog from '@/features/reimbursements/components/create-reimbursement-dialog'
import UserReimbursementTable from '@/features/reimbursements/components/user-reimbursement-table'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authorized/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <UserReimbursementTable />
      <CreateReimbursementDialog />
    </>
  )
}
