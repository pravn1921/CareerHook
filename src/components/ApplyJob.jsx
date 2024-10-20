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

const ApplyJob = ({ user, job, applied=false, fetchJob }) => {
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

        <form className="flex flex-col gap-4 p-4 pb-0">
          <Input
            type='number'
            placeholder='Experience'
            className='flex-1'
          />
          <Input 
            type='text'
            placeholder='Skills'
            className='flex-1'
          />

          <Label className='text-lg'>Education:</Label>
          <RadioGroup defaultValue="option-one" className='flex flex-col sm:flex-row sm:gap-12 gap-4'>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Under Graduate" id="under-graduate" />
              <Label htmlFor="under-graduate">Under Graduate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Post Graduate" id="post-graduate" />
              <Label htmlFor="post-graduate">Post Graduate</Label>
            </div>
          </RadioGroup>

          <Input 
            type='file'
            accept='.pdf, .doc, .docx'
            className='flex-1 file:text-gray-500 mt-2'
          />
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