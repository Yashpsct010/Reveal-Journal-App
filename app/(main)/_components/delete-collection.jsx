"use client"
import { deleteCollection } from '@/actions/collection'
import useFetch from '@/app/hooks/use-fetch'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const DeleteCollectionDialog = ({ collection, entriesCount = 0 }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const {
    loading: isDeleting,
    fn: deleteCollectionFn,
    data: deletedCollection,
  } = useFetch(deleteCollection)

  useEffect(() => {
    if (deletedCollection && !isDeleting) {
      setOpen(false)
      toast.success(`Collection "${collection.name}" deleted successfully`)
      router.push('/dashboard')
    }
  }, [deletedCollection,isDeleting])


  const handleDelete = () => {
    deleteCollectionFn({collectionId: collection?.id})
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm"><Trash2 className='h-4 w-4 mr-2' />Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &quot;{collection.name}&quot;?</AlertDialogTitle>
          <p className='text-sm text-muted-foreground'>
            This action cannot be undone. This will permanently delete the collection and all its <span className='font-bold'>{entriesCount} entries</span>.
          </p>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" className="bg-red-500 hover:bg-red-600" disabled={isDeleting} onClick={handleDelete}>{isDeleting ? <Loader2 className='h-4 w-4 mr-2' /> : 'Delete Collection'}</Button>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCollectionDialog
