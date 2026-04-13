import { useState, useEffect } from 'react'
import axios from 'axios'

export const ApiRyC_Axios = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [info, setInfo] = useState({})
    const [query, setQuery] = useState('')

    useEffect(() => {
        const source = axios.CancelToken.source()
        axios.get('https://rickandmortyapi.com/api/character', {
            params: { page, name: query },
            cancelToken: source.token
        })
            .then(({ data }) => {
                setData(data.results || [])
                setInfo(data.info || {})
            })
            .catch((err) => {
                if (axios.isCancel(err)) return
                if (err.response?.status === 404) { setData([]); setInfo({}); return }
                console.error(err)
            })
        return () => source.cancel()
    }, [page, query])

    return (
        <div className="container py-4 text-center">

            {/* Título */}
            <h4 className="mb-4 fw-bold">🛸 Rick & Morty API</h4>

            {/* Buscador */}
            <div className="row justify-content-center mb-4">
                <div className="col-12 col-md-6">
                    <input
                        className="form-control"
                        placeholder="Buscar personaje..."
                        value={query}
                        onChange={(e) => { setQuery(e.target.value.trim()); setPage(1); }}
                    />
                </div>
            </div>

            {/* Sin resultados */}
            {data.length === 0 && (
                <p className="text-muted">No se encontraron personajes.</p>
            )}

            {/* Grid de personajes */}
            <div className="row g-3 justify-content-center">
                {data.map((char) => (
                    <div key={char.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="card h-100 border-0 shadow"
                            style={{ backgroundColor: '#0f0f0f', borderRadius: 12 }}>
                            <img
                                src={char.image}
                                alt={char.name}
                                className="card-img-top"
                                style={{ borderRadius: '12px 12px 0 0', height: 220, objectFit: 'cover' }}
                                loading="lazy"
                            />
                            <div className="card-body py-2">
                                <h6 className="card-title text-white mb-1">{char.name}</h6>
                                <span className={`badge ${char.status === 'Alive' ? 'bg-success' : char.status === 'Dead' ? 'bg-danger' : 'bg-secondary'}`}>
                                    {char.status}
                                </span>
                                <p className="text-white-50 small mt-1 mb-0">{char.gender} · {char.species}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                <button className="btn btn-outline-dark btn-sm"
                    onClick={() => setPage(page - 1)} disabled={!info.prev}>
                    ← Anterior
                </button>
                <span className="fw-semibold">Página {page} de {info.pages || '?'}</span>
                <button className="btn btn-outline-dark btn-sm"
                    onClick={() => setPage(page + 1)} disabled={!info.next}>
                    Siguiente →
                </button>
            </div>

        </div>
    )
}
