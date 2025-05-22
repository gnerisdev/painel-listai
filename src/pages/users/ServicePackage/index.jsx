import { useContext } from 'react';
import { UsersContext } from 'contexts/Users';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import ListEventServices from 'components/ListEventServices';
import * as S from './style';

const ServicePackage = () => {
  const { event } = useContext(UsersContext);

  return (
    <S.Main>
      <Container>
        <TitlePage
          title="Pacote de Serviços"
          subtitle="Serviços inclusos e para personalizar ainda mais"
          align="center"
        />

        <ListEventServices />
      </Container>
    </S.Main>
  );
};

export default ServicePackage;