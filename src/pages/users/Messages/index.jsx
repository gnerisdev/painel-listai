import { useState, useContext, useEffect } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import NotFoundData from 'components/NotFoundData';
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

  const remove = async (id) => {
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
        <TitlePage 
          title="Recados" 
          subtitle="Mensagens enviadas pelo os convidados"
          align="center" 
        />

         <S.Content>
          {messages.length <= 0 && (
            <NotFoundData 
              text="Nenhuma messagem para o evento..."  
              icon="fa-regular fa-folder-open icon"
            />
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

export default Messages;
