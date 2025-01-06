import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginSchema } from "../schemas/user-input-schemas";
import { axiosInstance } from "@/lib/axios-config";
import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useLogin() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: login,
        onSuccess: (successfulResponse) => {
            // localStorage.clear()
            // localStorage.setItem("auth", successfulResponse.headers.authorization)
            queryClient.invalidateQueries({queryKey: ["auth"]})
            queryClient.setQueryData(["auth"], successfulResponse.headers.authorization)
            queryClient.refetchQueries({ queryKey: ["me"] })
        },
        onError: (error : AxiosError) => {
          if (error.status == 401) {
            toast.error("Invalid username or password.")
          } else {
            toast.error("Failed to login.")
          }
        },
    });
  
  async function login(values: z.infer<typeof loginSchema>) {
    return await axiosInstance.post('/login', {
      username: values.username,
      password: values.password,
    })
  }
}