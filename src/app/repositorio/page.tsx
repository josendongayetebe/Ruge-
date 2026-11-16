import { brand } from "../../brand";

export default function Repo() {
  return (
    <div>
      <h2 style={{fontSize:32, fontWeight:800}}>Repositorio Nacional - {brand.name}</h2>
      <p style={{marginTop:12}}>Aquí se gestionarán todas las producciones académicas de Guinea Ecuatorial.</p>
      <div style={{display:'grid', gap:16, marginTop:24}}>
        <div className="card-ruge">🔍 Buscador académico (próximamente)</div>
        <div className="card-ruge">📄 Tesis y trabajos de fin de grado</div>
        <div className="card-ruge">🏛️ Universidades de EG</div>
      </div>
      <a href="/" className="btn-ruge" style={{display:'inline-block', marginTop:24}}>Volver</a>
    </div>
  );
}
