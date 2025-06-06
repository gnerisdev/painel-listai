import { useEffect, useState, useRef } from 'react';
import * as S from './style';

const Modal = ({ children, active, updateShow, background }) => {
  const [visible, setVisible] = useState(active);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (active) {
      setVisible(true);
      document.body.style.overflowY = 'hidden';
    } else {
      setTimeout(() => setVisible(false), 300);
      document.body.style.overflowY = 'auto';
    }
  }, [active]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !contentRef.current.contains(e.target)) {
      updateShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick); 

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick); 
    };
  }, []);

  return (
    visible && (
      <S.Modal ref={modalRef} className={active ? 'show' : 'hide'}>
        <S.Content ref={contentRef} style={background ? { background } : {}}>
          {children}

          <S.ButtonClose onClick={() => updateShow(false)}>
            <span className="fa-solid fa-xmark"></span>
          </S.ButtonClose>
        </S.Content>
      </S.Modal>
    )
  );
};

export default Modal;
