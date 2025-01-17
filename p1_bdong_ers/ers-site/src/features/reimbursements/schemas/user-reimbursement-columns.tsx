import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { reimbursementDisplaySchema } from "./reimbursement-schemas"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import EditReimbursementDialog from "../components/edit-reimbursement-dialog"

export const myReimbursementColumns: ColumnDef<z.infer<typeof reimbursementDisplaySchema>>[] = [
    {
        accessorKey: "amount",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Amount
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
            }).format(amount)
            return <div className="px-6">{formatted}</div>
        }
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
          return <div className="text-wrap max-w-lg">{row.getValue("description")}</div>
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          let status = row.getValue("status")
          let bg = ''
          let text = ''
          switch(status) {
            case ("PENDING"):
              bg = "bg-indigo-400"
              text = "Pending"
              break;
            case ("ACCEPTED"):
              bg = "bg-green-500"
              text = "Accepted"
              break;
            case ("DENIED"):
              bg = "bg-red-400"
              text = "Denied"
              break;
          }
          return <div className={`rounded-md px-5 py-1 border text-center text-white ${bg}`}> <strong>{text}</strong> </div>
        }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <EditReimbursementDialog {...rowData} />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]

