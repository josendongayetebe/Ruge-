import { brand } from "../../brand";

export default function MuniPage() {
  return (
    <div>
      <h2 style={{fontSize:32, fontWeight:800}}>Contacto MUNI</h2>
      <div className="card-ruge" style={{marginTop:24}}>
        <p>¿Necesitas ayuda? Escríbenos directo a MUNI</p>
        <p style={{fontWeight:800, fontSize:20, marginTop:12}}>{brand.muniNumber}</p>
        <a href={`https://wa.me/${brand.muniNumber.replace(/\D/g,'')}`} className="btn-ruge" style={{display:'inline-block', marginTop:16}}>
          Abrir WhatsApp
        </a>
      </div>
      <p style={{marginTop:16}}>Correo: {brand.contact}</p>
    </div>
  );
}
