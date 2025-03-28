import * as S from './style';

const Button = ({ text, color, margin, onClick, isLoading }) => {
  return (
    <S.Button style={{ color, margin }} onClick={() => onClick()}>
      {isLoading ? <S.Spinner /> : text}
    </S.Button>
  );
};

export default Button;