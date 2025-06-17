import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Table from 'components/Table';
import Button from 'components/Button';
import HeaderWithButton from 'components/HeaderWithButton';
import LoadingLogo from 'components/LoadingLogo';
import * as S from './style';

const Services = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const { setAlert, apiService } = useContext(AdminContext);

  const getServices = useCallback(async () => {
    try {
      setLoading(true);

      const response = await apiService.get(`/admin/services`);
      const { services, success, message } = response.data;

      if (!success) throw new Error(message);
      if (services) {
        const servicesData = services.map(item => ({ 
          ...item, 
          title: item.name,
          active: item.active ? 'Ativo' : 'Inativo',
          type: ApplicationUtils.translateServiceType(item.type).toUpperCase(),
          price: ApplicationUtils.formatPrice(item.price) || '-',
        }));

        setServices(servicesData);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar tipos de eventos.'),
      });
    } finally {
      setLoading(false);
    }
  }, [apiService, setAlert]);

  useEffect(() => {
    getServices();
  }, [getServices]);
  
  return (
    <Container>
      <HeaderWithButton>
        <TitlePage title="Serviços" icon="fa-solid fa-hand-holding-dollar" />
        <Button 
          onClick={() => navigate('/services/add' )} 
          text="+ Novo Serviço" 
          maxWidth="200px"
        />
      </HeaderWithButton>
     
      <S.Main>
        <Table
          data={services}
          columns={[
            { label: 'Título', name: 'title' },
            { label: 'Preço', name: 'price' },
            { label: 'Ativo', name: 'active' },
            { label: 'Tipo', name: 'type' },
            { label: 'Quantidade', name: 'quantity' },
          ]}
          showOptions={true}
          actions={[
            { 
              label: '<i class="fa-solid fa-pen"></i> Editar Informações', 
              onClick: (row) => navigate('/services/' + row.id ) 
            },
          ]}
        />
      </S.Main>

      {loading && <LoadingLogo />}
    </Container>
  );
};

export default Services;
