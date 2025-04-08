import * as S from "./style";

const TitlePage = ({ title, subtitle, icon }) => {
  return (
    <S.Content>
      <div style={{ display: 'flex', alignItems: 'end', gap: 16 }}>
        <S.Icon className={icon} />
        <S.Title>{title}</S.Title>
      </div>
      <S.Subtitle>{subtitle}</S.Subtitle>
    </S.Content>
  );
};

export default TitlePage;
