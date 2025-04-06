import { useState } from 'react';
import Container from "components/Container";
import TitlePage from "components/TitlePage";
import Header from "components/Header";
import UploadImage from "components/UploadImage";
import Input from "components/Input";
import Button from "components/Button";
import Select from "components/Select";
import * as S from './style';

const AddGift = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState('');
  
  const optionsData = [
    { title: 'Opção 1', value: '1' },
    { title: 'Opção 2', value: '2' },
    { title: 'Opção 3', value: '3' }
  ];

  const handleSubmit = () => {
  };
  const handleImageUpload = (image) => {
    console.log("Uploaded image:", image);
  }
   const handleSelectChange = (value) => {
    setSelectedItemId(value);
    console.log('Item selecionado:', value);
  };

  return (
    <Container >
      <Header />
      <TitlePage
        title="Lista de Presentes"
        icon="fa-solid fa-gift"
      />
      <S.ContainerRow>
        <UploadImage />
        <S.ContainerColumn>
          <Select
            label="Tipo de presente"
            data={optionsData}
            value={selectedItemId}
            onChange={handleSelectChange}
            messageError={selectedItemId ? '' : 'Por favor, selecione uma opção'}
            onBlur={(value) => console.log('Blur event:', value)}
            required
          />
          <Input
            label="Nome do presente"
            placeholder="Digite o nome do presente"
            type="text"
            required
          />
          <Input
            label="Valor do presente"
            placeholder="Digite o valor do presente"
            type="text"
            required
          />
          <S.ContainerQuantity>
            <Input
              label="Quantidade"
              placeholder="Digite a quantidade"
              type="text"
              value={quantity}
              required
            />
            <S.Button onClick={() =>
              setQuantity(prev => {
                if (typeof prev === 'string') return prev;
                const next = prev - 1;
                return next < 0 ? 'Ilimitado' : next;
              })}
              className="fa-solid fa-minus" />
            <S.Button onClick={() =>
              setQuantity(prev => {
                if (prev === 'Ilimitado') return 0; // se for Infinito, volta pro 0
                return prev + 1;
              })}
              className="fa-solid fa-plus" />
          </S.ContainerQuantity>
        </S.ContainerColumn>
      </S.ContainerRow>
      <S.ContainerButton>
        <Button
          text="Salvar Presente"
          type="submit"
        />
      </S.ContainerButton>
    </Container>
  );
};

export default AddGift;