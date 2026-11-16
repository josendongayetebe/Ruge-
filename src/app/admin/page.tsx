"use client";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gqnrpmpgpenwplphpyvv.supabase.co',
  'sb_publishable_d7mqpIL6i46JAQe2gzdurg_dGFl5Yi0'
);

export default function Admin() {
  const [titulo, setTitulo] = useState("");
  const [file, setFile] = useState<File|null>(null);
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [ok, setOk] = useState(false);

  async function subir() {
    if(!file || !titulo){ alert("Pon título y elige PDF"); return; }
    setLoading(true);
    try {
      const name = Date.now() + "-" + file.name.replace(/\s/g,"_");
      const { error: upErr } = await supabase.storage.from('documentos').upload(name, file);
      if(upErr) throw upErr;
      const { data } = supabase.storage.from('documentos').getPublicUrl(name);
      const { error: dbErr } = await supabase.from('documentos').insert({ titulo, url: data.publicUrl });
      if(dbErr) throw dbErr;
      alert("¡SUBIDO! Ahora aparece en la web principal");
      setTitulo(""); setFile(null);
    } catch(e:any){ alert("Error: " + e.message); }
    setLoading(false);
  }

  if(!ok){
    return (
      <div style={{padding:40, maxWidth:400, margin:"50px auto", background:"white", borderRadius:12}}>
        <h1 style={{fontWeight:800}}>Panel RUGE - Admin</h1>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Contraseña: ruge2026" style={{width:"100%", padding:12, marginTop:20, border:"1px solid #ccc"}} />
        <button onClick={()=>{ if(pass==="ruge2026") setOk(true); else alert("Mal"); }} style={{width:"100%", padding:12, marginTop:12, background:"#0a5c36", color:"white", fontWeight:700}}>Entrar</button>
      </div>
    )
  }

  return (
    <div style={{padding:24, maxWidth:600, margin:"0 auto", background:"white", minHeight:"100vh"}}>
      <h1 style={{fontSize:26, fontWeight:800}}>📤 Subir Documento RUGE</h1>
      <p style={{color:"#666", fontSize:14}}>Sube aquí y aparecerá automáticamente en https://ruge-amd5.vercel.app/</p>
      <input value={titulo} onChange={e=>setTitulo(e.target.value)} placeholder="Ej: Convención Viena 1961" style={{width:"100%", padding:14, marginTop:20, border:"1px solid #ddd", borderRadius:8}} />
      <input type="file" accept=".pdf" onChange={e=>setFile(e.target.files?.[0]||null)} style={{marginTop:16}} />
      {file && <p style={{fontSize:12, color:"green", marginTop:8}}>✓ {file.name}</p>}
      <button onClick={subir} disabled={loading} style={{width:"100%", marginTop:20, padding:16, background: loading?"#ccc":"#0a5c36", color:"white", borderRadius:8, fontWeight:800, fontSize:16}}>
        {loading ? "SUBIENDO... ESPERA" : "SUBIR DE VERDAD A LA WEB"}
      </button>
      <a href="/" style={{display:"block", textAlign:"center", marginTop:20, color:"#0a5c36"}}>Ver web principal</a>
    </div>
  )
}
