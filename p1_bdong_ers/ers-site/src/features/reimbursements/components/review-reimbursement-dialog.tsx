import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import UseStatusReimbursement from "../hooks/use-status-reimbursement";
import Reimbursement, { reimbursementDisplaySchema, reimbursementReviewSchema } from "../schemas/reimbursement-schemas";
import { z } from "zod";
import { StampIcon } from "lucide-react";

export default function ReviewReimbursementDialog(props : z.infer<typeof reimbursementDisplaySchema>) {

    const {mutate: updateStatus} = UseStatusReimbursement()

    function clickHandler(props : z.infer<typeof reimbursementDisplaySchema>, newStatus : string) {
        const newReimbursement : z.infer<typeof reimbursementReviewSchema> = {
            status: newStatus,
            reimbursementId: props.reimbursementId
        }
        updateStatus(newReimbursement)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border bg-slate-500 rounded-xl py-0">
                    <StampIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Review Reimbursement</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {props.firstName} {props.lastName} - <strong>${props.amount}</strong> <br />
                    {props.description}
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="flex text-right px-4 bg-red-500 hover:bg-red-700" onClick={()=>{ clickHandler(props, "DENIED")}}>
                            <strong>Deny</strong>
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="flex text-right bg-green-500 hover:bg-green-700" onClick={()=>{ clickHandler(props, "ACCEPTED")}}>
                            <strong>Approve</strong>
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}