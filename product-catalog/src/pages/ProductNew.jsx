import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';

export default function ProductNew() {
  const { createProduct } = useProducts();
  const navigate = useNavigate();

  const handleCreate = (data) => {
    createProduct(data);
    navigate('/');
  };

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">Alta de componente</p>
          <h1>Nuevo registro</h1>
        </div>
      </div>
      <ProductForm onSubmit={handleCreate} submitLabel="Crear producto" />
    </>
  );
}
