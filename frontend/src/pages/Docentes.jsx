import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios'

export default function Docentes() {
  const [docentes, setDocentes] = useState([])

  const cargar = () => API.get('/docentes/').then(r => setDocentes(r.data))

  useEffect(() => { cargar() }, [])

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar docente?')) return
    await API.delete(`/docentes/${id}/`)
    cargar()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">👨‍🏫 Docentes</h2>
        <Link to="/docentes/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          + Nuevo Docente
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docentes.map(d => (
          <div key={d.id} className="bg-white rounded-xl shadow p-5 border border-gray-100">
            {d.imagen && (
              <img
                src={d.imagen}
                alt={d.nombre}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="font-bold text-lg text-gray-800">{d.nombre}</h3>
            <p className="text-sm text-gray-500">{d.especialidad}</p>
            <p className="text-sm text-gray-400">{d.correo}</p>
            <div className="flex gap-2 mt-4">
              <Link to={`/docentes/editar/${d.id}`}
                className="flex-1 text-center bg-yellow-400 text-white py-1 rounded
                           hover:bg-yellow-500 text-sm">
                ✏️ Editar
              </Link>
              <button onClick={() => eliminar(d.id)}
                className="flex-1 bg-red-500 text-white py-1 rounded
                           hover:bg-red-600 text-sm">
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}