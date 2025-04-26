import { useEffect, useState, useContext } from "react";
import { UsersContext } from "contexts/Users";
import { ApplicationUtils } from "utils/ApplicationUtils";
import Header from "components/Header";
import FormContainer from "components/FormContainer";
import Button from "components/Button";
import TitlePage from "components/TitlePage";
import Container from "components/Container";
import ListGifts from "components/ListGifts";
import Input from "components/Input";
import Modal from "components/Modal";
import * as S from "./style";

const Gifts = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [modalSuggestion, setModalSuggestion] = useState(false);
  const [suggestion, setSuggestion] = useState({ title: "", description: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [gifts, setGifts] = useState([]);

  const getGifts = async () => {
    try {
      const { data } = await apiService.get(`/users/gifts/${event.id}`);
      if (!data.success) throw new Error(data.message);
      if (data.gifts) setGifts(data.gifts);
      if (data.giftSuggestions) setSuggestions(data.giftSuggestions);
    } catch (error) {
      setAlert({
        show: true,
        title: "Erro!",
        icon: "fa-solid fa-triangle-exclamation",
        text: ApplicationUtils.getErrorMessage(
          error,
          "Erro ao recuperar lista de presentes."
        ),
      });
    }
  };

  const saveSuggestion = async () => {
    try {
      setLoading(true);

      if (!suggestion.title) throw new Error("Preencha o título!");

      const { data } = await apiService.post(
        `/users/gifts/suggestion/${event.id}`,
        { ...suggestion }
      );

      if (!data.success) throw new Error(data.message);
      if (data.giftSuggestions) setSuggestion(data.giftSuggestions);

      setAlert({
        show: true,
        title: "Sucesso!",
        text: "Sugestão criada.",
        icon: "fa-solid fa-check",
      });

      setModalSuggestion(false);
    } catch (error) {
      console.log(error)
      setAlert({
        show: true,
        title: "Erro!",
        icon: "fa-solid fa-triangle-exclamation",
        text: ApplicationUtils.getErrorMessage(error, "Erro ao salvar sugestão."),
      });
    } finally {
      setLoading(false);
    }
  };

  const removeGift = async (giftId) => {
    try {
      const { data } = await apiService.delete(
        `/users/gifts/${event.id}/${giftId}`
      );
      if (!data.success) throw new Error(data.message);

      if (data.gifts) setGifts(data.gifts);

      setAlert({
        show: true,
        title: "Sucesso!",
        text: "Presente removido com sucesso.",
        icon: "fa-solid fa-check",
      });
    } catch (error) {
      setAlert({
        show: true,
        title: "Erro!",
        icon: "fa-solid fa-triangle-exclamation",
        text: ApplicationUtils.getErrorMessage(
          error,
          "Erro ao remover presente."
        ),
      });
    }
  };

  useEffect(() => {
    getGifts();
  }, []);

  return (
    <main style={{ marginTop: 70 }}>
      <Container>
        <Header back={-1} background={event.color} />

        <TitlePage
          title="Lista de Presentes"
          subtitle="Minha Lista de Presentes em Dinheiro"
          align="center"
        />

        <FormContainer margin="2rem auto">
          {gifts?.length > 0 && (
            <ListGifts
              data={gifts || []}
              selected={[]}
              mode="edit"
              getData={(value) => removeGift(value)}
            />
          )}

          <section style={{ margin: "1rem 0" }}>
            <TitlePage
              title="Adicionar Sugestões de Presente"
              subtitle="Não encontrou o presente que você queria? Adicione uma sugestão!"
              align="center"
            />

            <Button
              background={event?.color}
              text="Nova sugestão"
              isLoading={loading}
              onClick={() => setModalSuggestion(true)}
            />

            {suggestions.map((suggestion, index) => (
              <S.Card key={`item-${index}`}>
                <S.Title>{suggestion.title}</S.Title>
                <S.Description>{suggestion.description}</S.Description>
              </S.Card>
            ))}

            {/* Modal Suggestion  */}
            <Modal
              active={modalSuggestion}
              updateShow={() => setModalSuggestion(false)}
              background="#fff"
              color="#000"
              closeOut={false}
            >
              <S.TitleModal>
                <i className="fa-solid fa-gift"></i>
                Adicionar Sugestão de Presente
              </S.TitleModal>

              <S.WrapperForm>
                <Input
                  label="Tilulo do Presente"
                  placeholder="Digite o título sugestão de presente..."
                  value={suggestion.title}
                  onChange={(value) =>
                    setSuggestion({ ...suggestion, title: value })
                  }
                />

                <Input
                  type="textarea"
                  label="Descrição de Presente"
                  placeholder="Digite a descrição da sugestão de presente..."
                  value={suggestion.description}
                  onChange={(value) =>
                    setSuggestion({ ...suggestion, description: value })
                  }
                />

                <Button
                  background={event?.color}
                  text="Salvar"
                  onClick={saveSuggestion}
                />
              </S.WrapperForm>
            </Modal>
          </section>
        </FormContainer>
      </Container>
    </main>
  );
};

export default Gifts;
