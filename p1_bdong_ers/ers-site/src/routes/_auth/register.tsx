import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import RegisterForm from '@/features/auth/components/register-form'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Sign up</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <Link to="/login">Login</Link>
      </CardFooter>
    </Card>
  )
}
