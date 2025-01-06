import useAuth from '@/features/auth/hooks/use-auth'
import AccountForm from '@/features/users/components/account-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/account')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: auth, isStale, isLoading } = useAuth()
  return ( <>
    { isLoading || !auth ? <></>:
      <div className="my-4 flex-col max-h-[80vh]">
        <h2 className="py-1 text-center border-2 bg-slate-50 text-gray-600">Account Details</h2>
        <div className="bg-white px-12 min-w-[50%] max-w-screen-lg">
          <AccountForm />
        </div>
      </div>
    }
    </>
  )
}
