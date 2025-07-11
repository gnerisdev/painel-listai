import Modal from 'components/Modal';

const AlertModal = ({ show, onClose, icon, title, text }) => {
  return (
    <Modal active={show} updateShow={onClose} zIndex={20}>
      <div style={{ textAlign: 'center', maxWidth: 380 }}>
        {icon && <span className={icon} style={{ fontSize: 40 }}></span>}
        <h3>{title}</h3>
        <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </Modal>
  );
};

export default AlertModal;
