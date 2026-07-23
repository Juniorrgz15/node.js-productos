import { Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import ProductList from './pages/ProductList';
import './App.css';

// Barra superior: ahora solo muestra la marca. La navegación
// entre "ver / crear / editar" pasó a manejarse con modales
// dentro de ProductList, así que ya no hace falta un menú aquí.
function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <div>
          <p className="brand-title">ElectroStock</p>
          <p className="brand-sub">Catálogo de productos electrónicos</p>
        </div>
      </div>
    </header>
  );
}

// Sigue usando React Router (requisito de la tarea), aunque ahora
// solo hay una ruta real porque todo el CRUD vive en modales.
export default function App() {
  return (
    <ProductProvider>
      <div className="shell">
        <Topbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="*" element={<p className="empty-state">Ruta no encontrada.</p>} />
          </Routes>
        </main>
      </div>
    </ProductProvider>
  );
}