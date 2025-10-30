'use client'
import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BarLoader } from 'react-spinners';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { collectionSchema } from '@/app/lib/schemas';
import { createCollection } from '@/actions/collection';

const CollectionForm = ({ open, setOpen, loading, onSuccess }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(collectionSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const onSubmit = handleSubmit((data) => {

        if (typeof onSuccess === 'function') {
            onSuccess(data);
        } else {
            try {
                createCollection(data).then(result => {
                    setOpen(false);
                }).catch(error => {
                    console.error('Direct collection creation failed:', error);
                });
            } catch (error) {
                console.error('Direct collection creation error:', error);
            }
        }
    });


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Collection</DialogTitle>
                </DialogHeader>
                {loading && <BarLoader color="blue" width={"100%"} />}
                <form onSubmit={onSubmit} className='space-y-6'>
                    <div className='space-y-2'>
                        <label htmlFor="name" className="text-sm font-medium">Collection Name</label>
                        <Input disabled={loading} type="text" id="name" {...register('name')} className={`py-5 md:text-md ${errors.name ? 'border-red-500' : ''}`} placeholder="Enter your collection name..." />
                        {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                    </div>


                    <div className='space-y-2'>
                        <label htmlFor="name" className="text-sm font-medium">Description</label>
                        <Textarea disabled={loading} id="description" {...register('description')} className={`py-5 md:text-md ${errors.description ? 'border-red-500' : ''}`} placeholder="Enter your collection description..." />
                        {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
                    </div>

                    <div className='flex justify-end gap-4'>
                        <Button variant="ghost" onClick={() => setOpen(false)} type='button'>Cancel</Button>
                        <Button type='submit' onClick={() => console.log('Button clicked!')}>Create Collection</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CollectionForm
