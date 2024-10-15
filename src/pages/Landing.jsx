import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col lg:gap-2 md:gap-2 sm:gap-2 items-center justify-center gradient-title text-4xl font-extrabold 
        sm:text-6xl lg:text-8xl tracking-tighter py-4'>
          Bring your passion &
          <span> Earn platform </span>
        </h1>
        <p className='text-gray-400 sm:mt-4 text-xs sm:text-xl px-4 xl:mt-2'>
        Careerhook connects job seekers with tailored opportunities and provides employers a diverse talent pool.
        </p>
      </section>
      <div>
        <Link to="/jobs">
          <Button>Find Jobs</Button>
        </Link>
        <Link to="/post-job">
          <Button>Post a Job</Button>
        </Link>
      </div>
        {/* carousal */}

      {/* banner */}

      <section>
        {/* cards */}
      </section>

      {/* Accordion */}
    </main>
  ) 
}

export default Landing