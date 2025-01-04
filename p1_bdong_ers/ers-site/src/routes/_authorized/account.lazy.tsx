import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useMe from '@/features/auth/hooks/use-me'
import { userModifySchema } from '@/features/users/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createLazyFileRoute('/_authorized/account')({
  component: RouteComponent,
})

function onSubmit(values: z.infer<typeof userModifySchema>) {
  console.log(values)
}

function RouteComponent() {
  const { data: me } = useMe()
  console.log(me);
  const form = useForm<z.infer<typeof userModifySchema>>({
    resolver: zodResolver(userModifySchema),
    defaultValues: {
      firstName: me.firstName,
      lastName: me.lastName,
    },
  })

  return (
    <div className="bg-white px-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
