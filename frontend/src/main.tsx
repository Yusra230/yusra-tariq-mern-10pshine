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
      { path: '/', element: <Home /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> }, ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
