import { useContext, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Header from 'components/Header';
import UploadImage from 'components/UploadImage';
import Input from 'components/Input';
import Button from 'components/Button';
import Select from 'components/Select';
import HeaderWithButton from 'components/HeaderWithButton';
import * as S from './style';

const PRICE_REGEX = /^\d+(\,\d{2})?$/;

const GiftAdd = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { apiService, setAlert } = useContext(AdminContext);
  const [log, setLog] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '0,00',
    eventCategoryId: 0,
    active: true,
    image: null,
  });

  const getGift = useCallback(async () => {
    try {
      const response = await apiService.get(`/admin/gifts/${id}`);
      const { gift, success, message } = response.data;

      if (!success) throw new Error(message);
      if (gift) {
        setIsEditing(true);
        setData(gift || {});
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar presente.')
      });
    }
  }, [apiService, setAlert, id]);

  const getCategories = useCallback(async () => {
    try {
      const response = await apiService.get(`/admin/event-categories`);
      const { eventCategories, success, message } = response.data;

      if (!success) throw new Error(message);
      const categories = eventCategories.map((cat) => ({ title: cat.name, value: cat.id })); 
      setCategories(categories);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar categorias de presentes.'),
      });
    }
  }, [apiService, setAlert]);

  const save = async () => {

    if (!validateFields()) {
      setAlert({
        show: true,
        title: 'Atenção!',
        icon: 'fa-solid fa-exclamation-circle',
        text: 'Por favor, preencha todos os campos obrigatórios.',
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', ApplicationUtils.parsePrice(data.price));
      formData.append('eventCategoryId', data.eventCategoryId);
      formData.append('active', data.active);
      if (imageData) formData.append('image', imageData);

      let response;
      if (isEditing && id) {
        response = await apiService.put(`/admin/gifts/${id}`, formData, true);
      } else {
        response = await apiService.post('/admin/gifts', formData, true);
      }

      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check-circle',
        text: isEditing ? 'Presente atualizado com sucesso.' : 'Presente criado com sucesso.',
      });

      navigate('/gifts');
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, isEditing ? 'Erro ao atualizar presente.' : 'Erro ao salvar presente.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      const response = await apiService.delete(`/admin/gifts/${id}`);
      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: 'Presente removido com sucesso!',
      });

      navigate('/gifts');
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao remover presente.'),
      });
    }
  };

  const validateFields = () => {
    let errorCount = 0;
    const newLog = {};

    if (!data.name) {
      newLog.name = '* Campo obrigatório';
      errorCount++;
    }
    if (!data.description) {
      newLog.description = '* Campo obrigatório';
      errorCount++;
    }
    if (!data.price) {
      newLog.price = '* Campo obrigatório';
      errorCount++;
    } else if (ApplicationUtils.parsePrice(data.price) <= 0){
      newLog.price = '* O preço deve ser maior que zero';
    }
    if (!data.eventCategoryId) {
      newLog.eventCategoryId = '* Campo obrigatório';
      errorCount++;
    }
    if (!data.image && !isEditing) {
      newLog.image = '* Envie a imagem';
      errorCount++;
    }

    setLog(newLog);
    return errorCount === 0 ? true : false;
  };

  const changeInput = (name, value) => {
    setData({ ...data, [name]: value });
    setLog({ ...log, [name]: '' });
  };

  const handleImageUpload = (file) => {
    setImageData(file);
    setData((prevData) => ({ ...prevData, image: file ? file.name : null }));
    setLog({ ...log, image: '' });
  };

  useEffect(() => {
    getCategories();
    if (id) getGift();
  }, [getGift, getCategories, id]);

  return (
    <S.Main>
      <Container>
        <Header />

        <HeaderWithButton>
          <TitlePage
            title={title || (isEditing ? 'Editar Presente' : 'Adicionar Presente')}
            icon="fa-solid fa-gift"
          />

          {isEditing && (
            <Button
              onClick={remove}
              text="<i class='fa-solid fa-trash'></i> Remover presente"
              maxWidth="200px"
              background="var(--danger-color)"
            />
          )}
        </HeaderWithButton>

        <S.FormContainer>
          <UploadImage
            onFileUpload={handleImageUpload}
            previewUrl={data.imageUrl}
            messageError={log.image}
          />

          <div className="inputs">
            <Input
              label="Nome do Presente"
              placeholder="Digite o nome do presente"
              value={data.name}
              check={log.name === ''}
              messageError={log.name}
              onChange={(value) => changeInput('name', value)}
            />

            <Input
              label="Descrição"
              type="textarea"
              placeholder="Descrição do presente"
              value={data.description}
              check={log.description === ''}
              messageError={log.description}
              onChange={(value) => changeInput('description', value)}
            />

            <Input
              label="Preço"
              value={data.price}
              check={log.price === ''}
              messageError={log.price}
              onChange={(value) => changeInput('price', ApplicationUtils.formatToInputPrice(value))}
            />

            <Select
              label="Categoria"
              value={data.eventCategoryId}
              check={log.eventCategoryId === ''}
              messageError={log.eventCategoryId}
              data={categories}
              onChange={(value) => changeInput('eventCategoryId', value)}
            />

            {isEditing && (
              <Select
                label="Status"
                value={data.active}
                check={log.active === ''}
                messageError={log.active}
                data={[
                  { title: 'Ativo', value: true },
                  { title: 'Inativo', value: false },
                ]}
                onChange={(value) => changeInput('active', value)}
              />
            )}

            <S.WrapperButton>
              <Button
                text="Salvar Presente"
                type="button"
                onClick={save}
                margin="0 0 0 auto"
                isLoading={loading}
              />
            </S.WrapperButton>
          </div>
        </S.FormContainer>
      </Container>
    </S.Main>
  );
};

export default GiftAdd;
