import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react'
import MDEditor from '@uiw/react-md-editor';
import { BriefcaseBusiness, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Job = () => {

  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    fn: fnJob,
    data: job, 
    loading: loadingJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const {
    fn: fnHiringStatus,
    loading: loadingHiringStatus,
  } = useFetch(updateHiringStatus, {
    job_id: id,
  });

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  }

  useEffect(() => {
    if(isLoaded) fnJob();
  }, [isLoaded]);

  if(!isLoaded || loadingJob){
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }

  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} alt={job?.title} className='h-12' />
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPinIcon color='yellow'/>
          {job?.location}
        </div>
        <div className='flex gap-2'>
          <BriefcaseBusiness fill='#954535' fillOpacity={0.5} /> {job?.applications?.length} Applicants
        </div>
        <div className='flex gap-2'>
          {job?.isOpen ? (
            <>
              <DoorOpen color='green' /> Open
            </> 
            ) : (
            <>
              <DoorClosed fill='red' /> Closed
            </>
          )} 
        </div>
      </div>

      {/* hiring status */}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className={`w-full ${job?.isOpen ? "bg-green-900" : "bg-red-900"}`}>
            <SelectValue placeholder={
              "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
            } />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className='text-2xl sm:text-3xl font-bold'>
        About the Job
      </h2>
      <p className='sm:text-lg'>{job?.description}</p>
      
      <h2 className='text-2xl sm:text-3xl font-bold'>
        We are looking for..
      </h2>
      <MDEditor.Markdown 
        source={job?.requirements}
        className='bg-transparent sm:text-lg'
      />

      {/* render applications */}

    </div>
  )
}

export default Job
 