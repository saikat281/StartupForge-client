"use client";

import OpportunityDeleteAction from "@/lib/actions/OpportunityDeleteAction";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export function DeleteOpportunity({ userData }) {
    const id = userData?._id;


    const handleDelete = async () => {

        try {
            await OpportunityDeleteAction(id);
        } finally {
            toast.success("opportunity Deleted")
            location.reload();
        }

    }

    return (
        <AlertDialog>
            <Button
                type="button"
                aria-label="Delete"
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
                <Trash2 size={14} />
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete opportunity permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete your <strong>opportunity</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} slot="close" variant="danger">
                                Delete Opportunity
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}