import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Sistema de Gestión de Cursos
      </h1>
      <p className="text-gray-500 mb-10 text-lg">
        Administra docentes y cursos de forma sencilla
      </p>
      <div className="flex justify-center gap-6">
        <Link to="/docentes"
          className="bg-green-600 text-white px-8 py-4 rounded-xl
                     hover:bg-green-700 transition font-semibold text-lg shadow">
          👨‍🏫 Docentes
        </Link>
        <Link to="/cursos"
          className="bg-blue-600 text-white px-8 py-4 rounded-xl
                     hover:bg-blue-700 transition font-semibold text-lg shadow">
          📚 Cursos
        </Link>
      </div>
    </div>
  )
}