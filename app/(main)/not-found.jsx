import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-6xl font-bold'>404</h1>
      <h1 className='text-4xl font-bold'>Not Found</h1>
      <h2 className='text-lg font-medium text-gray-500'>The page you are looking for does not exist.</h2>
      <Link href="/"><Button variant="outline">Go to Home</Button></Link>
    </div>
  )
}

export default NotFound
