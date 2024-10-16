import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-row flex-wrap items-center justify-center w-full py-6 text-center border-t gap-y-6 gap-x-12 border-slate-200 md:justify-between">
      <p className="block text-slate-100 font-semibold text-sm">
          CareerHook&copy;
      </p>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <a href="#" className="text-slate-50 hover:text-slate-500 focus:text-slate-500 text-sm">
            About Us
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-50 hover:text-slate-500 focus:text-slate-500 text-sm">
            License
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-50 hover:text-slate-500 focus:text-slate-500 text-sm">
            Contribute
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-50 hover:text-slate-500 focus:text-slate-500 text-sm">
            Contact Us
          </a>
        </li>
      </ul>
    </footer>                                    
  )
}

export default Footer
