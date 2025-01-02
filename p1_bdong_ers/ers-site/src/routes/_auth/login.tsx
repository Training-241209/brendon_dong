import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import LoginForm from '@/features/auth/components/login-form'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Input your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <Link to="/register">Register</Link>
      </CardFooter>
    </Card>
  )
}
