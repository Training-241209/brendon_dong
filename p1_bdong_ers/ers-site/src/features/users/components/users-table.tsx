import { DataTable } from "@/components/ui/data-table";
import { LoaderIcon } from "lucide-react";
import useGetUsers from "../hooks/use-get-users";
import { userColumns } from "../schemas/user-columns";

export default function UsersTable() {

    const {data : userData, isLoading} = useGetUsers()

    return (
        <>
            {isLoading ? <LoaderIcon className="animate-spin" /> : (<DataTable columns={userColumns} data={userData} />)}
        </>
    );
}