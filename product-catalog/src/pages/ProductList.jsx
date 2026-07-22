import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export default function ProductList() {
  const { products, deleteProduct } = useProducts();

  const handleDelete = (id, nombre) => {
    if (confirm(`¿Eliminar "${nombre}" del inventario?`)) {
      deleteProduct(id);
    }
  };

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">Productos electrónicos</p>
          <h1>Listado de inventario</h1>
        </div>
        <span className="count-tag">{products.length} registros</span>
      </div>

      {products.length === 0 ? (
        <p className="empty-state">No hay productos registrados. Crea el primero desde "+ Nuevo".</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
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
                  <span className="card-price">${Number(p.precio).toFixed(2)}</span>
                  <span className={`stock-pill${p.stock <= 10 ? ' low' : ''}`}>{p.stock} uds.</span>
                </div>
                <div className="card-actions">
                  <Link className="link-btn" to={`/producto/${p.id}`}>Ver</Link>
                  <Link className="link-btn" to={`/producto/${p.id}/editar`}>Editar</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(p.id, p.nombre)}>
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}