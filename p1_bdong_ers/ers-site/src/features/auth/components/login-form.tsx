import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios-config";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form"

import { z } from "zod"
 
const formSchema = z.object({
  username: z.string(),
  password: z.string()
})

export default function LoginForm() {
  
  const router = useRouter()
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  // { I'm not understanding what sets the initial query data of ["auth"] in the query client. }
  // { Without it being set, queryClient.setQueryData() }
  // { The examples I'm seeing are either for GET requests, or I'm not seeing and following where the value is getting set. }
  // { For now, I'm going to comment this out and rely on Bao's example, but I'd like to understand what I'm missing. }
  //
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (successfulResponse) => {
      queryClient.invalidateQueries({queryKey: ["auth"]})
      queryClient.setQueryData(["auth"], successfulResponse.headers.authorization)
      router.navigate({to:"/"})
    },
    onError: (error : AxiosError) => {
      //TODO: Use state to affect + disable components, display error, etc
      console.log(error.response);
    },
  });
  
  async function login(values: z.infer<typeof formSchema>) {
    return await axiosInstance.post('/login', {
      username: values.username,
      password: values.password,
    })
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage />
        <Button className="flex text-right" type="submit">Submit</Button>
      </form>
    </Form>
  )
}
