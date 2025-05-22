import { useEffect, useState, useRef } from "react";
import * as S from "./style";

const Modal = ({
  children,
  active,
  updateShow,
  background,
  color,
  closeOut = true,
  zIndex = 10,
}) => {
  const [visible, setVisible] = useState(active);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (active) handleScroll(true);
  }, [active]);

  const handleScroll = (active) => {
    if (active) {
      setVisible(true);
      document.body.style.overflowY = "hidden";
    } else {
      setTimeout(() => setVisible(false), 300);
      document.body.style.overflowY = "auto";
    }
  };

  const handleOutsideClick = (e) => {
    if (closeOut) {
      if (modalRef.current && !contentRef.current.contains(e.target)) {
        updateShow(false);
        handleScroll(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    visible && (
      <S.Modal ref={modalRef} className={active ? "show" : "hide"} style={{ zIndex }}>
        <S.Content ref={contentRef} style={background ? { background } : {}}>
          {children}

          <S.ButtonClose 
            onClick={() => {
              updateShow(false);
              handleScroll(false);
            }}
          >
            <span className="fa-solid fa-xmark icon" style={color ? { color } : {}} />
          </S.ButtonClose>
        </S.Content>
      </S.Modal>
    )
  );
};

export default Modal;
