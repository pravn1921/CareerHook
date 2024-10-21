import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'
import { Button } from './ui/button'

const Header = () => {

  const [ showSignIn, setShowSignIn ] = useState(false);
  const [ search, setSearch ] = useSearchParams();
  const { user } = useUser();
  
  useEffect(() => {
    if(search.get("sign-in")){
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if(e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className='py-4 flex flex-row justify-between items-center px-3'>
        <Link>
          <img src='\careerhooklogo.png' alt='Logo' className='h-[75px] opacity-95' />
        </Link>

        <div className='flex gap-5'>
          <SignedOut>
            <Button variant='outline' onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className='mr-2' />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link 
                  label='My Jobs'
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href='/my-jobs'
                />
              </UserButton.MenuItems>

              <UserButton.MenuItems>
                <UserButton.Link 
                  label='Saved Jobs'
                  labelIcon={<Heart size={15} />}
                  href='/saved-job'
                />
                <UserButton.Action label='manageAccount' />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>  
        </div>
      </nav>

      {showSignIn && (
        <div 
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'
          onClick={handleOverlayClick}
        >
          <SignIn 
            signUpForceRedirectUrl='/onboarding'
            fallbackRedirectUrl='/onboarding'
          />
        </div>
      )}
    </>
  )
}

export default Header
