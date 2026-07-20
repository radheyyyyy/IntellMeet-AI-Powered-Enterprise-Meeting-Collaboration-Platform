export default function Modal({ title, children, onClose }) {
  return <div className="modal-layer" role="dialog" aria-modal="true"><button className="backdrop" aria-label="Close" onClick={onClose} /><section className="modal"><div className="modal-header"><h2>{title}</h2><button className="icon-button" onClick={onClose}>×</button></div>{children}</section></div>;
}
