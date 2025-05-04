import * as S from './style';

const Button = ({ text, color, background, margin, onClick, maxWidth='100%', isLoading }) => {
  return (
    <S.Button
      style={{ color, background, margin, maxWidth }}
      onClick={() => onClick()}
      type="button"
    >
      {isLoading ? <S.Spinner /> : <span dangerouslySetInnerHTML={{ __html: text }} />}
    </S.Button>
  );
};

export default Button;