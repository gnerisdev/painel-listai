import CardTitle from "components/CardTitle";
import Container from "components/Container";
import TitlePage from "components/TitlePage";
import Header from "components/Header";
import * as S from "./style";

const TypeGift = () => {
  const gifts = [
    { title: "Café da Manhã Beach View", price: "R$ 119,90", icon: "fa-solid fa-mug-hot" },
    { title: "Brinde dos Noivos", price: "R$ 109,90", icon: "fa-solid fa-gift" },
    { title: "Jantar Romântico", price: "R$ 520,00", icon: "fa-solid fa-utensils" },
    { title: "Sunset View Lunch", price: "R$ 129,90", icon: "fa-solid fa-sun" },
  ];

  return (
    <Container>
      <Header />
      <TitlePage
        title="Minha Lista de Presentes em Dinheiro"
        icon="fa-solid fa-gift"
      />

      <S.ButtonGroup>
        <CardTitle
          title="Adicionar Novos Presentes"
          text="R$ 0,00"
          icon="fa-solid fa-gift"
          color="#ff6b6b"
          onClick={() => console.log('Criar Lista de Presentes')}
        />

      </S.ButtonGroup>

      <S.SectionHeader>
        <h3>Minha Lista</h3>
        <S.SortContainer>
          <span>Ordenar Por</span>
          <S.SortSelect>
            <option value="J">J</option>
            <option value="A">A</option>
            <option value="Z">Z</option>
          </S.SortSelect>
        </S.SortContainer>
      </S.SectionHeader>

      <S.GiftsList>
        {gifts.map((gift, index) => (
          <CardTitle
            key={index}
            title={gift.title}
            text={gift.price}
            icon={gift.icon}
            color="#ff6b6b"
            onClick={() => console.log('Selected:', gift.title)}
          />
        ))}
      </S.GiftsList>
    </Container>
  );
};

export default TypeGift;