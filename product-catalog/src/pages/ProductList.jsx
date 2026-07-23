import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';

const STOCK_BAJO_LIMITE = 10;

export default function ProductList() {
  const { products, createProduct, updateProduct, deleteProduct } = useProducts();

  // modalMode: null | 'nuevo' | 'ver' | 'editar' -> controla qué modal se muestra
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);

  // filtro activo: si es true, solo se listan los productos con stock bajo
  const [soloStockBajo, setSoloStockBajo] = useState(false);

  const lowStockProducts = products.filter((p) => p.stock <= STOCK_BAJO_LIMITE);
  const visibleProducts = soloStockBajo ? lowStockProducts : products;

  const closeModal = () => {
    setModalMode(null);
    setSelected(null);
  };

  const handleDelete = (id, nombre) => {
    if (confirm(`¿Eliminar "${nombre}" del inventario?`)) {
      deleteProduct(id);
    }
  };

  const handleCreate = (data) => {
    createProduct(data);
    closeModal();
  };

  const handleUpdate = (data) => {
    updateProduct(selected.id, data);
    closeModal();
  };

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">Productos electrónicos</p>
          <h1>Listado de inventario</h1>

          {/* Contadores clickeables: "Productos" quita el filtro, "Stock bajo" lo activa */}
          <div className="stats-row">
            <button
              type="button"
              className={`stat-chip${!soloStockBajo ? ' active' : ''}`}
              onClick={() => setSoloStockBajo(false)}
            >
              <span className="stat-chip-value">{products.length}</span>
              <span className="stat-chip-label">Productos</span>
            </button>
            <button
              type="button"
              className={`stat-chip warn${soloStockBajo ? ' active' : ''}`}
              onClick={() => setSoloStockBajo(true)}
            >
              <span className="stat-chip-value">{lowStockProducts.length}</span>
              <span className="stat-chip-label">Stock bajo</span>
            </button>
          </div>
        </div>

        {/* Botón "Nuevo" al lado del contador, en vez de en la barra superior */}
        <button className="btn btn-primary" onClick={() => setModalMode('nuevo')}>
          + Nuevo producto
        </button>
      </div>

      {soloStockBajo && (
        <div className="filter-banner">
          Mostrando solo productos con stock bajo.
          <button className="link-btn" onClick={() => setSoloStockBajo(false)}>Quitar filtro</button>
        </div>
      )}

      {visibleProducts.length === 0 ? (
        <p className="empty-state">
          {soloStockBajo
            ? 'No hay productos con stock bajo.'
            : 'No hay productos registrados. Usa "+ Nuevo producto" para crear el primero.'}
        </p>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((p) => (
            <div className="product-card" key={p.id}>
              <div className="card-photo">
                {p.imagen ? (
                  <img src={p.imagen} alt={p.nombre} />
                ) : (
                  <span className="photo-placeholder">Sin foto</span>
                )}
              </div>
              <div className="card-body">
                <span className="card-category">{p.categoria}</span>
                <h3 className="card-title">{p.nombre}</h3>
                <p className="card-sku">{p.sku}</p>
                <div className="card-meta">
                  <span className="card-price">${Number(p.precio).toFixed(2)} USD</span>
                  <span className={`stock-pill${p.stock <= STOCK_BAJO_LIMITE ? ' low' : ''}`}>{p.stock} uds.</span>
                </div>
                <div className="card-actions">
                  {/* Ahora "Ver" y "Editar" abren un modal, no navegan a otra vista */}
                  <button className="link-btn" onClick={() => { setSelected(p); setModalMode('ver'); }}>Ver</button>
                  <button className="link-btn" onClick={() => { setSelected(p); setModalMode('editar'); }}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(p.id, p.nombre)}>Borrar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalMode === 'nuevo' && (
        <Modal title="Nuevo producto" onClose={closeModal}>
          <ProductForm onSubmit={handleCreate} submitLabel="Crear producto" />
        </Modal>
      )}

      {modalMode === 'editar' && selected && (
        <Modal title={`Editar · ${selected.sku}`} onClose={closeModal}>
          <ProductForm initial={selected} onSubmit={handleUpdate} submitLabel="Guardar cambios" />
        </Modal>
      )}

      {modalMode === 'ver' && selected && (
        <Modal title="Ficha del producto" onClose={closeModal}>
          <div className="detail-photo">
            {selected.imagen ? (
              <img src={selected.imagen} alt={selected.nombre} />
            ) : (
              <span className="photo-placeholder">Sin foto</span>
            )}
          </div>
          <h3 className="card-title" style={{ marginTop: 14 }}>{selected.nombre}</h3>
          <p className="card-sku">{selected.sku}</p>
          <div className="detail-body">
            <div className="spec-line"><span>Categoría</span><span>{selected.categoria}</span></div>
            <div className="spec-line"><span>Precio</span><span>${Number(selected.precio).toFixed(2)} USD</span></div>
            <div className="spec-line"><span>Stock</span><span>{selected.stock} unidades</span></div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={() => setModalMode('editar')}>
              Editar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}