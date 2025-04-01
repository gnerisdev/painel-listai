import * as S from './style'

const TitlePage = ({ title, subtitle, icon }) => {
  return (
    <S.Content>
      <S.Title>
        <S.Icon className={icon} />
        {title}
      </S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
    </S.Content>
  )
}

export default TitlePage
