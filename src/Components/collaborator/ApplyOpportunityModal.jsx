"use client";

import { useState } from "react";
import {
    Modal,
    Button,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
} from "@heroui/react";
import { Send } from "lucide-react";
import { ApplicationForm } from "@/lib/actions/ApplicationForm";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const ApplyOpportunityModal = ({ opportunity }) => {
    const [form, setForm] = useState({
        email: "",
        portfolioLink: "",
        motivation: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;
    // console.log(user?.email)

    

    const handleChange = (field) => (value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = () => {
        const next = {};

        if (!form.portfolioLink.trim()) {
            next.portfolioLink = "Portfolio link is required";
        }
        if (!form.motivation.trim()) {
            next.motivation = "Motivation message is required";
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const resetForm = () => {
        setForm({ email: "", portfolioLink: "", motivation: "" });
        setErrors({});
    };

    const handleSubmit = async (close) => {
        if (!validate()) return;
        else if(user?.role != "collaborator"){
            toast.error("Only Collabortor can apply Opportunity!");
            return;
        }
        setSubmitting(true);
        try {
            // console.log("Submitting application:", { opportunityId, ...form });

            const status = "pending";

            const today = new Date();
            const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
            console.log(opportunity?.userId);


            await ApplicationForm({ ...form,email: user?.email ?? "", opportunity_name: opportunity?.roleTitle, startup: opportunity?.startup, status, date, oppUserId: opportunity?.userId,AppUserId : user?.id })

            // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/applications`, {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ opportunityId, ...form }),
            // });
            resetForm();
            close();
            toast.success('Opportunity Application Successfully sent');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            onOpenChange={(open) => {
                if (!open) resetForm();
            }}
        >
            <Button className="w-full sm:w-auto rounded-lg bg-gray-900 text-white text-sm font-medium px-6 py-2.5 hover:bg-gray-800 transition-colors">
                Apply Now
            </Button>

            <Modal.Backdrop className="bg-black/40">
                <Modal.Container>
                    <Modal.Dialog className="rounded-xl border border-gray-200 bg-white shadow-sm max-w-md w-full p-0">
                        {({ close }) => (
                            <>
                                <Modal.CloseTrigger className="text-gray-400 hover:text-gray-600" />

                                <Modal.Header className="flex flex-col items-start gap-1 px-6 pt-6 pb-4 border-b border-gray-100">
                                    <Modal.Heading className="text-lg font-semibold text-gray-900">
                                        Apply for this Opportunity
                                    </Modal.Heading>
                                    <p className="text-sm font-normal text-gray-500">
                                        Fill in your details below to submit your application.
                                    </p>
                                </Modal.Header>

                                <Modal.Body className="px-6 py-5 space-y-5">
                                    {/* Applicant Email */}
                                    <TextField
                                        isInvalid={!!errors.email}
                                        value={user?.email}
                                        onChange={handleChange("email")}
                                        className="flex flex-col gap-1.5"
                                    >
                                        <Label className="text-sm font-medium text-gray-700">
                                            Applicant Email
                                        </Label>
                                        <Input
                                            type="email"

                                            readOnly
                                            disabled
                                            placeholder="you@example.com"
                                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 data-[invalid=true]:border-red-400"
                                        />
                                        <FieldError className="text-xs text-red-500">
                                            {errors.email}
                                        </FieldError>
                                    </TextField>

                                    {/* Portfolio Link */}
                                    <TextField
                                        isRequired
                                        isInvalid={!!errors.portfolioLink}
                                        value={form.portfolioLink}
                                        onChange={handleChange("portfolioLink")}
                                        className="flex flex-col gap-1.5"
                                    >
                                        <Label className="text-sm font-medium text-gray-700">
                                            Portfolio Link <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            type="url"
                                            placeholder="https://your-portfolio.com"
                                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 data-[invalid=true]:border-red-400"
                                        />
                                        <FieldError className="text-xs text-red-500">
                                            {errors.portfolioLink}
                                        </FieldError>
                                    </TextField>

                                    {/* Motivation Message */}
                                    <TextField
                                        isRequired
                                        isInvalid={!!errors.motivation}
                                        value={form.motivation}
                                        onChange={handleChange("motivation")}
                                        className="flex flex-col gap-1.5"
                                    >
                                        <Label className="text-sm font-medium text-gray-700">
                                            Motivation Message <span className="text-red-500">*</span>
                                        </Label>
                                        <TextArea
                                            rows={4}
                                            placeholder="Tell us why you're a great fit for this role..."
                                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 resize-none data-[invalid=true]:border-red-400"
                                        />
                                        <FieldError className="text-xs text-red-500">
                                            {errors.motivation}
                                        </FieldError>
                                    </TextField>
                                </Modal.Body>

                                <p className={`${user?.role === "collaborator" && "hidden"} text-sm ml-5 text-red-700 font-semibold`}>Note: Only Collaborator can apply opportunity!</p>

                                <Modal.Footer  className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100">
                                    {/* slot="close" makes this Button auto-close the modal, no handler needed */}
                                    <Button
                                        slot="close"
                                        className="rounded-lg border border-gray-200 bg-white text-gray-600 text-sm font-medium px-4 py-2 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        isDisabled={submitting}
                                        onPress={() => handleSubmit(close)}
                                        className="flex items-center gap-2 rounded-lg bg-gray-900 text-white text-sm font-medium px-5 py-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={15} />
                                        {submitting ? "Submitting..." : "Submit Application"}
                                    </Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default ApplyOpportunityModal;