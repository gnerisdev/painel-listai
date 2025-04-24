/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'components/Container';
import Button from 'components/Button';
import * as S from './style';
import Menu from 'components/MobileMenu';
import TitlePage from 'components/TitlePage';
const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    { path: '/guests/home', label: 'Início' },
    { path: '/guests/confirm', label: 'Confirmar presença' },
    { path: '/guests/gifts', label: 'Lista de presentes' }
  ];
  return (
    <S.Main>

      <Menu menuItems={menuItems} />
      <Container>

        <S.Background src="https://painel.mimon.com.br/assets/images/capa-debutante.jpg" />
        <S.WrapperProfile>
          <S.Avatar>
            <img
              src="https://painel.mimon.com.br/assets/images/debutante-roxo-2.png"
              alt="Imagem de perfil"
            />
          </S.Avatar>
          <S.AvatarTitle>
            <h1>ttttddddddddddd</h1>
            <h2>tttttt</h2>
          </S.AvatarTitle>
        </S.WrapperProfile>
        <S.TextContainer>
          <h2>Sejam bem-vindos!</h2>
          <p>Estamos organizando esse evento com muito amor e carinho.<br />
            Criamos esse espaço para facilitar para todos.</p>

          <p>E para aqueles que querem presentear com um MIMO, criamos uma<br />
            lista de presentes online para evitar dúvidas, economizar tempo e<br />
            incentivar o consumo consciente.</p>

          <p>Por favor, confirmem a presença no site logo abaixo e deixem um
            recadinho!</p>
        </S.TextContainer>
      </Container>
    </S.Main>
  );
};

export default Home;