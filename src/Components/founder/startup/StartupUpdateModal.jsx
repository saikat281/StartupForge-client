"use client";

import { useRef, useState } from "react";
import {
    Modal,
    Button,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
} from "@heroui/react";
import { Pencil, Save, ImageIcon } from "lucide-react";
import StartupUpdate from "@/lib/actions/StartupUpdate";
import toast from "react-hot-toast";
import { Gear } from "@gravity-ui/icons";

const INDUSTRIES = [
    "SaaS",
    "Fintech",
    "Healthtech",
    "E-commerce",
    "Edtech",
    "AI / ML",
    "Consumer",
    "Other",
];

const FUNDING_STAGES = [
    "Pre-Seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+",
    "Bootstrapped",
];

const StartupUpdateModal = ({ startup }) => {

    

    const nameRef = useRef(null);
    const imageRef = useRef(null);
    const industryRef = useRef(null);
    const fundingStageRef = useRef(null);
    const descriptionRef = useRef(null);

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const handleUpdate = async (close) => {
        const updatedStartup = {
            id: startup?._id,
            name: nameRef.current.value.trim(),
            image: imageRef.current.value.trim(),
            industry: industryRef.current.value,
            fundingStage: fundingStageRef.current.value,
            description: descriptionRef.current.value.trim(),
        };

        const nextErrors = {};
        if (!updatedStartup.name) nextErrors.name = "Startup name is required";
        if (!updatedStartup.industry) nextErrors.industry = "Industry is required";
        if (!updatedStartup.fundingStage)
            nextErrors.fundingStage = "Funding stage is required";
        if (!updatedStartup.description)
            nextErrors.description = "Description is required";
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setSaving(true);
        try {
            // console.log("Updating startup:", updatedStartup);


            await StartupUpdate(updatedStartup,startup._id)
            // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mystartup/${startup._id}`, {
            //   method: "PATCH",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(updatedStartup),
            // });
            close();
        } finally {
            setSaving(false);
            toast.success("Startup Updated")
            location.reload();
        }
    };

    return (
        <Modal
            onOpenChange={(open) => {
                if (!open) setErrors({});
            }}
        >
            <Button isIconOnly aria-label="Settings" variant="secondary">
            <Gear />
          </Button>

            <Modal.Backdrop className="bg-black/40">
                <Modal.Container>
                    <Modal.Dialog className="rounded-xl border border-gray-200 bg-white shadow-sm max-w-md w-full p-0">
                        {({ close }) => (
                            <>
                                <Modal.CloseTrigger className="text-gray-400 hover:text-gray-600" />

                                <Modal.Header className="flex flex-col items-start gap-1 px-6 pt-6 pb-4 border-b border-gray-100">
                                    <Modal.Heading className="text-lg font-semibold text-gray-900">
                                        Edit Startup
                                    </Modal.Heading>
                                    <p className="text-sm font-normal text-gray-500">
                                        Update your startup details below.
                                    </p>
                                </Modal.Header>

                                <Modal.Body className="px-6 py-5 space-y-5">
                                    {/* Startup Name */}
                                    <TextField
                                        isRequired
                                        isInvalid={!!errors.name}
                                        defaultValue={startup?.name || ""}
                                        className="flex flex-col gap-1.5"
                                    >
                                        <Label className="text-sm font-medium text-gray-700">
                                            Startup Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            ref={nameRef}
                                            type="text"
                                            placeholder="e.g. Acme Inc."
                                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 data-[invalid=true]:border-red-400"
                                        />
                                        <FieldError className="text-xs text-red-500">
                                            {errors.name}
                                        </FieldError>
                                    </TextField>

                                    {/* Logo Image */}
                                    <TextField
                                        defaultValue={startup?.image || ""}
                                        className="flex flex-col gap-1.5"
                                    >
                                        <Label className="text-sm font-medium text-gray-700">
                                            Logo Image
                                        </Label>
                                        <div className="relative">
                                            <ImageIcon
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            />
                                            <Input
                                                ref={imageRef}
                                                type="url"
                                                placeholder="https://example.com/logo.png"
                                                className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                                            />
                                        </div>
                                        {startup?.image && (
                                            <img
                                                src={startup.image}
                                                alt="Logo preview"
                                                className="h-12 w-12 rounded-lg object-cover border border-gray-200 mt-1"
                                            />
                                        )}
                                    </TextField>

                                    {/* Industry + Funding Stage */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Industry <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                ref={industryRef}
                                                defaultValue={startup?.industry || ""}
                                                className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.industry ? "border-red-400" : "border-gray-200"
                                                    }`}
                                            >
                                                <option value="">Select industry</option>
                                                {INDUSTRIES.map((item) => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.industry && (
                                                <p className="text-xs text-red-500 mt-1">{errors.industry}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Funding Stage <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                ref={fundingStageRef}
                                                defaultValue={startup?.fundingStage || ""}
                                                className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.fundingStage ? "border-red-400" : "border-gray-200"
                                                    }`}
                                            >
                                                <option value="">Select stage</option>
                                                {FUNDING_STAGES.map((item) => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.fundingStage && (
                                                <p className="text-xs text-red-500 mt-1">
                                                    {errors.fundingStage}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <TextField
                                        isRequired
                                        isInvalid={!!errors.description}
                                        defaultValue={startup?.description || ""}
                                        className="flex flex-col gap-1.5"
                                    >
                                        <Label className="text-sm font-medium text-gray-700">
                                            Description <span className="text-red-500">*</span>
                                        </Label>
                                        <TextArea
                                            ref={descriptionRef}
                                            rows={4}
                                            placeholder="What does your startup do?"
                                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 resize-none data-[invalid=true]:border-red-400"
                                        />
                                        <FieldError className="text-xs text-red-500">
                                            {errors.description}
                                        </FieldError>
                                    </TextField>
                                </Modal.Body>

                                <Modal.Footer className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100">
                                    <Button
                                        slot="close"
                                        className="rounded-lg border border-gray-200 bg-white text-gray-600 text-sm font-medium px-4 py-2 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        isDisabled={saving}
                                        onPress={() => handleUpdate(close)}
                                        className="flex items-center gap-2 rounded-lg bg-gray-900 text-white text-sm font-medium px-5 py-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Save size={15} />
                                        {saving ? "Saving..." : "Save Changes"}
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

export default StartupUpdateModal;