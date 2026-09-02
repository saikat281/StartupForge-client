"use client";

import { useRef, useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Label,
  Input,
  FieldError,
} from "@heroui/react";
import { Pencil, Save } from "lucide-react";
import OpportunityUpdateAction from "@/lib/actions/OpportunityUpdateAction";
import toast from "react-hot-toast";

const WORK_TYPES = ["Remote", "On-site", "Hybrid"];

const COMMITMENT_LEVELS = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
  "Volunteer",
];

const UpdateOppModal = ({ userData }) => {
  const roleTitleRef = useRef(null);
  const skillsRef = useRef(null);
  const workTypeRef = useRef(null);
  const commitmentLevelRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (close) => {
    const updatedOpportunity = {
      roleTitle: roleTitleRef.current.value.trim(),
      skills: skillsRef.current.value.trim(),
      workType: workTypeRef.current.value,
      commitmentLevel: commitmentLevelRef.current.value,
    };

    const nextErrors = {};
    if (!updatedOpportunity.roleTitle)
      nextErrors.roleTitle = "Role title is required";
    if (!updatedOpportunity.skills)
      nextErrors.skills = "At least one skill is required";
    if (!updatedOpportunity.workType)
      nextErrors.workType = "Work type is required";
    if (!updatedOpportunity.commitmentLevel)
      nextErrors.commitmentLevel = "Commitment level is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      console.log("Updating opportunity:", updatedOpportunity);
      await OpportunityUpdateAction(updatedOpportunity,userData?._id);
      // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/opportunity/${userData._id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(updatedOpportunity),
      // });
      toast.success("Opportunity Updated. Please Refresh the page to see");
      close();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      onOpenChange={(open) => {
        if (!open) setErrors({});
      }}
    >
      <Button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-xs font-medium px-3 py-1.5 hover:bg-gray-50 transition-colors">
        <Pencil size={13} />
        Edit
      </Button>

      <Modal.Backdrop className="bg-black/40">
        <Modal.Container>
          <Modal.Dialog className="rounded-xl border border-gray-200 bg-white shadow-sm max-w-md w-full p-0">
            {({ close }) => (
              <>
                <Modal.CloseTrigger className="text-gray-400 hover:text-gray-600" />

                <Modal.Header className="flex flex-col items-start gap-1 px-6 pt-6 pb-4 border-b border-gray-100">
                  <Modal.Heading className="text-lg font-semibold text-gray-900">
                    Edit Opportunity
                  </Modal.Heading>
                  <p className="text-sm font-normal text-gray-500">
                    Update the role details below.
                  </p>
                </Modal.Header>

                <Modal.Body className="px-6 py-5 space-y-5">
                  {/* Role Title */}
                  <TextField
                    isRequired
                    isInvalid={!!errors.roleTitle}
                    defaultValue={userData?.roleTitle || ""}
                    className="flex flex-col gap-1.5"
                  >
                    <Label className="text-sm font-medium text-gray-700">
                      Role Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      ref={roleTitleRef}
                      type="text"
                      placeholder="e.g. Frontend Engineer"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 data-[invalid=true]:border-red-400"
                    />
                    <FieldError className="text-xs text-red-500">
                      {errors.roleTitle}
                    </FieldError>
                  </TextField>

                  {/* Required Skills */}
                  <TextField
                    isRequired
                    isInvalid={!!errors.skills}
                    defaultValue={userData?.skills || ""}
                    className="flex flex-col gap-1.5"
                  >
                    <Label className="text-sm font-medium text-gray-700">
                      Required Skills{" "}
                      <span className="text-red-500">*</span>
                      <span className="text-gray-400 font-normal">
                        {" "}
                        (comma-separated)
                      </span>
                    </Label>
                    <Input
                      ref={skillsRef}
                      type="text"
                      placeholder="e.g. React, TypeScript, Tailwind CSS"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 data-[invalid=true]:border-red-400"
                    />
                    <FieldError className="text-xs text-red-500">
                      {errors.skills}
                    </FieldError>
                  </TextField>

                  {/* Work Type + Commitment Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Work Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        ref={workTypeRef}
                        defaultValue={userData?.workType || ""}
                        className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${
                          errors.workType ? "border-red-400" : "border-gray-200"
                        }`}
                      >
                        <option value="">Select work type</option>
                        {WORK_TYPES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      {errors.workType && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.workType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Commitment Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        ref={commitmentLevelRef}
                        defaultValue={userData?.commitmentLevel || ""}
                        className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${
                          errors.commitmentLevel
                            ? "border-red-400"
                            : "border-gray-200"
                        }`}
                      >
                        <option value="">Select commitment level</option>
                        {COMMITMENT_LEVELS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      {errors.commitmentLevel && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.commitmentLevel}
                        </p>
                      )}
                    </div>
                  </div>
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

export default UpdateOppModal;