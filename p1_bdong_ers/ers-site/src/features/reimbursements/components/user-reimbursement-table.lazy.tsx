import UseGetUserReimbursements from "../hooks/use-get-user-reimbursements";
import { DataTable } from "@/components/ui/data-table";
import { LoaderIcon } from "lucide-react";
import { myReimbursementColumns } from "../schemas/user-reimbursement-columns";

export default function UserReimbursementTable() {

    const {data : reimbursementData, isLoading} = UseGetUserReimbursements()

    return (
        <>
            {isLoading ? <LoaderIcon className="animate-spin" /> : (<DataTable columns={myReimbursementColumns} data={reimbursementData} />)}
        </>
    );
}