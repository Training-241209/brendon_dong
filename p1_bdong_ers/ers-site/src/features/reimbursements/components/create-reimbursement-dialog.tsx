import { Button } from "@/components/ui/button";
import {
    Dialog,
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
import { reimbursementCreationSchema } from "../schemas/reimbursement-schemas";
import UseCreateReimbursement from "../hooks/use-create-reimbursement";
import { useState } from "react";

export default function CreateReimbursementDialog() {

    const {mutate: createReimbursement} = UseCreateReimbursement()
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof reimbursementCreationSchema>>({
        resolver: zodResolver(reimbursementCreationSchema),
        defaultValues: {
            amount: 0,
            description: ""
        },
    })
    
    function onSubmit(values: z.infer<typeof reimbursementCreationSchema>) {
        form.reset();
        setOpen(false);
        createReimbursement(values);
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="justify-end m-2">New Reimbursement</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Reimbursement</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a USD amount and description of your reimbursement.
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
                            <Button className="flex text-right" type="submit" onSubmit={()=>{setOpen(false)}}>Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}