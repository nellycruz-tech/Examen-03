import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide">
          🎓 GestiónCursos
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/docentes" className="hover:text-green-200 transition">Docentes</Link>
          <Link to="/cursos"   className="hover:text-green-200 transition">Cursos</Link>
        </div>
      </div>
    </nav>
  )
}