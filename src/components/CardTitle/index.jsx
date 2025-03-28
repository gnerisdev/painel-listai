import * as S from './style';

const CardTitle = ({ title, text, icon, color, onClick }) => {
  return (
    <S.CardTitle style={{ "--hover-color": color }} onClick={() => onClick()}>
      <S.Content>
        <S.Icon className={`${icon} + icon`} />
        <div className="wrapper-text">
          <h4 className="title">{title}</h4>
          <p className="text">{text}</p>
        </div>
      </S.Content>
    </S.CardTitle>
  );
};

export default CardTitle;