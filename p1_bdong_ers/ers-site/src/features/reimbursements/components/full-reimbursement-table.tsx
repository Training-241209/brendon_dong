import { DataTable } from "@/components/ui/data-table";
import { LoaderIcon } from "lucide-react";
import useGetAllReimbursements from "../hooks/use-get-all-reimbursements";
import { fullReimbursementColumns } from "../schemas/full-reimbursement-columns";

export default function FullReimbursementTable() {

    const {data : reimbursementData, isLoading} = useGetAllReimbursements()

    return (
        <>
            {isLoading ? <LoaderIcon className="animate-spin" /> : (<DataTable columns={fullReimbursementColumns} data={reimbursementData} />)}
        </>
    );
}