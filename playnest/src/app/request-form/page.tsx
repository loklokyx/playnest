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
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGameFormContext } from '@/components/context/multistep-form-context'
import { Input } from '@/components/ui/input'

import { z } from 'zod'
import { Button } from '@/components/ui/button'

export default function Page() {
    const router = useRouter()
    // YOU NEED TO IMPORT THE CONTEXT FIRST 
    const formContext = useGameFormContext()

    // STEP 1: Defining the form schema👇🏽
    const gameFormSchema = z.object({
        type: z.string(),
    })

    // STEP 2: Defining your form.
    const stepOneForm = useForm<z.infer<typeof gameFormSchema>>({
        resolver: zodResolver(gameFormSchema),
        defaultValues: { type: formContext.propertyForm?.type },
        mode: 'onChange',
    })

    // STEP 3: Defining the submit function
    function onSubmit(values: z.infer<typeof gameFormSchema>) {
        formContext.updatePropertyForm(values)
        router.push('/request-form/step-2')
    }

    return (
        <Form {...stepOneForm}>
            <form
                onSubmit={stepOneForm.handleSubmit(onSubmit)}
                className='bg-white p-6 rounded-lg shadow space-y-8 max-w-lg mx-auto m-10 content-center'>
                <FormField
                    name='type'
                    control={stepOneForm.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Game Type</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input {...field} defaultValue={""} />
                            </FormControl>
                            <FormDescription className='text-gray-600'>
                                Select the type of game you want to play
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <div className='py-10 space-x-8'>
                    <Button type='submit'>Next</Button>
                </div>
            </form>
        </Form>
    );

}