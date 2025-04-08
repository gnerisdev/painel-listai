import * as S from './style';

const Button = ({ text, color, background, margin, onClick, isLoading }) => {
  return (
    <S.Button
      style={{ color, background, margin }}
      onClick={() => onClick()}
      type="button"
    >
      {isLoading ? <S.Spinner /> : <span dangerouslySetInnerHTML={{ __html: text }} />}
    </S.Button>
  );
};

export default Button;