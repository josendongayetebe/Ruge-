"use client";
import { useState } from "react";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");

  if (!auth) {
    return (
      <div style={{padding:40, maxWidth:400, margin:"100px auto", textAlign:"center"}}>
        <h1>Admin RUGE</h1>
        <input type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} style={{padding:12, width:"100%", marginTop:20}} />
        <button onClick={()=>{ if(pass==="ruge2026") setAuth(true); else alert("Mal") }} style={{marginTop:16, padding:12, width:"100%", background:"#0a5c36", color:"white"}}>Entrar</button>
      </div>
    )
  }

  return (
    <div style={{padding:40}}>
      <h1>Subir Documento RUGE</h1>
      <input placeholder="Título del documento" style={{padding:12, width:"100%", marginTop:20}} />
      <input type="file" accept=".pdf" style={{marginTop:20}} />
      <button style={{marginTop:20, padding:12, background:"#0a5c36", color:"white"}}>SUBIR</button>
      <p style={{marginTop:20}}><a href="/">Volver</a></p>
    </div>
  )
}
