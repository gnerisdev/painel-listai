import { useContext, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from "components/Container";
import TitlePage from "components/TitlePage";
import Input from "components/Input";
import Button from "components/Button";
import Select from "components/Select";
import HeaderWithButton from 'components/HeaderWithButton';
import * as S from './style';

const formatPrice = (value) => {
  const numeric = value.replace(/\D/g, '');
  const float = (parseInt(numeric, 10) / 100).toFixed(2);
  return float.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const parsePrice = (formattedValue) => {
  if (typeof formattedValue === 'number' && formattedValue > 0) {
    return formattedValue;
  }

  if (!formattedValue) return 0;
  const cleanedValue = formattedValue.replace(/\./g, '').replace(',', '.');
  const numericValue = parseFloat(cleanedValue);
  return isNaN(numericValue) ? 0 : numericValue;
};

const ServiceAdd = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { apiService, setAlert } = useContext(AdminContext);
  const [log, setLog] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '0.00',
    type: '',
    quantity: 0
  });

  const validateFields = () => {
    let isValid = true;
    const newLog = {};

    if (!data.name) {
      newLog.name = '* Campo obrigatório';
      isValid = false;
    }
    if (!data.description) {
      newLog.description = '* Campo obrigatório';
      isValid = false;
    }
    if (!data.price) {
      newLog.price = '* Campo obrigatório';
      isValid = false;
    }
    if (!data.type) {
      newLog.type = '* Campo obrigatório';
      isValid = false;
    }

    setLog(newLog);
    return isValid;
  };

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
      const form = {
        name: data.name,
        description: data.description,
        price: parsePrice(data.price),
        type: data.type,
        active: data.active,
        quantity: data.quantity || 0,
      };

      let response;
      if (isEditing && id) {
        response = await apiService.put(`/admin/services/${id}`, form);
      } else {
        response = await apiService.post('/admin/services', form);
      }

      const { success, message } = response.data;

      if (success) {
        setAlert({
          show: true,
          title: 'Sucesso!',
          icon: 'fa-solid fa-check-circle',
          text: isEditing ? 'Serviço atualizado com sucesso.' : 'Serviço criado com sucesso.',
        });

        navigate('/services');
      } else {
        throw new Error(message);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, isEditing ? 'Erro ao atualizar serviço.' : 'Erro ao salvar serviço.'),
      });
    }
  };

  const remove = async () => {
    try {
      const response = await apiService.delete(`/admin/services/${id}`);
      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: 'Tipo de evento removido com sucesso!',
      });

      navigate('/services');
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao remover tipo de evento.'),
      });
    }
  };

  const changeInput = (name, value) => {
    setData({ ...data, [name]: value });
    setLog({ ...log, [name]: '' });
  };

  const handleQuantityChange = (value) => {
    const parsed = parseInt(value);
    setData({ ...data, quantity: isNaN(parsed) ? 0 : parsed });
  };

  const incrementQuantity = () => {
    setData(prev => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decrementQuantity = () => {
    setData(prev => ({ ...prev, quantity: prev.quantity <= 0 ? 0 : prev.quantity - 1 }));
  };

  const getService = useCallback(async () => {
    try {
      const response = await apiService.get(`/admin/services/${id}`);
      const { service, success, message } = response.data;

      if (!success) throw new Error(message);
      if (service) {
        setIsEditing(true);
        setData(service);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar serviço.'),
      });
    }
  }, [apiService, setAlert, id]);

  const getServiceTypes = useCallback(async () => {
    try {
      const response = await apiService.get(`/admin/services/types`);
      const { serviceTypes, success, message } = response.data;
      if (!success) throw new Error(message);
      setServiceTypes(serviceTypes || []);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar serviço.'),
      });
    }
  }, [apiService, setAlert]);

  useEffect(() => {
    getServiceTypes();
    if (id) getService();
  }, [getService, getServiceTypes, id]);

  return (
    <Container>
      <HeaderWithButton>
        <TitlePage
          title={title || (isEditing ? 'Editar Serviço' : 'Adicionar Serviço')}
          icon="fa-solid fa-hand-holding-dollar"
        />

        {isEditing && (
          <Button
            onClick={remove}
            text="<i class='fa-solid fa-trash'></i> Remover serviço"
            maxWidth="200px"
            background="var(--danger-color)"
          />
        )}
      </HeaderWithButton>

      <S.FormContainer>
        <Input
          label="Título"
          placeholder="Nome do serviço (ex: Add de 5 Fotos)"
          value={data.name}
          check={log.name === ''}
          messageError={log.name}
          onChange={(value) => changeInput('name', value)}
        />

        <Input
          label="Descrição"
          type="textarea"
          placeholder="Descrição do objetivo do serviço"
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
          onChange={(value) => changeInput('price', formatPrice(value))}
        />

        <Select
          label="Tipo"
          value={data.type}
          check={log.type === ''}
          messageError={log.type}
          data={serviceTypes}
          onChange={(value) => changeInput('type', value)}
        />

        {isEditing && (
          <Select
            label="Tipo"
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

        <S.ContainerQuantity>
          <Input
            label="Quantidade"
            placeholder="Digite a quantidade"
            type="text"
            value={data.quantity}
            onChange={(value) => handleQuantityChange(value)}
            messageError={data.quantity < 0 ? 'Valor inválido' : ''}
          />
          <S.Button
            type="button"
            onClick={decrementQuantity}
            className="fa-solid fa-minus"
          />
          <S.Button
            type="button"
            onClick={incrementQuantity}
            className="fa-solid fa-plus"
          />
        </S.ContainerQuantity>
        
        <S.WrapperButton>
          <Button text="Salvar" type="button" onClick={save} />
        </S.WrapperButton>
      </S.FormContainer>
    </Container>
  );
};

export default ServiceAdd;