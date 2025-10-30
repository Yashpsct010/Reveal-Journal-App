import React from 'react'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'

const Cta = () => {
  return (
    <>
      <Card className="bg-gradient-to-r from-blue-100 to-blue-50 mt-24 rounded-3xl">
        <CardContent className="text-center p-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Start Your Journey Today</h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
                Join thousands of writers who have already discovered the power of digital journaling.
            </p>
            <Link href="/dashboard">
                <Button size="lg" variant="default" className="animate-bounce cursor-pointer">
                    Get Started for free <ChevronRight/>
                </Button>
            </Link>
        </CardContent>
      </Card>
    </>
  )
}

export default Cta
