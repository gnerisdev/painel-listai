import * as S from './style';

const Button = ({ text, color, margin, onClick }) => {
  return (
    <S.Button style={{ color, margin }} onClick={() => onClick()}>
      { text }
    </S.Button>
  );
};

export default Button;