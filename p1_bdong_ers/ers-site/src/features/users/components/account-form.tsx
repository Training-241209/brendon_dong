import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userAccountModifySchema } from "../schemas/user-schemas";
import useMe from "@/features/auth/hooks/use-me";
import { LoaderIcon } from "lucide-react";
import useModifyUser from "../hooks/use-modify-user";

export default function AccountForm() {
    const { data: me, isLoading } = useMe();
    const { mutate: modifyUser, isPending } = useModifyUser();

    const form = useForm<z.infer<typeof userAccountModifySchema>>({
        resolver: zodResolver(userAccountModifySchema),
        defaultValues: {
          firstName: me.firstName,
          lastName: me.lastName,
          username: me.username,
          userId: me.userId
        },
      })

    function onSubmit(values: z.infer<typeof userAccountModifySchema>) {
      console.log("TEST")
      console.log(values)
      modifyUser(values)
    }

    return ( <>
        {isLoading || !me ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 grid grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="m-2">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem className="m-2">
                      <FormLabel>User ID (Read Only)</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="m-2">
                      <FormLabel>Username (Read Only)</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </>
        )}
      </>
    )
}