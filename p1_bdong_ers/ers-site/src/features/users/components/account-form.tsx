import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userAccountModifySchema } from "../schemas/user-schemas";
import useMe from "@/features/auth/hooks/use-me";
import { LoaderIcon } from "lucide-react";

export function AccountForm() {
    const { data: me, isLoading } = useMe()

    const form = useForm<z.infer<typeof userAccountModifySchema>>({
        resolver: zodResolver(userAccountModifySchema),
        defaultValues: {
          firstName: me.firstName,
          lastName: me.lastName,
        },
      })

    function onSubmit(values: z.infer<typeof userAccountModifySchema>) {
      console.log(values)
    }

    return ( <>
        {isLoading ? (
          <LoaderIcon className="animate-spin" />
        ) : (
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
        )}
      </>
    )
}