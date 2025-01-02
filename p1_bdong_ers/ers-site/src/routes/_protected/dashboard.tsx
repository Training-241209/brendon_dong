import CreateReimbursementDialog from '@/features/reimbursements/components/create-reimbursement-dialog'
import UserReimbursementTable from '@/features/reimbursements/components/user-reimbursement-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<>
    <UserReimbursementTable />
    <CreateReimbursementDialog />
    </>
  )
}
