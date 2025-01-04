import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import UseGetReimbursements from "../hooks/use-get-reimbursements";


export default function UserReimbursementTable() {

    const {data : reimbursements} = UseGetReimbursements()

    return (
        <Table className="bg-white">
            <TableHeader>
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell>Dong, Brendon</TableCell>
                <TableCell>$10</TableCell>
                <TableCell>This is a test description! Money is useful.</TableCell>
                <TableCell>Pending</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}