import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <div className='grid-background'></div>
        <main className='min-h-screen mx-auto'>
          <Header />
          <div className=''>
            <Outlet />
          </div>
        </main>
    </div>
  )
}

export default AppLayout
