'use client'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import 'react-quill-new/dist/quill.snow.css'
import { zodResolver } from '@hookform/resolvers/zod';
import { journalSchema } from '@/app/lib/schemas';
import { BarLoader } from 'react-spinners';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getMoodById, MOODS } from '@/app/lib/moods';
import { Button } from '@/components/ui/button';
import useFetch from '@/app/hooks/use-fetch';
import { createJournalEntry, getDraft, getJournalEntry, saveDraft, updateJournalEntry } from '@/actions/journal';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { createCollection, getCollections } from '@/actions/collection';
import { Loader2, PlusCircle } from 'lucide-react';
import CollectionForm from '@/components/collection-form';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const JournalEntryPage = () => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: existingEntry, loading: entryLoading, fn: fetchEntry } = useFetch(getJournalEntry);
  const { loading: draftLoading, data: draftData, fn: fetchDraft } = useFetch(getDraft);
  const { loading: savingDraftLoading, fn: saveDraftFn, data: savingDraftResult } = useFetch(saveDraft);
  const { loading: actionLoading, fn: actionFn, data: actionResult, } = useFetch(isEditMode ? updateJournalEntry : createJournalEntry)
  const { data: collections, loading: collectionsLoading, fn: fetchCollections, setData: setCollections } = useFetch(getCollections);
  const { data: createdCollection, loading: createCollectionLoading, fn: createCollectionFn } = useFetch(createCollection);
  console.log(collections, "collections");
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isDirty }, control, watch, setValue, reset } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: '',
      content: '',
      mood: '',
    },
  });

  useEffect(() => {
    fetchCollections();

    if (editId) {
      setIsEditMode(true);
      fetchEntry();
    } else {
      setIsEditMode(false)
      fetchDraft()
    }
  }, [editId]);

  useEffect(() => {
    if (isEditMode && existingEntry) {
      reset({
        title: existingEntry.title || '',
        content: existingEntry.content || '',
        mood: existingEntry.mood || '',
        collectionId: existingEntry.collectionId || '',
      })
    } else if (draftData?.success && draftData?.data) {
      reset({
        title: draftData.data.title || '',
        content: draftData.data.content || '',
        mood: draftData.data.mood || '',
        collectionId: '',
      })
    } else {
      reset({
        title: '',
        content: '',
        mood: '',
        collectionId: '',
      })
    }
  }, [draftData, isEditMode, existingEntry])

  useEffect(() => {
    if (actionResult && !actionLoading) {

      if (!isEditMode) {
        saveDraftFn({
          title: "",
          content: "",
          mood: "",
        })
      }
      router.push(`/collection/${actionResult.collectionId ? actionResult.collectionId : 'unorganized'}`);
      toast.success(`Journal entry ${isEditMode ? "updated" : "created"} successfully`);
    }
  }, [actionResult, actionLoading]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const mood = getMoodById(data.mood);
    actionFn({
      ...data,
      moodScore: mood.score,
      moodQuery: mood.unsplashQuery,
      ...(isEditMode && { id: editId }),
    })
  })

  const handleCreateCollection = (data) => {
    createCollectionFn(data);
  }

  const formData = watch();

  const handleSaveDraft = async () => {
    if(!isDirty){
      toast.info("No changes to save");
      return;
    }

    await saveDraftFn(formData)
  }

  useEffect(()=>{
    if(savingDraftResult?.success && !savingDraftLoading){
      toast.success("Draft saved successfully");
    }
  },[savingDraftResult,savingDraftLoading])

  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogOpen(false);
      setCollections(prevCollections => [createdCollection, ...(prevCollections || [])]);
      setValue('collectionId', createdCollection.id);
      toast.success('Collection created successfully');
    }
  }, [createdCollection, setCollections, setValue]);

  const isLoading = actionLoading || collectionsLoading || entryLoading || draftLoading || savingDraftLoading;
  return (
    <div className='py-8'>
      <form onSubmit={onSubmit} className='space-y-2 mx-auto'>
        <h1 className='text-5xl md:text-6xl gradient-title'>
          {isEditMode ? "Edit Entry" : "What's on your mind?"}
        </h1>
        {isLoading && <BarLoader color="blue" width={"100%"} />}
        <div className='space-y-2'>
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <Input disabled={isLoading} type="text" id="title" {...register('title')} className={`py-5 md:text-md ${errors.title ? 'border-red-500' : ''}`} placeholder="Enter your title..." />
          {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
        </div>
        <div className='space-y-2'>
          <label htmlFor="mood" className="text-sm font-medium">How are you feeling today?</label>

          <Controller
            control={control}
            name="mood"
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={`py-5 md:text-md ${errors.mood ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select a mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MOODS).map((mood) => {
                      return (
                        <SelectItem key={mood.id} value={mood.id}><span className='flex items-center gap-2'>{mood.emoji} {mood.label}</span></SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              )
            }}
          />
          {errors.mood && <p className='text-red-500 text-sm'>{errors.mood.message}</p>}
        </div>

        <div className='space-y-2'>
          <label htmlFor="content" className="text-sm font-medium">{getMoodById(watch('mood'))?.prompt ?? "Write your thoughts..."}</label>

          <Controller
            control={control}
            name="content"
            render={({ field }) => {
              return (
                <ReactQuill readOnly={isLoading} theme="snow" value={field.value} onChange={field.onChange} modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    ['clean'],
                  ],
                }} />
              )
            }}
          />
          {errors.content && <p className='text-red-500 text-sm'>{errors.content.message}</p>}
        </div>

        <div className='space-y-2'>
          <label htmlFor="content" className="text-sm font-medium">Add to collection (optional)</label>
          <Controller
            control={control}
            name="collectionId"
            render={({ field }) => {
              return (
                <Select onValueChange={(value) => {
                  if (value === 'new') {
                    setIsCollectionDialogOpen(true);
                  } else {
                    field.onChange(value);
                  }
                }} value={field.value}>
                  <SelectTrigger className="py-5 md:text-md">
                    <SelectValue placeholder="Select a collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections?.map((collection) => {
                      return (
                        <SelectItem key={collection.id} value={collection.id}>{collection.name}</SelectItem>
                      )
                    })}
                    <SelectItem value="new"><span className='text-sm flex items-center gap-2'> <PlusCircle size={16} /> Create new collection</span></SelectItem>
                  </SelectContent>
                </Select>
              )
            }}
          />
          {errors.collectionId && <p className='text-red-500 text-sm'>{errors.collectionId.message}</p>}
        </div>
        <div className='space-x-4 flex'>

          {!isEditMode && (
            <Button variant="outline" onClick={handleSaveDraft} type="button" disabled={savingDraftLoading || !isDirty}>
              {savingDraftLoading ? <Loader2 className='animate-spin mr-2 h-4 w-4' /> : null}
              Save as Draft
            </Button>
          )}
          <Button type='submit' disabled={actionLoading || !isDirty}>{isEditMode ? "Update" : "Publish"}</Button>

          {isEditMode && (
            <Button variant="destructive" onClick={(e) => {
              e.preventDefault()
              router.push(`/journal/${existingEntry.id}`)
            }}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <CollectionForm loading={createCollectionLoading} onsuccess={handleCreateCollection} open={isCollectionDialogOpen} setOpen={setIsCollectionDialogOpen} />
    </div>
  )
}

export default JournalEntryPage
