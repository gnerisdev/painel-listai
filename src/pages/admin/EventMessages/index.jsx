import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import * as S from './style';

const EventMessages = () => {
  const { id } = useParams();
  const { apiService, setAlert } = useContext(AdminContext);
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await apiService.get(`/admin/events/${id}/messages`);
      const { success, messages, message } = response.data;
      if (!success) throw new Error(message);
      if (messages) setMessages(messages);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar recados.'),
      });
    }
  };

  const remove = async (messageId) => {
    try {
      await apiService.delete(`/admin/events/${id}/messages/${messageId}`);
      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: 'Recado removido com sucesso.',
      });

      await getMessages();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao excluir recado.'),
      });
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <main style={{ margin: '72px 0' }}>
      <Container>
        <TitlePage icon="fa-regular fa-message icon" title="Mensagens do evento" />

        <S.Content>
          {messages.length <= 0 && (
            <S.Notfound>
              <span className="fa-regular fa-folder-open icon" />
              Nenhuma messagem para o evento...
            </S.Notfound>
          )}

          <S.Cards>
            {messages.map((item) => (
              <S.Card key={item.id}>
                <S.Info>
                  <small className="data">{ApplicationUtils.formatDate(item.createdAt)}</small>
                  <div>
                    <strong>Enviado por:</strong>
                    <br /> <p>{item.firstName} {item.lastName}</p>
                  </div>
                  <div>
                    <strong>Email:</strong>
                    <br /> <p>{item.email}</p>
                  </div>
                  <div>
                    <strong>Mensagem:</strong>
                    <br /> <p>{item.message}</p>
                  </div>
                </S.Info>

                <S.ActionButtons>
                  <S.ButtonIcon className="fa-solid fa-trash" onClick={() => remove(item.id)} />
                </S.ActionButtons>
              </S.Card>
            ))}
          </S.Cards>
        </S.Content>
      </Container>
    </main>
  );
};

export default EventMessages;
