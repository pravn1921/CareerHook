import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react'
import useFetch from '@/hooks/useFetch';
import { updateApplicationStatus } from '@/api/apiApplications';
import { BarLoader } from 'react-spinners';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  return (
    <Card className='my-5'>
      {loadingHiringStatus && <BarLoader className='rounded-t-2xl' width={'100%'} color='#36d7b7' />}
      <CardHeader>
        <CardTitle className='flex justify-between font-bold'>
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download 
            size={18}
            className='bg-white bg-opacity-80 text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className='mt-[-10px] mb-[-10px]'>
        <div className='flex flex-col md:flex-row justify-between font-bold text-gray-400'>
          <div className='flex gap-2 items-center'>
            <BriefcaseBusiness size={15} /> Experience :&nbsp; 
              {application?.experience > 1 ? application?.experience + ' Years' : application?.experience + ' Year'} 
              {application?.experience === 0 && 'Fresher'}
          </div>
          <div className='flex gap-2 items-center'>
            <School size={15} /> {application?.education} 
          </div>
          <div className='flex gap-2 items-center'>
            <Boxes size={15} /> {application?.skills}
          </div>
        </div>
      </CardContent>
      <hr className='mx-6' />
      <CardFooter className='mt-2 mb-[-13px] flex justify-between'>
        <span className='text-sm opacity-60'>{new Date(application?.  created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className='font-bold capitalize'>Status: {application?.status}</span>
        ) : (
          <Select 
            onValueChange={handleStatusChange} 
            defaultValue={application.status}
          >
            <SelectTrigger className='w-52'>
              <SelectValue placeholder='Application Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  )
}

export default ApplicationCard
