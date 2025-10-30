import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { format } from 'date-fns'

const EntryCard = ({ entry }) => {
  return (
    <Link href={`/journal/${entry.id}`}>
      <Card className='hover:shadow-lg transition-shadow duration-300'>
        <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                        <span className='text-2xl'>{entry.moodData?.emoji}</span>
                        <h3 className='text-lg font-bold'>{entry.title}</h3>
                    </div>
                        <div className='line-clamp-2 text-sm text-gray-600' dangerouslySetInnerHTML={{__html: entry.content}}/>
                </div>
                    <time className='text-sm text-gray-500'>{format(new Date(entry.createdAt), "MMM d, yyyy")}</time>
            </div>
            {entry.collection && (
              <div className='mt-4 flex items-center gap-2'>
                <span className='text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded'>
                  {entry.collection.name}
                </span>
              </div>
            )}
        </CardContent>
      </Card>
      
    </Link>
  )
}

export default EntryCard
