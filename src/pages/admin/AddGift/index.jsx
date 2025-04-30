import { useContext, useEffect, useState } from 'react';
import { AdminContext } from 'contexts/Admin';
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const { apiService, setAlert } = useContext(AdminContext);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get('/admin/event-categories');
        setEventTypes(response.data.map(item => ({
          title: item.name,
          value: item.id.toString()
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [apiService]);

  const cleanFields = () => {
    setName('');
    setValue('');
    setQuantity(1);
    setSelectedItemId('');
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    try {
      if (!name || !value || !selectedItemId || !selectedImage) {
        setAlert({ show: true, title: 'Erro', text: 'Preencha todos os campos obrigatórios!' });
        return;
      }
      const data = {
        name: name,
        value: value,
        quantity: quantity === 'Ilimitado' ? -1 : quantity,
        categoryId: selectedItemId,
        image: selectedImage,
      };
      const response = await apiService.post('/admin/gifts', data);
      if (!response.data.success) {
        cleanFields();
        setAlert({ show: true, title: 'Sucesso', text: 'Presente adicionado com sucesso!' });
      }
    } catch (error) {
      console.log(error);
      setAlert({ show: true, title: 'Erro', text: 'Ocorreu um erro ao adicionar o presente. Por favor, tente novamente.' });
    } finally {
    }
  };
  const handleImageUpload = (image) => {
    setSelectedImage(image);
  };
  const handleSelectChange = (value) => {
    setSelectedItemId(value);
  };

  return (
    <Container >
      <Header />
      <TitlePage
        title="Lista de Presentes"
        icon="fa-solid fa-gift"
      />
      <S.ContainerRow>
        <UploadImage onFileUpload={handleImageUpload} />
        <S.ContainerColumn>
          <Select
            label="Categoria de presente"
            data={eventTypes}
            value={selectedItemId}
            onChange={handleSelectChange}
            messageError={selectedItemId ? '' : 'Por favor, selecione uma opção'}
          />
          <Input
            label="Nome do presente"
            placeholder="Digite o nome do presente"
            type="text"
            check={name !== ''}
            onChange={(val) => setName(val)}
            messageError={name === '' ? 'Por favor, preencha este campo' : ''}
          />
          <Input
            label="Valor do presente"
            placeholder="Digite o valor do presente"
            type="text"
            check={value !== ''}
            onChange={(val) => setValue(val)}
            messageError={value === '' ? 'Por favor, preencha este campo' : ''}
          />
          <S.ContainerQuantity>
            <Input
              label="Quantidade"
              placeholder="Digite a quantidade"
              type="text"
              value={quantity === -1 ? 'Ilimitado' : quantity}
              onChange={(val) => {
                if (val && val.toLowerCase() === 'ilimitado') {
                  setQuantity(-1);
                } else {
                  const parsed = parseInt(val);
                  setQuantity(isNaN(parsed) ? 0 : parsed);
                }
              }}
              messageError={quantity < -1 ? 'Por favor, preencha este campo' : ''}
            />
            <S.Button
              type="button"
              onClick={() =>
                setQuantity(prev => {
                  const numeric = prev === -1 ? 0 : prev;
                  const next = numeric - 1;
                  return next < 0 ? -1 : next;
                })}
              className="fa-solid fa-minus"
            />
            <S.Button
              type="button"
              onClick={() =>
                setQuantity(prev => {
                  if (prev === -1) return 0;
                  return prev + 1;
                })}
              className="fa-solid fa-plus"
            />
          </S.ContainerQuantity>
        </S.ContainerColumn>
      </S.ContainerRow>
      <S.ContainerButton>
        <Button
          text="Salvar Presente"
          type="button"
          onClick={handleSubmit}
        />
      </S.ContainerButton>
    </Container>
  );
};

export default AddGift;