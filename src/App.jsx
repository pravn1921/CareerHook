import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import JobListing from './pages/JobListing';
import Job from './pages/Job';
import MyJobs from './pages/MyJobs';
import PostJobs from './pages/PostJobs';
import SavedJobs from './pages/SavedJobs';
import { ThemeProvider } from './components/theme-provider';

const router = createBrowserRouter([
  {
    element : <AppLayout />,
    children : [
      {
        path: "/",
        element : <Landing />
      },
      {
        path: "/onboarding",
        element : <Onboarding />
      },
      {
        path: "/jobs",
        element : <JobListing />
      },
      {
        path: "/job/:id",
        element : <Job />
      },
      {
        path: "/post-job",
        element : <PostJobs />
      },
      {
        path: "/saved-job",
        element : <SavedJobs />
      },
      {
        path: "/my-jobs",
        element : <MyJobs />
      }
    ]
  },
]);

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App
 