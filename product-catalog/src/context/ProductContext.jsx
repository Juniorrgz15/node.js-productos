import { createContext, useContext, useState } from 'react';

const ProductContext = createContext(null);

const initialProducts = [
  { id: 1, nombre: 'Auriculares Inalámbricos AX-200', categoria: 'Audio', precio: 89.99, stock: 34, sku: 'AX-200-BLK' },
  { id: 2, nombre: 'Teclado Mecánico Vortex K7', categoria: 'Periféricos', precio: 129.5, stock: 12, sku: 'VTX-K7-RGB' },
  { id: 3, nombre: 'Monitor Curvo 27" QHD', categoria: 'Pantallas', precio: 349.0, stock: 8, sku: 'MON-27Q-CV' },
  { id: 4, nombre: 'Power Bank 20000mAh', categoria: 'Energía', precio: 45.0, stock: 60, sku: 'PB-20K-USB' },
  { id: 5, nombre: 'Cámara Web 4K Pro', categoria: 'Video', precio: 79.99, stock: 21, sku: 'CAM-4KP-01' },
];

let nextId = initialProducts.length + 1;

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  const createProduct = (data) => {
    setProducts((prev) => [...prev, { id: nextId++, ...data }]);
  };

  const updateProduct = (id, data) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProduct = (id) => products.find((p) => p.id === Number(id));

  return (
    <ProductContext.Provider
      value={{ products, createProduct, updateProduct, deleteProduct, getProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts debe usarse dentro de ProductProvider');
  return ctx;
}
