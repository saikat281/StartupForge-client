"use client";

import StartupDeleteAction from "@/lib/actions/StartupDeleteAction";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";

export function StartupDelete({ startup }) {
    const userId = startup?.userId;
    console.log(userId)

    const handleDelete = async () => {

       try {
        await StartupDeleteAction(startup?._id,userId);
       } finally{
        toast.success("Startup Deleted")
        location.reload();
       }

    }

    return (
        <AlertDialog>
            <Button isIconOnly aria-label="Delete" variant="danger">
                <TrashBin />
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Startup permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete your <strong>Startup</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} slot="close" variant="danger">
                                Delete Startup
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}