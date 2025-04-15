import * as S from "./style";

const TitlePage = ({ title, subtitle, icon, align }) => {
  return (
    <S.Content style={{ textAlign: align }}>
      <div style={{ 
        display: 'flex', 
        alignItems: align || 'end', 
        justifyContent: align || 'start', 
        gap: 16 
      }}>
        {icon && <S.Icon className={icon} />}
        <S.Title>{title}</S.Title>
      </div>
      {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
    </S.Content>
  );
};

export default TitlePage;
