import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotesDashboard from './pages/NotesDashboard.tsx'
import NoteEditor from './pages/NotesEditor.tsx'
import Home from './pages/Home.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import UserProfile from './pages/UserProfile.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import ChangePassword from './pages/ChangePassword.tsx'

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { path: '/dashboard', element: (
        <ProtectedRoute>
          <NotesDashboard />
        </ProtectedRoute>
      ) }, 
      { path: '/noteseditor', element:  (
        <ProtectedRoute>
          <NoteEditor />
        </ProtectedRoute>
      ) },
      { path: '/myprofile', element:  (
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      ) },
      { path: '/change-password', element:  (
        <ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute>
      ) },
      { path: '/', element: <Home /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/forgot-password', element: <ForgotPassword /> }, ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
