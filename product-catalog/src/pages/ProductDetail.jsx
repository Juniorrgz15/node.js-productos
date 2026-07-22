import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const product = getProduct(id);

  if (!product) {
    return (
      <>
        <p className="empty-state">Ese producto ya no existe en el inventario.</p>
        <Link className="link-btn" to="/">Volver al listado</Link>
      </>
    );
  }

  const handleDelete = () => {
    if (confirm(`¿Eliminar "${product.nombre}" del inventario?`)) {
      deleteProduct(product.id);
      navigate('/');
    }
  };

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">Ficha técnica</p>
          <h1>Detalle de producto</h1>
        </div>
      </div>

      <div className="detail-sheet">
        <div className="detail-photo">
          {product.imagen ? (
            <img src={product.imagen} alt={product.nombre} />
          ) : (
            <span className="photo-placeholder">Sin foto</span>
          )}
        </div>
        <div className="detail-head">
          <h2 style={{ margin: 0 }}>{product.nombre}</h2>
          <p>{product.sku}</p>
        </div>
        <div className="detail-body">
          <div className="spec-line"><span>Categoría</span><span>{product.categoria}</span></div>
          <div className="spec-line"><span>Precio</span><span>${Number(product.precio).toFixed(2)}</span></div>
          <div className="spec-line"><span>Stock</span><span>{product.stock} unidades</span></div>
        </div>
        <div className="detail-actions">
          <Link className="btn btn-primary" to={`/producto/${product.id}/editar`}>Editar</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
          <Link className="link-btn" to="/">Volver</Link>
        </div>
      </div>
    </>
  );
}
