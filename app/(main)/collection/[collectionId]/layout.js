import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const CollectionLayout = ({children}) => {
  return (
    <div className='container mx-auto px-4 py-8'>
        <div>
            <Link href="/dashboard">
                <Button variant="link" className="font-extrabold cursor-pointer flex items-center gap-2">
                    <ChevronLeft size={18}/>
                    <span className='hidden md:inline'>Back to Dashboard</span>
                </Button>
            </Link>
        </div>
      <Suspense fallback={<BarLoader color="blue" width={"100%"} />}>{children}</Suspense>
    </div>
  )
}

export default CollectionLayout