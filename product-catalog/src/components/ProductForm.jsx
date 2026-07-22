import { useState, useRef } from 'react';

const CATEGORIAS = ['Audio', 'Periféricos', 'Pantallas', 'Energía', 'Video', 'Computación', 'Redes'];

export default function ProductForm({ initial, onSubmit, submitLabel }) {
  const [form, setForm] = useState(
    initial ?? { nombre: '', categoria: CATEGORIAS[0], precio: '', stock: '', sku: '', imagen: '' }
  );
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, imagen: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setForm((f) => ({ ...f, imagen: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      precio: parseFloat(form.precio) || 0,
      stock: parseInt(form.stock, 10) || 0,
    });
  };

  return (
    <form className="form-sheet" onSubmit={handleSubmit}>
      <div className="field">
        <label>Foto del producto</label>
        <div className="photo-upload">
          <div className="photo-preview">
            {form.imagen ? (
              <img src={form.imagen} alt="Vista previa del producto" />
            ) : (
              <span className="photo-placeholder">Sin foto</span>
            )}
          </div>
          <div className="photo-actions">
            <button type="button" className="btn" onClick={() => fileInputRef.current?.click()}>
              {form.imagen ? 'Cambiar foto' : 'Subir foto'}
            </button>
            {form.imagen && (
              <button type="button" className="btn btn-danger" onClick={handleRemoveImage}>
                Quitar
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} hidden />
          </div>
        </div>
      </div>

      <div className="field">
        <label htmlFor="nombre">Nombre del producto</label>
        <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="categoria">Categoría</label>
          <select id="categoria" name="categoria" value={form.categoria} onChange={handleChange}>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sku">SKU</label>
          <input id="sku" name="sku" value={form.sku} onChange={handleChange} placeholder="EJ-001-XX" required />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="precio">Precio (USD)</label>
          <input id="precio" name="precio" type="number" step="0.01" min="0" value={form.precio} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="stock">Stock</label>
          <input id="stock" name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>
    </form>
  );
}
