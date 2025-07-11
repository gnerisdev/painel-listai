import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGlobal } from 'contexts/Global';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { PublicApiService } from 'services/api.public.service';
import Button from 'components/Button';
import * as S from './style';

const publicApi = new PublicApiService();

const Pending = ({ preRegisterInfo }) => {
  const { state } = useLocation();
  const { setAlert } = useGlobal();
  const [loading, setLoading] = useState(false);

  const generatePayment = async () => {
    const email = preRegisterInfo.email;

    if (!email) throw new Error('E-mail não encontrado!');

    try {
      setLoading(true);

      const response = await publicApi.post('/users/pre-register/generate-payment', { email });
      const { success, paymentLink, message } = response.data;

      if (success && paymentLink) window.open(paymentLink, '_blank');
      if (!success) throw new Error(message);
    } catch (e) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: e?.response?.data?.message || 'Erro ao gerar link de pagamento.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.ContentInfo>
      <h3>Informações do Pré-Cadastro</h3>

      <article style={{ margin: '8px 0 12px' }}>
        <p>
          Seu pré-cadastro já foi encontrado em nosso sistema.
          Confira os detalhes abaixo:
        </p>
        <p>
          <strong>OBS.:</strong>
          {' '} Caso já tenha feito o pagamento, é só aguardar a validação!
        </p>
      </article>

      <p><strong>E-mail: </strong> {preRegisterInfo.email}</p>
      <p>
        <strong>Status de Pagamento: </strong>
        {ApplicationUtils.translateTransactiontatus(preRegisterInfo.paymentStatus)}
      </p>

      {preRegisterInfo.paymentStatus?.toUpperCase() === 'PENDING' && (
        <Button
          text='Clique aqui para pagar'
          onClick={() => window.open(preRegisterInfo.paymentLink, '_blank')}
          margin='12px 0 8px'
        />
      )}

      {preRegisterInfo.paymentStatus?.toUpperCase() === 'CANCELLED' && (
        <>
          <br />
          <p>
            <span style={{ color: 'red' }}>** </span>
            Seu pagamento foi cancelado, clique no botão abaixo para gerar um
            novo link de pagamento.
          </p>
          <Button text='Gerar pagamento' onClick={generatePayment} margin='12px 0 8px' />
        </>
      )}
    </S.ContentInfo>
  );
};

export default Pending;