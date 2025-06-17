import * as S from './style';

const BoxNumber = ({ number, text }) => {
  return (
    <S.BoxNumber>
      <h3 className="number">{number}</h3>
      <p className="text">{text}</p>
    </S.BoxNumber>
  );
};

export default BoxNumber;