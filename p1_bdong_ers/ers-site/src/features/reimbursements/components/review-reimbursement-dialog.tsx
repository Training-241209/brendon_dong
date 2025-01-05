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
                    Input reimbursement information here!
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="flex text-right" onClick={()=>{ clickHandler(props, "approved")}}>Approve</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="flex text-right px-4" onClick={()=>{ clickHandler(props, "denied")}}>Deny</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}