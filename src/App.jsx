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
import ProtectedRoute from './components/ProtectedRoute';

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
        element : (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element : (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element : (
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element : (
          <ProtectedRoute>
            <PostJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-job",
        element : (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element : (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
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
 