import { useState, useContext, useCallback, useEffect } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import FormContainer from 'components/FormContainer';
import ConfirmAction from 'components/ConfirmAction';
import TitlePage from 'components/TitlePage';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Select from 'components/Select';
import * as S from './style';

const initialData = { name: '', description: '', eventTypeId: null };

const FormEventCategoryModal = ({ categoryToEdit, selectedTypeId, open, onClose, onUpdate }) => {
  const { apiService, setAlert } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState({});
  const [data, setData] = useState({ ...initialData });
  const [eventTypes, setEventTypes] = useState([]);

  const changeInput = useCallback((name, value) => {
    setData((prevFormCategory) => ({ ...prevFormCategory, [name]: value }));
    setLog((prevLog) => ({
      ...prevLog,
      [name]: value?.trim() ? '' : '* Campo obrigatório',
    }));
  }, []);

  const getTypes = async () => {
    try {
      const response = await apiService.get(`/admin/event-types`);
      const { success, message, eventTypes } = response.data;

      if (!success) throw new Error(message);
      setEventTypes(eventTypes);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao editar categoria.')
      });
      onClose();
    }
  };

  const validateFormCategory = () => {
    const newLog = {};
    let errorCount = 0;
    const fieldsToCheck = ['name', 'description'];

    fieldsToCheck.forEach((field) => {
      if (!data[field] || data[field].trim() === '') {
        newLog[field] = '* Campo obrigatório';
        errorCount++;
      } else {
        newLog[field] = '';
      }
    });

    setLog({ ...log, ...newLog });
    return errorCount === 0;
  };

  const saveForm = async () => {
    if (!validateFormCategory() || !data.eventTypeId) return;

    setLoading(true);

    try {
      let response;

      if (categoryToEdit) {
        response = await apiService.put(`/admin/event-categories/${categoryToEdit.id}`, data);
      } else {
        response = await apiService.post(`/admin/event-categories`, data, true);
      }

      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: categoryToEdit ? 'Categoria atualizada com sucesso!' : 'Categoria salva com sucesso!',
      });

      onUpdate();
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao salvar categoria.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    setLoading(true);
    try {
      const response = await apiService.delete(`/admin/event-categories/${categoryToEdit.id}`);
      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: 'Categoria removida com sucesso!',
      });

      onUpdate();
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao remover categoria.'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLog({});

    if (categoryToEdit) {
      setData({ ...categoryToEdit });
      return;
    }

    if (selectedTypeId) {
      setData({ eventTypeId: selectedTypeId });
      return;
    }

    setData({ ...initialData });
  }, [open, categoryToEdit, selectedTypeId]);

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <Modal active={open} updateShow={onClose} closeOut={false}>
      <TitlePage
        title={categoryToEdit ? 'Editar Categoria' : 'Nova Categoria'}
        icon="fa-solid fa-tag"
      />

      <FormContainer margin="32px 0 0">
        <Input
          label="Nome"
          type="text"
          value={data.name}
          messageError={log.name}
          onChange={(value) => changeInput('name', value)}
        />

        <Input
          label="Descrição"
          type="text"
          value={data.description}
          messageError={log.description}
          onChange={(value) => changeInput('description', value)}
        />

        {categoryToEdit && (
          <Select
            label="Ativo"
            type="text"
            value={data.active}
            onChange={(value) => changeInput('active', value)}
            data={[
              { title: 'Ativo', value: true },
              { title: 'Inativo', value: false },
            ]}
          />
        )}

        <Select
          label="Tipo de evento"
          type="text"
          value={data.eventTypeId}
          onChange={(value) => changeInput('eventTypeId', value)}
          data={eventTypes.map((item) => ({
            title: item.name,
            value: item.id,
          }))}
        />

        <Button
          isLoading={loading}
          text={categoryToEdit ? 'Atualizar' : 'Salvar'}
          onClick={saveForm}
        />

        {categoryToEdit && (
          <ConfirmAction
            text="Deseja mesmo excluir este tipo de evento?"
            onConfirm={remove}
          >
            <S.ButtonLink type="button">
              <i className="fa-solid fa-xmark"></i> Remover
            </S.ButtonLink>
          </ConfirmAction>
        )}
      </FormContainer>
    </Modal>
  );
};

export default FormEventCategoryModal;
