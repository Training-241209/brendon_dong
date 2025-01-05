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
import { z } from "zod";
import { userViewSchema } from "../schemas/user-schemas";
import UseDeleteUser from "../hooks/use-delete-user";

export default function DeleteUserDialog(props : z.infer<typeof userViewSchema>) {

    const {mutate: deleteUser} = UseDeleteUser()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem className="text-red-700" onSelect={(e) => e.preventDefault()}>Delete User</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete user <strong>{props.username}</strong>? <br />
                    <strong className="text-red-500">This action is permanent!</strong>
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive" className="flex text-right" onClick={()=>{ deleteUser(props) }}>Confirm</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}