import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useFetch from "@/hooks/useFetch"
import { applyToJob } from "@/api/apiApplications"
import { BarLoader } from "react-spinners"

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be atleast 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required"
  }),
  resume: z.any().refine((file) => file[0] &&
    (file[0].type === "application/pdf" || file[0].type === "application/msword"),
    { message: "Only PDF or Word documents are allowed" }
  ),
});

const ApplyJob = ({ user, job, applied=false, fetchJob }) => {

  const { 
    register, handleSubmit, control, formState: { errors }, reset
   } = useForm({
    resolver: zodResolver(schema),
   });

   const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
   } = useFetch(applyToJob);

   const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    })
   };
  
  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger>
        <Button 
          className='w-48'
          size={'lg'}
          variant={job?.isOpen && !applied ? "blue" : "destructive"}
          disabled={!job?.isOpen || applied} 
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className='sm:px-3 px-2 pb-7'>
        <DrawerHeader>
          <DrawerTitle>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please fill the form below.</DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
          <Input
            type='number'
            placeholder='Experience in Years'
            className='flex-1'
            {...register("experience", {
              valueAsNumber: true,
            })}
          />
          {errors.experience && (
            <p className="text-red-500">{errors.experience.message}</p>
          )}

          <Input 
            type='text'
            placeholder='Skills'
            className='flex-1'
            {...register("skills")}
          />
          {errors.skills && (
            <p className="text-red-500">{errors.skills.message}</p>
          )}

          <Label className='text-lg'>Education:</Label>
          <Controller
            name="education"
            control={control}
            render={({field}) => (
              <RadioGroup 
                onValueChange={field.onChange}
                {...field}
                className='flex flex-col sm:flex-row sm:gap-12 gap-4'
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Graduate" id="graduate" />
                  <Label htmlFor="graduate">Under Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Post Graduate" id="post-graduate" />
                  <Label htmlFor="post-graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className="text-red-500">{errors.education.message}</p>
          )}

          <Input 
            type='file'
            accept='.pdf, .doc, .docx'
            className='flex-1 file:text-gray-500 mt-2'
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}
          {errorApply?.message && (
            <p className="text-red-500">{errorApply?.message}</p>
          )} 
          {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}

          <div className="flex justify-center mt-3">
            <Button
              type='submit'
              variant='blue' 
              className='w-full sm:w-52'
            >
              Submit
            </Button>
          </div>
        </form>

        <DrawerFooter>
          <DrawerClose className="mt-[-5px]">
            <Button variant="outline" className='w-36 bg-red-500'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ApplyJob