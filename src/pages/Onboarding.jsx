import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Onboarding = () => {

  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
    .update({
      unsafeMetadata: { role },
    })
    .then(() => {
      navigate(role === "recruiter" ? "/post-job" : "/jobs");
    })
    .catch((err) => {
      console.log("Error updating role:", err);
    });
  };

  useEffect(() => {
    if(user?.unsafeMetadata?.role){
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);

  if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }
  

  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'>
        I am a...
      </h2>
      <div className='mt-16 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:gap-10 gap-5 w-full lg:px-20 md:px-20 px-10'>
        <Button 
          variant='blue' 
          className='h-28 text-2xl'
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button 
          variant='destructive' 
          className='h-28 text-2xl'
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
} 

export default Onboarding
