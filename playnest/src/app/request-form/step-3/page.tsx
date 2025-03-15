"use client";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGameFormContext } from "@/components/context/multistep-form-context";

import { z } from "zod";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  // YOU NEED TO IMPORT THE CONTEXT FIRST
  const formContext = useGameFormContext();
  const formData = formContext.propertyForm; // Retrieve user-entered data

  // STEP 1: Defining the form schema👇🏽

  const gameFormSchema = z.object({});

  // STEP 2: Defining your form.
  const stepThreeForm = useForm<z.infer<typeof gameFormSchema>>({
    resolver: zodResolver(gameFormSchema),
    mode: "onChange",
    defaultValues: formData!,
  });

  // STEP 3: Defining the submit function
  function onSubmit(values: z.infer<typeof gameFormSchema>) {
    formContext.updatePropertyForm(values);

    router.push("/request-form/step-3");
    console.log(formData);
  }
  return (
    <Form {...stepThreeForm}>
      <form
        onSubmit={stepThreeForm.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-8 max-w-lg mx-auto m-10 content-center"
      >
        <h2 className="text-xl font-semibold text-center">
          Review Your Game Request
        </h2>

        <div className="border-t border-gray-200 pt-4 space-y-2 text-center text-lg">
          <p>
            <strong>Game Type:</strong> {formData?.type}
          </p>
          <p>
            <strong>Location:</strong> {formData?.location}
          </p>
          <p>
            <strong>Time:</strong> {formData?.time}
          </p>
          <p>
            <strong>Game Number:</strong> {formData?.number}
          </p>
        </div>

        <div className="space-x-8 flex justify-center">
          <Button type="submit">Submit your game request</Button>
        </div>
      </form>
    </Form>
  );
}
