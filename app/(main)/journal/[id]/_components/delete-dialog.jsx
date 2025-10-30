"use client"
import { deleteJournalEntry } from '@/actions/journal'
import useFetch from '@/app/hooks/use-fetch'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const DeleteDialog = ({ entryId }) => {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const {
    loading: isDeleting,
    fn: deleteEntryFn,
    data: deletedEntry,
  } = useFetch(deleteJournalEntry)

  useEffect(() => {
    if (deletedEntry && !isDeleting) {
      setDeleteDialogOpen(false)
      toast.success(`Journal Entry deleted successfully`)
      router.push(`/collection/${deletedEntry.collectionId ? deletedEntry.collectionId : "unorganized"}`)
    }
  }, [deletedEntry,isDeleting])


  const handleDelete = () => {
    deleteEntryFn({entryId})
  }
  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm"><Trash2 className='h-4 w-4 mr-2' />Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <p className='text-sm text-muted-foreground'>
            This action cannot be undone. This will permanently delete your journal entry!
          </p>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" className="bg-red-500 hover:bg-red-600" disabled={isDeleting} onClick={handleDelete}>{isDeleting ? <Loader2 className='h-4 w-4 mr-2' /> : 'Delete Entry'}</Button>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
