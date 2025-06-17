import * as S from './style';

const FormContainer = ({ children, margin }) => {
  return (
    <S.FormContainer style={{ margin: margin || '8px 0' }}>
      { children }
    </S.FormContainer>
  );
};

export default FormContainer;
