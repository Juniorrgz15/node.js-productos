import { useEffect } from 'react';

// Modal genérico y reutilizable: recibe el título y el contenido (children).
// Se usa tanto para "Nuevo producto" como para "Ver" y "Editar".
export default function Modal({ title, onClose, children }) {
  // Permite cerrar el modal con la tecla Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation para que clickear dentro de la tarjeta no la cierre */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}