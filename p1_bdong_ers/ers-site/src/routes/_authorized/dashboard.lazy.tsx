import CreateReimbursementDialog from '@/features/reimbursements/components/create-reimbursement-dialog'
import UserReimbursementTable from '@/features/reimbursements/components/user-reimbursement-table.lazy'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authorized/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className=" max-w-md justify-center items-center py-8">
        <h2 className="py-1 text-center border-2 bg-slate-50 text-gray-600"><strong>My Reimbursements</strong></h2>
        <UserReimbursementTable />
        <div className="flex flex-row justify-end">
          <CreateReimbursementDialog />
        </div>
    </div>
  )
}
