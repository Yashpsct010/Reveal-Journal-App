"use client"
import React, { useEffect, useState } from 'react'
import CollectionPreview from './collection-preview'
import CollectionForm from '@/components/collection-form'
console.log('CollectionForm import:', CollectionForm)
import useFetch from '@/app/hooks/use-fetch'
import { createCollection } from '@/actions/collection'
import { toast } from 'sonner'

const Collections = ({ collections = [], entriesByCollection = {} }) => {
    console.log('Collections component rendering with props:', { collections, entriesByCollection })

    const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false)
    const {
        loading: createCollectionLoading,
        fn: createCollectionFn,
        data: createdCollection,
    } = useFetch(createCollection)

    useEffect(() => {
        console.log('createdCollection changed:', createdCollection)
        if (createdCollection) {
            setIsCollectionDialogOpen(false)
            toast.success(`Collection ${createdCollection.name} created successfully`)

        }
    }, [createdCollection])

    const handleCreateCollection = (data) => {
        console.log('Creating collection with data:', data)
        createCollectionFn(data)
    }

    const testFunction = () => {
        console.log('Test function called!')
    }

    console.log('handleCreateCollection function:', handleCreateCollection)
    console.log('testFunction:', testFunction)


    return (
        <section id='collections' className='space-y-6'>
            <h2 className='text-3xl font-bold gradient-title'>Collections</h2>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                <CollectionPreview
                    isCreateNew={true}
                    onCreateNew={() => setIsCollectionDialogOpen(true)}
                />

                {entriesByCollection?.unorganized?.length > 0 && (
                    <CollectionPreview
                        name='Unorganized'
                        entries={entriesByCollection?.unorganized}
                        isUnorganized={true}
                    />
                )}

                {collections?.map((collection) => (
                    <CollectionPreview
                        key={collection.id}
                        id={collection.id}
                        name={collection.name}
                        entries={entriesByCollection[collection.id] || []}
                    />
                ))}

                <CollectionForm
                    loading={createCollectionLoading}
                    onSuccess={testFunction}
                    open={isCollectionDialogOpen}
                    setOpen={setIsCollectionDialogOpen}
                />
                {console.log('Passing to CollectionForm:', {
                    loading: createCollectionLoading,
                    onSuccess: handleCreateCollection,
                    open: isCollectionDialogOpen,
                    setOpen: setIsCollectionDialogOpen
                })}
            </div>
        </section>
    )
}

export default Collections
