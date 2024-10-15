import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const Header = () => {
  return (
    <>
      <nav className='py-4 flex flex-row justify-between items-center'>
        <Link>
          <img src='\careerhooklogo.png' alt='Logo' className='h-[75px] opacity-95' />
        </Link>

        <Button variant='outline'>Login</Button>
        
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
    
      </nav>
    </>
  )
}

export default Header
