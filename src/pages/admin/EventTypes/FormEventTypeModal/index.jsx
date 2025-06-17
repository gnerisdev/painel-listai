import { useState, useContext, useCallback, useEffect } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import TitlePage from 'components/TitlePage';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import FormContainer from 'components/FormContainer';
import DefaultImage from 'assets/default-image.jpg';
import ConfirmAction from 'components/ConfirmAction';
import * as S from './style';
import Select from 'components/Select';

const initialData = { name: '', description: '', image: null, imagePreview: '' };

const FormEventTypeModal = ({ typeToEdit, open, onClose, onUpdate }) => {
  const { apiService, setAlert } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ ...initialData });
  const [log, setLog] = useState({});

  const changeInput = useCallback((name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
    setLog(prev => ({ ...prev, [name]: value?.trim() ? '' : '* Campo obrigatório' }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setData(prev => ({ ...prev, image: file, imagePreview }));
    }
  }, []);

  const remove = async () => {
    setLoading(true);
    try {
      const response = await apiService.delete(`/admin/event-types/${typeToEdit.id}`);
      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: 'Tipo de evento removido com sucesso!',
      });

      onUpdate();
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao remover tipo de evento.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newLog = { ...log };
    let errorCount = 0;
    const fieldsToCheck = ['name', 'description'];

    if (!data.image && !typeToEdit) {
      newLog.image = '* Imagem obrigatória';
      errorCount++;
    } else {
      newLog.image = '';
    }

    fieldsToCheck.forEach((field) => {
      if (!data[field] || data[field].trim() === '') {
        newLog[field] = '* Campo obrigatório';
        errorCount++;
      } else {
        newLog[field] = '';
      }
    });

    setLog(newLog);
    return errorCount === 0;
  };

  const save = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      if (data.image) formData.append('image', data.image);

      let response;
      if (typeToEdit) {
        formData.append('active', data.active);
        response = await apiService.put(`/admin/event-types/${typeToEdit.id}`, formData, true);
      } else {
        response = await apiService.post(`/admin/event-types`, formData, true);
      }

      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: typeToEdit ? 'Tipo de evento atualizado com sucesso!' : 'Tipo de evento salvo com sucesso!',
      });

      onUpdate();
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao salvar.'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLog({});

    if (typeToEdit) {
      setData({ ...typeToEdit, imagePreview: typeToEdit.imageUrl });
      return;
    }

    setData({ ...initialData });
  }, [open, typeToEdit]);

  return (
    <Modal active={open} updateShow={onClose} closeOut={false}>
      <TitlePage title="Tipo de evento" icon="fa-solid fa-tags" />

      <FormContainer margin="32px 0 0">
        <S.AreaUploadImage>
          <div className="content">
            <img src={data.imagePreview || DefaultImage} alt="Preview" />
          </div>
          <div className="wrapper-input">
            <Button text="Nova imagem" />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <p className="text-error">{log.image}</p>
          </div>
        </S.AreaUploadImage>

        <Input
          label="Nome"
          value={data.name}
          messageError={log.name}
          onChange={(value) => changeInput('name', value)}
        />

        <Input
          label="Descrição"
          value={data.description}
          messageError={log.description}
          onChange={(value) => changeInput('description', value)}
        />

        {typeToEdit && (
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

        <div>
          <Button
            isLoading={loading}
            text={typeToEdit ? 'Atualizar' : 'Salvar'}
            onClick={save}
          />

          {typeToEdit && (
            <ConfirmAction 
              text="Tem certeza que deseja excluir este tipo de evento? Todas as categorias vinculadas a ele também serão removidas."
              onConfirm={remove}
            >
              <S.ButtonLink type="button">
                <i className="fa-solid fa-xmark"></i> Remover
              </S.ButtonLink>
            </ConfirmAction>
          )}
        </div>
      </FormContainer>
    </Modal>
  );
};

export default FormEventTypeModal;