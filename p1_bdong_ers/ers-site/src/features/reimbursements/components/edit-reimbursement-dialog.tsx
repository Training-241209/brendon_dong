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
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reimbursementEditSchema } from "../schemas/reimbursement-schemas";
import UseModifyReimbursement from "../hooks/use-modify-reimbursement";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

export default function EditReimbursementDialog( props : z.infer<typeof reimbursementEditSchema> ) {

    const {mutate: editReimbursement} = UseModifyReimbursement()

    const form = useForm<z.infer<typeof reimbursementEditSchema>>({
        resolver: zodResolver(reimbursementEditSchema),
        defaultValues: {
            reimbursementId: props.reimbursementId,
            amount: props.amount,
            description: props.description
        },
    })
    
    function onSubmit(values: z.infer<typeof reimbursementEditSchema>) {
        console.log(values)
        editReimbursement(values)
    }

    return (
        <Dialog onOpenChange={() => {form.reset()}}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit Reimbursement</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Reimbursement</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Modify the USD amount and description of your reimbursement.
                </DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Amount </FormLabel>
                                    <div className="flex p-2">
                                        <FormControl>
                                            <Input type="number" placeholder="USD $" {...field} />
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Description </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className="flex text-right" type="submit">Edit</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}