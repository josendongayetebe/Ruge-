import { brand } from "../../brand";

export default function Pricing() {
  return (
    <div style={{padding:40, maxWidth:900, margin:"0 auto"}}>
      <h2 style={{fontSize:32, fontWeight:800}}>Planes {brand.name}</h2>
      <div style={{display:'grid', gap:16, marginTop:24}}>
        <div className="card-ruge">
            <h3>Mensual</h3>
            <p style={{fontSize:28, fontWeight:800}}>5000 XAF / mes</p>
        </div>
        <div className="card-ruge">
            <h3>Anual - ¡2 meses gratis!</h3>
            <p style={{fontSize:28, fontWeight:800}}>50000 XAF / año</p>
        </div>
      </div>
      <a href="/" className="btn-ruge" style={{display:'inline-block', marginTop:24}}>Volver</a>
    </div>
  );
}
