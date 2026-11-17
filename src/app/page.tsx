"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gqnrpmpgpenwplphpyvv.supabase.co",
  "sb_publishable_d7mqpIL6i46JAQe2gzdurg_dGFl5Yi0"
);

export default function Page() {
  const [docs, setDocs] = useState<any[]>([]);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("Oficial");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [buscar, setBuscar] = useState("");

  async function cargar() {
    const { data } = await supabase.from("documentos").select("*").order("created_at", { ascending: false });
    if (data) setDocs(data);
  }
  useEffect(() => { cargar(); }, []);

  async function subir() {
    if (!titulo || !file) return alert("Pon título y archivo");
    setLoading(true);
    try {
      const name = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const { error: upErr } = await supabase.storage.from("documentos").upload(name, file);
      if (upErr) throw new Error(upErr.message);
      const { data } = supabase.storage.from("documentos").getPublicUrl(name);
      const { error: dbErr } = await supabase.from("documentos").insert({
        titulo, descripcion: desc, categoria: cat,
        archivo_url: data.publicUrl, nombre_archivo: name, tamano: file.size
      });
      if (dbErr) throw new Error(dbErr.message);
      setTitulo(""); setDesc(""); setFile(null); alert("¡Subido!");
      cargar();
    } catch (e: any) { alert(e.message); }
    setLoading(false);
  }

  async function eliminar(id: string, nombre: string) {
    if (!confirm("¿Eliminar?")) return;
    await supabase.storage.from("documentos").remove([nombre]);
    await supabase.from("documentos").delete().eq("id", id);
    cargar();
  }

  const filtrados = docs.filter(d => 
    d.titulo.toLowerCase().includes(buscar.toLowerCase()) ||
    (d.descripcion||"").toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-red-600 rounded-xl flex items-center justify-center text-white font-bold">R</div>
            <div><h1 className="font-bold text-lg leading-none">RUGE-EG</h1><p className="text-xs text-gray-500">Gestor Documental Guinea Ecuatorial</p></div>
          </div>
          <div className="text-xs flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Supabase Conectado</div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border h-fit">
          <h2 className="font-bold mb-4">📤 Subir Documento</h2>
          <div className="space-y-3">
            <input value={titulo} onChange={e=>setTitulo(e.target.value)} placeholder="Título" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descripción" rows={2} className="w-full border rounded-xl px-4 py-3 text-sm"></textarea>
            <select value={cat} onChange={e=>setCat(e.target.value)} className="w-full border rounded-xl px-4 py-3 text-sm">
              <option>Oficial</option><option>Administrativo</option><option>Educativo</option><option>Legal</option><option>Otros</option>
            </select>
            <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full text-sm" />
            {file && <p className="text-xs text-blue-600">{file.name}</p>}
            <button onClick={subir} disabled={loading} className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold hover:bg-blue-700">
              {loading ? "Subiendo..." : "Subir Ahora"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border">
          <input value={buscar} onChange={e=>setBuscar(e.target.value)} placeholder="Buscar..." className="w-full border rounded-xl px-4 py-2.5 text-sm mb-4" />
          <p className="text-xs text-gray-500 mb-3">{filtrados.length} documentos</p>
          <div className="grid gap-3">
            {filtrados.map(d=>(
              <div key={d.id} className="border rounded-xl p-4 flex gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">📄</div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 items-center"><h3 className="font-bold text-sm truncate">{d.titulo}</h3><span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{d.categoria}</span></div>
                  <p className="text-xs text-gray-500 truncate">{d.descripcion} • {new Date(d.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1">
                  <a href={d.archivo_url} target="_blank" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">⬇️</a>
                  <button onClick={()=>eliminar(d.id, d.nombre_archivo)} className="w-8 h-8 bg-red-50 text-red-600 rounded-lg">🗑️</button>
                </div>
              </div>
            ))}
            {filtrados.length===0 && <p className="text-center text-gray-400 py-10">No hay documentos aún</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
