"use client";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGameFormContext } from "@/components/context/multistep-form-context";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [location, setLocation] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const router = useRouter();
  // YOU NEED TO IMPORT THE CONTEXT FIRST
  const formContext = useGameFormContext();

  // STEP 1: Defining the form schema👇🏽
  const gameFormSchema = z.object({
    location: z.string(),
    time: z.string(),
    number: z.number().max(3),
  });

  // STEP 2: Defining your form.
  const stepTwoForm = useForm<z.infer<typeof gameFormSchema>>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: { location: location, time: time, number: number },
    mode: "onChange",
  });

  // STEP 3: Defining the submit function
  function onSubmit(values: z.infer<typeof gameFormSchema>) {
    formContext.updatePropertyForm({ ...formContext.propertyForm, ...values });
    console.log(values);
    router.push("/request-form/step-3");
  }
  return (
    <Form {...stepTwoForm}>
      <form
        onSubmit={stepTwoForm.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-8 max-w-lg mx-auto m-10 content-center"
      >
        <FormField
          name="location"
          control={stepTwoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormMessage />
              <FormControl>
                <Input
                  {...field}
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value || "");
                    stepTwoForm.setValue("location", e.target.value || "");
                  }}
                />
              </FormControl>
              <FormDescription className="text-gray-600">
                Enter the location of the game
              </FormDescription>
            </FormItem>
          )}
        />
        {/* field of time */}
        <FormField
          name="time"
          control={stepTwoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormMessage />
              <FormControl>
                <Input
                  {...field}
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value || "");
                    stepTwoForm.setValue("time", e.target.value || "");
                  }}
                />
              </FormControl>
              <FormDescription className="text-gray-600">
                Enter the time of the game
              </FormDescription>
            </FormItem>
          )}
        />
        {/* field of number of ppl*/}
        <FormField
          name="number"
          control={stepTwoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of players joined</FormLabel>
              <FormMessage />
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={number}
                  onChange={(e) => {
                    setNumber(parseInt(e.target.value) || 0);
                    stepTwoForm.setValue("number", parseInt(e.target.value));
                  }}
                />
              </FormControl>
              <FormDescription className="text-gray-600">
                Enter the number of players joined
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="space-x-8">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
