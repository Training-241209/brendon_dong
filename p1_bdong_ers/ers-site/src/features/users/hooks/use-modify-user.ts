import { axiosInstance } from "@/lib/axios-config";
import { useMutation } from "@tanstack/react-query";
import User from "../schemas/user";

export default function UseModifyUser() {

    // Change password...?
    // Do not change username
    // Separate hook for manager probably
    return useMutation({
        mutationFn: async (props : User) => {
            const request = await axiosInstance.post("/reimbursements", {
                firstName: props.firstName,
                lastName: props.lastName
            })

            return request.data;
        },
        onSuccess: () => {}
    });
}