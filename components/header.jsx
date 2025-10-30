import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Bookmark, LayoutDashboard, PenBox } from 'lucide-react'
import UserMenu from './user-menu'
import { checkUser } from '@/lib/checkUser'

const Header = async () => {
  await checkUser();
    return (
        <header className='container mx-auto'>
            <nav className='py-6 px-4 flex justify-between items-center'>
                <Link href={"/"}>
                    <Image
                        src={"/logo.png"}
                        alt='Reveal logo'
                        width={200} 
                        height={60} 
                        className='h-10 w-auto object-contain' />
                </Link>
                <div className='flex items-center gap-4'>
                    {/* Login and other ctas */}
                    <SignedOut>
              <SignInButton className="font-extrabold text-sm cursor-pointer transition duration-300 ease-in-out hover:text-[#5C5DF1]" forceRedirectUrl='/dashboard' />
              <SignUpButton>
                <Button variant="default" className="font-extrabold text-sm cursor-pointer">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href='/dashboard'>
              <Button variant="link" className="font-extrabold cursor-pointer flex items-center gap-2">
                <LayoutDashboard size={18}/>
                <span className='hidden md:inline'>Dashboard</span>
              </Button>
              </Link>
              <Link href='/journal/write'>
              <Button variant="link" className="font-extrabold cursor-pointer flex items-center gap-2">
                <PenBox size={18}/>
                <span className='hidden md:inline'>Write New</span>
              </Button>
              </Link>
              <Link href='/dashboard/collection'>
              <Button variant="link" className="font-extrabold cursor-pointer flex items-center gap-2">
                <Bookmark size={18}/>
                <span className='hidden md:inline'>Collection</span>
              </Button>
              </Link>
              <UserMenu />
            </SignedIn>
                </div>
            </nav>
        </header>
    )
}

export default Header
