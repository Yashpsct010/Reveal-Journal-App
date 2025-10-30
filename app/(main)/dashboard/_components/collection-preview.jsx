"use client"
import { getMoodById } from '@/app/lib/moods'
import { formatDistanceToNow } from 'date-fns'
import { FolderClosed, FolderOpen, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const colorSchemes = {
    unorganized: {
        bg: 'bg-amber-100 hover:bg-amber-50',
        tab: 'bg-amber-200 group-hover:bg-amber-300',
    },
    collection: {
        bg: 'bg-blue-100 hover:bg-blue-50',
        tab: 'bg-blue-200 group-hover:bg-blue-300',
    },
    createCollection: {
        bg: 'bg-gray-200 hover:bg-gray-100',
        tab: 'bg-gray-100 group-hover:bg-gray-50',
    }
}

const FolderTab = ({colorClass})=>(
    <div className={`absolute inset-x-4 -top-2 h-2 rounded-t-md transform -skew-x-6 transition-colors duration-300 ${colorClass}`} />
)


const CollectionPreview = ({
    id, name, entries=[], isUnorganized=false, isCreateNew=false, onCreateNew,
}) => {
    if(isCreateNew){
        return <button className='relative group h-[200px] cursor-pointer' onClick={onCreateNew}>
            <FolderTab colorClass={colorSchemes['createCollection'].bg} />
            <div className={`relative h-full rounded-lg p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-4 ${colorSchemes['createCollection'].tab}`}>
                <div className='h-12 w-12 rounded-full bg-gray-200 group-hover:bg-gray-300 flex items-center justify-center'>
                    <Plus className='h-6 w-6 text-gray-600' />
                </div>
                <p className='font-medium text-gray-700'>Create New Collection</p>
            </div>
        </button>
    }


    const EntryPreview = ({entry})=>(
        <div className='bg-white/50 p-2 rounded text-sm truncate'>
            <span>{getMoodById(entry.mood)?.emoji}</span>
            <span>{entry.title}</span>
        </div>
    )

  return (
    <Link href={`/collection/${isUnorganized ? 'unorganized' : id}`} className='group relative'>
      <FolderTab colorClass={colorSchemes[isUnorganized ? 'unorganized' : 'collection'].tab} />
      <div className={`relative rounded-lg p-6 shadow-md hover:shadow-lg transition-all ${colorSchemes[isUnorganized ? "unorganized" : "collection"].bg}`}>
        <div className='flex items-center gap-3 mb-4'>
            <span className='text-2xl'>{isUnorganized ? <FolderOpen/> : <FolderClosed/>}</span>
            <h3 className='text-lg font-semibold truncate'>{name}</h3>
        </div>
        <div className='space-y-2'>
            <div className='flex justify-between text-sm text-gray-600'>
                <span>{entries.length} entries</span>
                {entries.length>0 && (
                    <span>{formatDistanceToNow(new Date(entries[0].createdAt), {addSuffix: true})}</span>
                )}
            </div>
            <div className='space-y-2 mt-4'>
                {entries.length>0 ? (
                entries.slice(0, 2).map((entry)=>(
                    <EntryPreview entry={entry} key={entry.id} />
                ))
            ) : (
                <p className='text-gray-500 text-sm italic'>No entries yet</p>
            )}</div>
        </div>
      </div>
    </Link>
  )
}

export default CollectionPreview
