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
import usePromoteUser from "../hooks/use-promote-user";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function PromoteUserDialog(props : { userId : Number }) {

    const {mutate: promoteUser} = usePromoteUser()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Promote to Manager</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Promote User</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to promote to a manager?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="flex text-right" onClick={()=>{ promoteUser(props.userId) }}>Confirm</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}