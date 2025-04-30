import { useEffect, useState, useContext } from "react";
import { UsersContext } from "contexts/Users";
import { ApplicationUtils } from "utils/ApplicationUtils";
import Header from "components/Header";
import TitlePage from "components/TitlePage";
import Container from "components/Container";
import * as S from "./style";

const GiftsReceived = () => {
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
      console.log(error);
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

  useEffect(() => {
    getGifts();
  }, []);

  return (
    <main style={{ marginTop: 70 }}>
      <Container>
        <Header back={-1} background={event.color} />

        <TitlePage title="Meus Presentes" align="center" />

        <S.Content>
          <S.CardContainer>
            <S.Card borderColor="#FF5B5B">
              <S.Amount>R$ 0,00</S.Amount>
              <S.Label>Recebidos</S.Label>
            </S.Card>

            <S.Card borderColor="#FFC107">
              <S.Amount>R$ 0,00</S.Amount>
              <S.Label>Aguardando liberação</S.Label>
            </S.Card>
          </S.CardContainer>

          <S.CardContainer>
            <S.Card borderColor="#4CAF50">
              <S.Amount>R$ 0,00</S.Amount>
              <S.Label>Disponível para saque</S.Label>
            </S.Card>
            <S.WithdrawButton>IR PARA CARTEIRA</S.WithdrawButton>
          </S.CardContainer>

          <S.RadioGroup>
            <div>
              {/* <S.AmountRadioButton type="radio" name="status" defaultChecked /> */}
              <S.RadioLabel>Aprovados / Processando</S.RadioLabel>
            </div>
            <div>
              {/* <S.AmountRadioButton type="radio" name="status" /> */}
              <S.RadioLabel>Não Autorizados</S.RadioLabel>
            </div>
          </S.RadioGroup>

          <S.SectionTitle>Presentes Aprovados / Processando</S.SectionTitle>
          <S.Divider />
        </S.Content>
      </Container>
    </main>
  );
};

export default GiftsReceived;
