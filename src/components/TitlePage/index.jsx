import * as S from './style'
import Container from 'components/Container';

const TitlePage = ({ title, subtitle }) => {
  return (
    <Container>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.Content>
    </Container>
  )
}

export default TitlePage;
