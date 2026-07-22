import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';

export default function ProductEdit() {
  const { id } = useParams();
  const { getProduct, updateProduct } = useProducts();
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

  const handleUpdate = (data) => {
    updateProduct(product.id, data);
    navigate(`/producto/${product.id}`);
  };

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">Editando · {product.sku}</p>
          <h1>{product.nombre}</h1>
        </div>
      </div>
      <ProductForm initial={product} onSubmit={handleUpdate} submitLabel="Guardar cambios" />
    </>
  );
}
