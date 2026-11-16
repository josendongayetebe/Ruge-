import { brand } from "../../brand";

export default function Pricing() {
  return (
    <div>
      <h2 style={{fontSize:32, fontWeight:800}}>Planes de {brand.name}</h2>
      <div style={{display:'grid', gap:16, marginTop:24}}>
        <div className="card-ruge">
          <h3>Mensual</h3>
          <p style={{fontSize:28, fontWeight:800}}>${brand.pricing.monthly.usd} / {brand.pricing.monthly.xaf} XAF</p>
        </div>
        <div className="card-ruge">
          <h3>Anual - ¡2 meses gratis!</h3>
          <p style={{fontSize:28, fontWeight:800}}>${brand.pricing.annual.usd} / {brand.pricing.annual.xaf} XAF</p>
        </div>
      </div>
      <a href="/" className="btn-ruge" style={{display:'inline-block', marginTop:24}}>Volver al inicio</a>
    </div>
  );
}
