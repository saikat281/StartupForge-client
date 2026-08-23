"use client";

import { useRef, useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { Rocket, Upload, X } from "lucide-react";
import { addStartup } from "@/lib/actions/MyStartupForm";
import toast from "react-hot-toast";
import { imageUpload } from "@/lib/imageUpload";
import { authClient } from "@/lib/auth-client";

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

const CreateStartupPage = () => {
  const fileInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const {data: session} = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
  };

  const removeLogo = () => {
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

    setLogoPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // console.log(data);

    const upload_image = await imageUpload(data.image);

    // console.log(upload_image)
    // console.log(upload_image.url)
    await addStartup({...data,image: upload_image.url,userId: user?.id})
    toast.success('Startup Successfully created!');

  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Create Startup
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Fill in the details below to list a new startup.
          </p>
        </div>

        {/* HeroUI Form */}
        <Form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          validationBehavior="native"
        >
          {/* Startup Name */}
          <TextField
            name="name"
            isRequired
            className="w-full"
          >
            <Label>Startup Name</Label>

            <Input
              placeholder="e.g. Acme Inc."
              className="w-full"
            />

            <FieldError />
          </TextField>

          {/* Logo */}
          <TextField
            name="image"
            type="file"
            className="w-full"
          >
            <Label>Logo</Label>

            <input
              name="image"
              type="file"
              placeholder="Upload iamge"
              className="w-full"
            />

            <FieldError />
          </TextField>

          {/* Industry + Funding Stage */}
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Industry */}
            <Select
              name="industry"
              isRequired
              className="w-full"
              placeholder="Select industry"
            >
              <Label>Industry</Label>

              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {INDUSTRIES.map((industry) => (
                    <ListBox.Item
                      key={industry}
                      id={industry}
                      textValue={industry}
                    >
                      {industry}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>

              <FieldError />
            </Select>

            {/* Funding Stage */}
            <Select
              name="fundingStage"
              isRequired
              className="w-full"
              placeholder="Select stage"
            >
              <Label>Funding Stage</Label>

              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {FUNDING_STAGES.map((stage) => (
                    <ListBox.Item
                      key={stage}
                      id={stage}
                      textValue={stage}
                    >
                      {stage}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>

              <FieldError />
            </Select>
          </div>

          {/* Description */}
          <TextField
            name="description"
            isRequired
            className="w-full"
          >
            <Label>Description</Label>

            <TextArea
              placeholder="What does your startup do?"
              rows={4}
              className="w-full resize-none"
            />

            <Description>
              Briefly describe what your startup does.
            </Description>

            <FieldError />
          </TextField>

          {/* Submit */}
          <div className="flex w-full justify-end pt-2">
            <Button
              type="submit"
              color="primary"
              className="flex items-center gap-2"
            >
              <Rocket size={16} />
              Create Startup
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateStartupPage;
