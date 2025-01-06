import FullReimbursementTable from '@/features/reimbursements/components/full-reimbursement-table'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authorized/_admin/reimbursements')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="py-8 min-w-[50%] max-w-screen-lg">
      <h2 className="py-1 text-center border-2 bg-slate-50 text-gray-600"><strong>All Reimbursements</strong></h2>
      <FullReimbursementTable />
    </div>
  )
}
