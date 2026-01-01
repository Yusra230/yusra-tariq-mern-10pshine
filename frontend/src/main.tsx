import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotesLogin from './pages/Authentication.tsx'
import Home from './pages/Home.tsx'
import NotesDashboard from './pages/NotesDashboard.tsx'
import NoteEditor from './pages/NotesEditor.tsx'
import UserProfile from './pages/UserProfile.tsx'

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <NotesLogin /> },
      { path: '/dashboard', element: < NotesDashboard/> }, 
      { path: '/noteseditor', element: < NoteEditor/> }, 
      { path: '/myprofile', element: < UserProfile/> }, ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
