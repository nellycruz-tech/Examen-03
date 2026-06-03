import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar       from './components/Navbar'
import Home         from './pages/Home'
import Docentes     from './pages/Docentes'
import DocenteForm  from './pages/DocenteForm'
import Cursos       from './pages/Cursos'
import CursoForm    from './pages/CursoForm'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/docentes"            element={<Docentes />} />
          <Route path="/docentes/nuevo"      element={<DocenteForm />} />
          <Route path="/docentes/editar/:id" element={<DocenteForm />} />
          <Route path="/cursos"              element={<Cursos />} />
          <Route path="/cursos/nuevo"        element={<CursoForm />} />
          <Route path="/cursos/editar/:id"   element={<CursoForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}