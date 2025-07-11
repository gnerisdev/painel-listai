import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'components/Container';
import logo from 'assets/logo-2.png';
import Pending from './Pending';
import Approved from './Approved';
import Access from './Access';
import * as S from './style';

const PainelPreRegister = () => {
  const { state } = useLocation();
  const email = state?.email || '';
  const [preRegisterInfo, setPreRegisterInfo] = useState(null);

  return (
    <S.Main>
      <Container>
        <S.Logo src={logo} alt="Logomarca Listai" />

        {!preRegisterInfo 
          ? <Access email={email} getData={setPreRegisterInfo} />
          : (
            <>
              {preRegisterInfo.paymentStatus?.toUpperCase() === 'APPROVED' 
                ? <Approved preRegisterInfo={preRegisterInfo} />
                : <Pending preRegisterInfo={preRegisterInfo} />
              }
            </>
          )
        }
      </Container>
    </S.Main>
  );
};

export default PainelPreRegister;