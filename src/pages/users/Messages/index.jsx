import { useState, useContext, useEffect } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Header from 'components/Header';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import * as S from './style';

const Messages = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [messages, setMessages] = useState([]);
  const color = event.color;

  const getMessages = async () => {
    try {
      const response = await apiService.get(`/users/messages/${event.id}`);
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

  const deleteGuest = async (id) => {
    try {
      await apiService.delete(`/users/messages/${event.id}/${id}`);
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
        <Header back={-1} background={color} />
        <TitlePage title="Recados" align="center" />

        <S.Content>
          {messages.length <= 0 && (
            <S.Notfound>
              <span class="fa-regular fa-face-frown icon"></span>
              Você ainda não recebeu nenhum... <br />
              divulgue sua lista!
            </S.Notfound>
          )}

          {messages.map((item) => (
            <S.Card key={item.id}>
              <S.Info>
                <strong>
                  {item.firstName} {item.lastName}
                </strong>
                <div>{item.email}</div>
                <div>Mensagem: <p>{item.message}</p></div>
              </S.Info>

              <S.ActionButtons>
                <S.ButtonIcon
                  style={{ background: color }}
                  className="fa-solid fa-trash"
                  onClick={() => deleteGuest(item.id)}
                />
              </S.ActionButtons>
            </S.Card>
          ))}
        </S.Content>
      </Container>
    </main>
  );
};

export default Messages;
