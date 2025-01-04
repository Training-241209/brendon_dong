import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { registerSchema } from "../schemas/user-input-schemas";
import { axiosInstance } from "@/lib/axios-config";
import { z } from "zod";
import { AxiosError } from "axios";

export default function useRegister() {
    const router = useRouter()

    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            router.navigate({to:"/login"})
        },
        onError: (error : AxiosError) => {
            console.log(error.response);
        },
    });
  
  async function register(values: z.infer<typeof registerSchema>) {
    return await axiosInstance.post('/register', {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password,
    })
  }
}