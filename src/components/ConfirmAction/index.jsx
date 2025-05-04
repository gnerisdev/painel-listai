import { useState } from 'react';
import * as S from './style';

const ConfirmAction = ({ onConfirm, children, text }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setShowConfirm(false);
  };

  return (
    <div>
      <span onClick={() => setShowConfirm(true)} style={{ cursor: 'pointer' }}>
        {children}
      </span>
      {showConfirm && (
        <S.ConfirmBoxOverlay onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false); }}>
          <S.ConfirmBox>
            <S.ConfirmText>{text || 'Confirmar essa ação?'}</S.ConfirmText>
            <S.ButtonContainer>
              <S.Button type="button" onClick={handleConfirm}>Sim, Confirmar</S.Button>
              <S.Button type="button" onClick={() => setShowConfirm(false)} className="cancel">
                Cancelar
              </S.Button>
            </S.ButtonContainer>
          </S.ConfirmBox>
        </S.ConfirmBoxOverlay>
      )}
    </div>
  );
};

export default ConfirmAction;