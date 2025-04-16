import { useState, useEffect, useContext } from 'react';
import CardTitle from "components/CardTitle";
import Container from "components/Container";
import TitlePage from "components/TitlePage";
import Header from "components/Header";
import Table from 'components/Table';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Select from 'components/Select';
import Button from 'components/Button';
import { mockApiService } from '../../../services/mockApiServer';
import { AdminContext } from 'contexts/Admin';

import * as S from "./style";

const AddService = () => {
  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AdminContext);
  const [log, setLog] = useState({
    title: null,
    description: null,
    price: null,
    type: null,
    quantity: null
  });
  const [currentService, setCurrentService] = useState({
    title: '',
    description: '',
    price: '',
    active: true,
    type: '',
    quantity: 1
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await mockApiService.get("/admin/services");
        setTableData(response.data.data);
      } catch (err) {
        console.error("Erro ao carregar serviços:", err);
      }
    };
    fetchServices();
  }, []);

  const formatPrice = (value) => {
    const numeric = value.replace(/\D/g, '');
    const float = (parseInt(numeric, 10) / 100).toFixed(2);
    return float.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const formatQuantity = (value) => {
    return value.replace(/\D/g, '').slice(0, 4);
  };

  const openEditModal = (item) => {
    setCurrentService({
      ...item,
      active: item.active ? 'true' : 'false',
    });
    setShowModal(true);
  };

  const validateFields = () => {
    const newLog = { ...log };
    let errorCount = 0;

    if (!currentService.title) {
      newLog.title = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.title = '';
    }

    if (!currentService.description) {
      newLog.description = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.description = '';
    }

    if (!currentService.price) {
      newLog.price = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.price = '';
    }

    if (!currentService.type) {
      newLog.type = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.type = '';
    }

    if (!currentService.quantity) {
      newLog.quantity = '* Campo obrigatório';
      errorCount++;
    } else if (parseInt(currentService.quantity) <= 0) {
      newLog.quantity = '* A quantidade deve ser maior que zero';
      errorCount++;
    } else {
      newLog.quantity = '';
    }

    setLog(newLog);
    return errorCount === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      return;
    }
    setLoading(true);
    try {
      if (currentService.id) {
        const response = await mockApiService.put(`/admin/services/${currentService.id}`, currentService);
        setTableData(prev =>
          prev.map(item => item.id === currentService.id ? response.data.data : item)
        );
      } else {
        const response = await mockApiService.post("/admin/services", currentService);
        setTableData(prev => [...prev, response.data.data]);
      }

      setShowModal(false);
      setCurrentService({
        title: '',
        description: '',
        price: '',
        active: true,
        type: '',
        quantity: 1
      });
      setAlert({
        show: true,
        title: 'Sucesso',
        type: 'success',
        text: `Serviço ${currentService.id ? 'atualizado' : 'adicionado'} com sucesso!`,
      });
    } catch (err) {
      console.error("Erro ao salvar serviço:", err);
      setAlert({
        show: true,
        title: 'Erro',
        type: 'error',
        text: `Falha ao ${currentService.id ? 'atualizar' : 'adicionar'} serviço.`,
      });

    }
  };

  const handleDelete = async (item) => {
    const confirm = window.confirm(`Deseja realmente deletar o serviço "${item.title}"?`);
    if (confirm) {
      try {
        await mockApiService.delete(`/admin/services/${item.id}`);
        setTableData(prev => prev.filter(i => i.id !== item.id));
        setAlert({
          show: true,
          title: 'Sucesso',
          type: 'success',
          text: `Serviço deletado com sucesso!`,
        });
      } catch (err) {
        console.error("Erro ao deletar serviço:", err);
        setAlert({
          show: true,
          title: 'Erro',
          type: 'error',
          text: `Falha ao deletar serviço.`,
        });
      }
    }
  };

  return (
    <Container>
      <Header />
      <TitlePage
        title="Serviços"
        icon="fa-solid fa-toolbox"
      />

      <S.ButtonGroup>
        <CardTitle
          title="Adicionar Novo Serviço" // Corrigido aqui
          icon="fa-solid fa-toolbox"
          color="#ff6b6b"
          onClick={() => {
            setCurrentService({
              title: '',
              description: '',
              price: '',
              active: true,
              type: '',
              quantity: 1
            });
            setShowModal(true);
          }}
        />
      </S.ButtonGroup>

      <S.SectionHeader>
        <h3>Meus Serviços</h3>
      </S.SectionHeader>

      <Table
        data={tableData.map(item => ({
          ...item,
          activeText: item.active ? 'Ativo' : 'Desativado', // campo só pra mostrar
        }))}
        columns={[
          { label: 'Título', name: 'title' },
          { label: 'Descrição', name: 'description' },
          { label: 'Preço', name: 'price' },
          { label: 'Ativo', name: 'activeText' },
          { label: 'Tipo', name: 'type' },
          { label: 'Quantidade', name: 'quantity' },
        ]}
        showOptions={true}
        actions={[
          {
            label: 'Deletar',
            onClick: handleDelete,
          },
          {
            label: 'Editar informações',
            onClick: openEditModal,
          },
        ]}
      />


      <Modal
        active={showModal}
        updateShow={() => setShowModal(false)}
        background="#fff"
        color="#000"
      >
        <TitlePage
          title="Editar Serviço"
          icon="fa-solid fa-pen-to-square"
        />

        <S.WrapperForm>
          <Input
            label="Título"
            type="text"
            value={currentService.title}
            check={log.title === ''}
            messageError={log.title}
            onChange={(value) => {
              setCurrentService({ ...currentService, title: value });
              value === ''
                ? setLog({ ...log, title: '* Campo obrigatório' })
                : setLog({ ...log, title: '' });
            }}
          />

          <Input
            label="Descrição"
            type="text"
            value={currentService.description}
            check={log.description === ''}
            messageError={log.description}
            onChange={(value) => {
              setCurrentService({ ...currentService, description: value });
              value === ''
                ? setLog({ ...log, description: '* Campo obrigatório' })
                : setLog({ ...log, description: '' });
            }}
          />

          <Input
            label="Preço"
            type="text"
            value={currentService.price}
            check={log.price === ''}
            messageError={log.price}
            onChange={(value) => {
              const formatted = formatPrice(value);
              setCurrentService(prev => ({ ...prev, price: formatted }));
              formatted === ''
                ? setLog({ ...log, price: '* Campo obrigatório' })
                : setLog({ ...log, price: '' });
            }}
          />

          <Select
            label="Tipo"
            value={currentService.type}
            check={log.type === ''}
            messageError={log.type}
            data={[
              { title: 'Adicionar imagem', value: 'add_image' },
              { title: 'Adicionar vídeo', value: 'add_video' },
              { title: 'Proteger com senha', value: 'password_lock' },
            ]}
            onChange={(value) => {
              setCurrentService({ ...currentService, type: value });
              value === ''
                ? setLog({ ...log, type: '* Campo obrigatório' })
                : setLog({ ...log, type: '' });
            }}
          />

          <Input
            label="Quantidade"
            type="text"
            value={currentService.quantity}
            check={log.quantity === ''}
            messageError={log.quantity}
            onChange={(value) => {
              const formatted = formatQuantity(value);
              setCurrentService(prev => ({ ...prev, quantity: formatted }));

              if (formatted === '') {
                setLog({ ...log, quantity: '* Campo obrigatório' });
              } else if (parseInt(formatted) <= 0) {
                setLog({ ...log, quantity: '* A quantidade deve ser maior que zero' });
              } else {
                setLog({ ...log, quantity: '' });
              }
            }}
          />

          <Select
            label="Ativo"
            value={String(currentService.active)} 
            data={[
              { title: 'Ativo', value: 'true' },
              { title: 'Desativado', value: 'false' },
            ]}
            onChange={(value) =>
              setCurrentService({ ...currentService, active: value === 'true' }) 
            }
          />


          <Button text={loading ? "Salvando..." : "Salvar"} onClick={handleSave} disabled={loading} />
        </S.WrapperForm>
      </Modal>
    </Container>
  );
};

export default AddService;
