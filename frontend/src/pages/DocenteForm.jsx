import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

export default function DocenteForm() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const esEdicion = Boolean(id)

  const [form, setForm] = useState({
    nombre: '', especialidad: '', correo: '', imagen: null
  })
  const [preview, setPreview] = useState(null)
  const [cargando, setCargando] = useState(esEdicion) // 👈 Nuevo: evita parpadeo al cargar

  useEffect(() => {
    if (esEdicion && id) {
      API.get(`/docentes/${id}/`).then(r => {
        const { nombre, especialidad, correo, imagen } = r.data
        
        setForm({ nombre, especialidad, correo, imagen: null })
        
        // ✅ CORRECCIÓN: Construir URL completa y validar que exista
        if (imagen && typeof imagen === 'string') {
          // Si ya tiene http, úsala tal cual. Si no, agrega el dominio del backend
          const imageUrl = imagen.startsWith('http') 
            ? imagen 
            : `http://localhost:8000${imagen.startsWith('/') ? '' : '/'}${imagen}`
          
          console.log('URL Imagen Docente:', imageUrl) // 👈 Debug
          setPreview(imageUrl)
        }
      }).finally(() => setCargando(false))
    } else {
      setCargando(false)
    }
  }, [id, esEdicion])

  const handleChange = e => {
    const { name, value, files } = e.target
    if (files && files.length > 0) {
      setForm(f => ({ ...f, imagen: files[0] }))
      setPreview(URL.createObjectURL(files[0]))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData()
    data.append('nombre',       form.nombre)
    data.append('especialidad', form.especialidad)
    data.append('correo',       form.correo)
    
    // Solo enviar imagen si es un archivo nuevo (no string)
    if (form.imagen instanceof File) {
      data.append('imagen', form.imagen)
    }

    try {
      if (esEdicion) {
        await API.patch(`/docentes/${id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await API.post('/docentes/', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }
      navigate('/docentes')
    } catch (err) {
      console.error('Error al guardar docente:', err)
      alert('Ocurrió un error al guardar')
    }
  }

  // ✅ Mostrar loading mientras carga datos
  if (cargando) {
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow text-center">
        <p className="text-gray-500">Cargando datos del docente...</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {esEdicion ? '✏️ Editar Docente' : '➕ Nuevo Docente'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none
                       focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
          <input name="especialidad" value={form.especialidad} onChange={handleChange} required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none
                       focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
          <input name="correo" type="email" value={form.correo} onChange={handleChange} required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none
                       focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
          <input name="imagen" type="file" accept="image/*" onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
          
          {/* ✅ Preview con manejo de errores */}
          {preview && (
            <div className="mt-3">
              <img 
                src={preview} 
                alt="Vista previa"
                className="h-40 w-full object-cover rounded-lg border"
                onError={(e) => {
                  console.error('Error cargando imagen:', e.target.src)
                  e.target.style.display = 'none'
                }}
              />
              {esEdicion && (
                <p className="text-xs text-gray-500 mt-1">
                  💡 Deja vacío para mantener la imagen actual
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded-lg
                       hover:bg-green-700 font-semibold">
            {esEdicion ? 'Guardar cambios' : 'Crear Docente'}
          </button>
          <button type="button" onClick={() => navigate('/docentes')}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}