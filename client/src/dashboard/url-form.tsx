import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL",
  }),
  suffix: z.string().max(16).optional(),
});

type FormFields = z.infer<typeof schema>;
const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

interface ChildProps {
  setDialogActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function URLForm({ setDialogActive }: ChildProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const invertFirst = () => {
    setDialogActive((prev) => !prev);
  };

  const formSubmit: SubmitHandler<FormFields> = async (data) => {
    
    try {
      const response = await fetch(`${backendUrl}/api/url/addurl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: data.url, customId: data.suffix }),
      });
      if (response.status == 409) {
        setError("suffix", {
          message: "This suffix is already taken",
        });
      }
      if (response.ok) {
        invertFirst();
        console.log("Successfully submitted");
      }
      console.log(response);
    } catch (err: any) {
      console.log(err);
      setError("root", {
        message: err || "An error occurred while submitting the form.",
      });
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(formSubmit)}>
      <Input {...register("url")} placeholder="Paste URL" type="text" />
      {errors.url && <div className="text-red-500">{errors.url.message}</div>}
      <Input
        {...register("suffix")}
        placeholder="Custom Suffix (optional)"
        type="text"
      />
      {errors.suffix && (
        <div className="text-red-500">{errors.suffix.message}</div>
      )}
      <Button type="submit" className="px-3 " disabled={isSubmitting}>
        {isSubmitting ? <Loader size="sm" /> : <span>Generate URL</span>}
      </Button>
    </form>
  );
}
