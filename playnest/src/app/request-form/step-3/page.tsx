"use client";
import {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
} from '@/components/ui/form'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { set, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGameFormContext } from '@/components/context/multistep-form-context'
import { Input } from '@/components/ui/input'

import { number, z } from 'zod'
import { Button } from '@/components/ui/button'
import { time } from 'console';

export default function Page() {
    const [location, setLocation] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [number, setNumber] = useState<number>(0);
    const router = useRouter()
    // YOU NEED TO IMPORT THE CONTEXT FIRST 
    const formContext = useGameFormContext()

    // STEP 1: Defining the form schema👇🏽

    const gameFormSchema = z.object({
    })

    // STEP 2: Defining your form.
    const stepThreeForm = useForm<z.infer<typeof gameFormSchema>>({
        resolver: zodResolver(gameFormSchema),
        mode: 'onChange',
    })

    // STEP 3: Defining the submit function
    function onSubmit(values: z.infer<typeof gameFormSchema>) {

        formContext.updatePropertyForm(values);

        router.push('/request-form/step-3');
        console.log(formContext.propertyForm);
    }
    return (
        <Form {...stepThreeForm}>
            <form
                onSubmit={stepThreeForm.handleSubmit(onSubmit)}
                className='bg-white p-6 rounded-lg shadow space-y-8 max-w-lg mx-auto m-10 content-center'>
                <div className='py-10 space-x-8 flex justify-center'>
                    <Button type='submit'>Submit your game request</Button>
                </div>
            </form>
        </Form>
    )
}