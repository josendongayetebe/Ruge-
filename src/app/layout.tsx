import "../brand-theme.css";
import { brand } from "../brand";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header style={{padding:16, background:'#0a2e1a', color:'white'}}>
          <h1>{brand.name} - {brand.fullName}</h1>
        </header>
        <main style={{padding:24}}>{children}</main>
        <footer style={{padding:16, textAlign:'center'}}>
          MUNI: {brand.muniNumber} | {brand.contact}
        </footer>
      </body>
    </html>
  );
}
