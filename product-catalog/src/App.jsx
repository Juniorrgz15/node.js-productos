import { Routes, Route, NavLink } from 'react-router-dom';
import { ProductProvider, useProducts } from './context/ProductContext';
import ProductList from './pages/ProductList';
import ProductNew from './pages/ProductNew';
import ProductEdit from './pages/ProductEdit';
import ProductDetail from './pages/ProductDetail';
import './App.css';

function Topbar() {
  const { products } = useProducts();
  const lowStock = products.filter((p) => p.stock <= 10).length;

  return (
    <header className="topbar">
      <div className="brand">
        <div>
          <p className="brand-title">ElectroStock</p>
          <p className="brand-sub">Catálogo de productos electrónicos</p>
        </div>
      </div>

      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Productos
        </NavLink>
        <NavLink to="/nuevo" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          + Nuevo
        </NavLink>
      </nav>

      <div className="topbar-stats">
        <div className="pill-stat"><strong>{products.length}</strong> productos</div>
        <div className="pill-stat pill-warn"><strong>{lowStock}</strong> stock bajo</div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <div className="shell">
        <Topbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/nuevo" element={<ProductNew />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/producto/:id/editar" element={<ProductEdit />} />
            <Route path="*" element={<p className="empty-state">Ruta no encontrada.</p>} />
          </Routes>
        </main>
      </div>
    </ProductProvider>
  );
}