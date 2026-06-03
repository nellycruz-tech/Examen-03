import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

export default function CursoForm() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const esEdicion = Boolean(id)

  const [form, setForm]       = useState({
    nombre: '', duracion: '', nivel: 'basico', docente: '', imagen: null
  })
  const [docentes, setDocentes] = useState([])
  const [preview, setPreview]   = useState(null)
  const [cargando, setCargando] = useState(esEdicion) // 👈 Nuevo estado para evitar parpadeo

  useEffect(() => {
    API.get('/docentes/').then(r => setDocentes(r.data))
    
    if (esEdicion && id) {
      API.get(`/cursos/${id}/`).then(r => {
        const { nombre, duracion, nivel, docente, imagen } = r.data
        
        setForm({ 
          nombre, 
          duracion, 
          nivel, 
          docente, 
          imagen: null // 👈 Siempre null porque FormData no puede pre-cargar archivos
        })
        
        // ✅ CORRECCIÓN PRINCIPAL: Validar que imagen exista Y sea string válido
        if (imagen && typeof imagen === 'string' && imagen.trim() !== '') {
          // Asegurar que la URL empiece con /media/ o construir completa
          const imageUrl = imagen.startsWith('http') 
            ? imagen 
            : `http://localhost:8000${imagen.startsWith('/') ? '' : '/'}${imagen}`
          
          console.log('URL de imagen:', imageUrl) // 👈 Debug en consola
          setPreview(imageUrl)
        } else {
          console.log('No hay imagen para este curso') // 👈 Debug
          setPreview(null)
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
    data.append('nombre',   form.nombre)
    data.append('duracion', form.duracion)
    data.append('nivel',    form.nivel)
    data.append('docente',  form.docente)
    
    // ✅ Solo enviar imagen si el usuario seleccionó una nueva
    if (form.imagen instanceof File) {
      data.append('imagen', form.imagen)
    }

    try {
      if (esEdicion) {
        await API.patch(`/cursos/${id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await API.post('/cursos/', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }
      navigate('/cursos')
    } catch (err) {
      console.error('Error al guardar:', err)
      alert('Ocurrió un error al guardar el curso')
    }
  }

  // ✅ Mostrar loading mientras carga datos de edición
  if (cargando) {
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow text-center">
        <p className="text-gray-500">Cargando datos del curso...</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {esEdicion ? '✏️ Editar Curso' : '➕ Nuevo Curso'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del curso</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none
                       focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duración (horas)</label>
          <input name="duracion" type="number" value={form.duracion} onChange={handleChange} required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none
                       focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
          <select name="nivel" value={form.nivel} onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none
                       focus:ring-2 focus:ring-blue-400">
            <option value="basico">Básico</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Docente</label>
          <select name="docente" value={form.docente} onChange={handleChange} required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none
                       focus:ring-2 focus:ring-blue-400">
            <option value="">-- Selecciona un docente --</option>
            {docentes.map(d => (
              <option key={d.id} value={d.id}>{d.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del curso</label>
          <input name="imagen" type="file" accept="image/*" onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
          
          {/* ✅ Mostrar preview solo si existe URL válida */}
          {preview && (
            <div className="mt-3">
              <img 
                src={preview} 
                alt="Vista previa del curso"
                className="h-40 w-full object-cover rounded-lg border"
                onError={(e) => {
                  console.error('Error cargando imagen:', e.target.src)
                  e.target.style.display = 'none'
                }}
              />
              {esEdicion && (
                <p className="text-xs text-gray-500 mt-1">
                  💡 Deja el campo vacío para mantener la imagen actual
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg
                       hover:bg-blue-700 font-semibold">
            {esEdicion ? 'Guardar cambios' : 'Crear Curso'}
          </button>
          <button type="button" onClick={() => navigate('/cursos')}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}