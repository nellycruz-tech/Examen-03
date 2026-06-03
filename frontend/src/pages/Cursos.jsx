import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios'

const NIVEL_COLOR = {
  basico:     'bg-green-100 text-green-700',
  intermedio: 'bg-yellow-100 text-yellow-700',
  avanzado:   'bg-red-100 text-red-700',
}

export default function Cursos() {
  const [cursos, setCursos] = useState([])

  const cargar = () => API.get('/cursos/').then(r => setCursos(r.data))
  useEffect(() => { cargar() }, [])

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar curso?')) return
    await API.delete(`/cursos/${id}/`)
    cargar()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📚 Cursos</h2>
        <Link to="/cursos/nuevo"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Nuevo Curso
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map(c => (
          <div key={c.id} className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
            {c.imagen && (
              <img 
                /* CONFIGURACIÓN AQUÍ: Apunta siempre al backend de Render */
                src={c.imagen.startsWith('http') ? c.imagen : `https://examen-03-3oi4.onrender.com${c.imagen}`} 
                alt={c.nombre}
                className="w-full h-44 object-cover" 
              />
            )}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{c.nombre}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold
                                  ${NIVEL_COLOR[c.nivel]}`}>
                  {c.nivel}
                </span>
              </div>
              <p className="text-sm text-gray-500">⏱ {c.duracion} horas</p>
              <p className="text-sm text-gray-400">👨‍🏫 {c.docente_nombre}</p>
              <div className="flex gap-2 mt-4">
                <Link to={`/cursos/editar/${c.id}`}
                  className="flex-1 text-center bg-yellow-400 text-white py-1 rounded
                             hover:bg-yellow-500 text-sm">
                  ✏️ Editar
                </Link>
                <button onClick={() => eliminar(c.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded
                             hover:bg-red-600 text-sm">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}