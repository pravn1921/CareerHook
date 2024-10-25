import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'
import faqs from '../data/faq.json'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const Landing = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 lg:gap-14 py-10 sm:py-16'>
      <section className='text-center'>
        <h1 className='flex flex-col lg:gap-2 md:gap-2 sm:gap-2 items-center justify-center gradient-title text-6xl font-extrabold 
        sm:text-6xl lg:text-8xl tracking-tighter py-4'>
          Bring your passion &
          <span> Earn <span className='gradient-text'>platform</span> </span>
        </h1>
        <p className='text-gray-400 sm:mt-4 text-sm sm:text-xl px-4 xl:mt-2 max-w-[700px] mx-auto'>
        Careerhook connects job seekers with tailored opportunities and provides employers a diverse talent pool.
        </p>
      </section>
      <div className='flex gap-6 justify-center'>
        <Link to="/jobs">
          <Button variant="blue" size="xl" className='h-14'>Find Jobs</Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl" className='h-14'>Post a Job</Button>
        </Link>
      </div>

      {/* Carousel */}
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full py-10"
      >
        <CarouselContent className='flex gap-5 sm:gap-20 items-center'>
          {companies.map(({name, id, path}) => {
            return (
              <CarouselItem key={id} className='basis-1/3 lg:basis-1/6'>
                <img src={path} alt={name} 
                  className='h-8 sm:h-12 object-contain'
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* banner */}
      <img 
        src="/workbanner.jpg" 
        alt="Banner" 
        className='w-full rounded-sm'
      />

      <section className='grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mx-5 my-5'>
        <Card className='gradient-border'>
          <CardHeader>
            <CardTitle className='font-bold'>Job Seekers</CardTitle>
          </CardHeader>
          <CardContent className='opacity-80'>  
            <p>CareerHook helps job seekers find suitable employment by offering job search tools, and personalized job recommendations. It also provides career advice and interview tips, connecting candidates with a wide range of employers to streamline the job search process.</p>
          </CardContent>
        </Card>

        <Card className='gradient-border'>
          <CardHeader>
            <CardTitle className='font-bold'>Employers</CardTitle>
          </CardHeader>
          <CardContent className='opacity-80'>  
            <p>Careerhook assists employers by providing a platform to post job openings and reach a broad pool of qualified candidates. It offers tools for managing applications, screening resumes. Employers can also refine their recruitment strategies, ensuring they attract the best talent for their needs.</p>
          </CardContent>
        </Card>
      </section>

      {/* Accordion */} 
      <div>
        <h1 className='text-center lg:text-5xl md:text-4xl text-3xl font-bold mb-10'>
          FAQ&apos;s
        </h1>
        <Accordion 
          type="single" 
          collapsible 
          className='flex flex-col gap-3 lg:px-32 md:px-18 sm:px-10 px-5'
        >
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index+1}`}>
                <AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      
 
    </main>
  ) 
}

export default Landing