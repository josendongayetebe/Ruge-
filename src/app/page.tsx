import { brand } from "../brand";

export default function Home() {
  return (
    <div>
      <h2 style={{fontSize:32, fontWeight:800}}>Bienvenido a {brand.name}</h2>
      <p>{brand.fullName}</p>
      <div style={{display:'grid', gap:16, marginTop:24}}>
        <div className="card-ruge">📚 Repositorio Académico Nacional</div>
        <div className="card-ruge">💰 Precios: ${brand.pricing.monthly.usd}/mes o ${brand.pricing.annual.usd}/año</div>
        <div className="card-ruge">📱 MUNI: {brand.muniNumber}</div>
      </div>
      <a href="/pricing" className="btn-ruge" style={{display:'inline-block', marginTop:24}}>Ver Planes</a>
    </div>
  );
}
