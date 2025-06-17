import { useState, useContext, useEffect } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import ConfirmAction from 'components/ConfirmAction';
import * as S from './style';

const FormConfirmationModal = ({ eventId, open, onClose, onGuestUpdated, guestToEdit }) => {
  const { apiService, setAlert } = useContext(AdminContext);
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  const [log, setLog] = useState({});
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

  const validateForm = () => {
    const newLog = { ...log };
    let errorCount = 0;

    if (!data.firstName.trim()) {
      newLog.firstName = '* Nome obrigatório';
      errorCount++;
    } else {
      newLog.firstName = '';
    }

    if (!data.lastName.trim()) {
      newLog.lastName = '* Sobrenome obrigatório';
      errorCount++;
    } else {
      newLog.lastName = '';
    }

    if (!data.email.trim()) {
      newLog.email = '* E-mail obrigatório';
      errorCount++;
    } else if (!emailRegex.test(data.email)) {
      newLog.email = '* E-mail inválido';
      errorCount++;
    } else {
      newLog.email = '';
    }

    if (!data.phoneNumber.trim()) {
      newLog.phoneNumber = '* Telefone obrigatório';
      errorCount++;
    } else if (!phoneRegex.test(ApplicationUtils.formatToInputPhone(data.phoneNumber))) {
      newLog.phoneNumber = '* Telefone inválido';
      errorCount++;
    } else {
      newLog.phoneNumber = '';
    }

    setLog(newLog);
    return errorCount === 0;
  };

  const changeInput = (name, value) => {
    setData({ ...data, [name]: value });
    let errorMessage = '';

    switch (name) {
      case 'firstName':
      case 'lastName':
        errorMessage = value.trim() === '' ? '* Campo obrigatório' : '';
        break;
      case 'email':
        errorMessage = value.trim() === '' ? '* E-mail obrigatório' : !emailRegex.test(value) ? '* E-mail inválido' : '';
        break;
      case 'phoneNumber':
        const formattedValue = ApplicationUtils.formatToInputPhone(value);
        setData({ ...data, [name]: formattedValue });
        errorMessage = value.trim() === '' ? '* Telefone obrigatório' : !phoneRegex.test(formattedValue) ? '* Telefone inválido' : '';
        break;
      default:
        break;
    }

    setLog({ ...log, [name]: errorMessage });
  };

  const sendConfirmation = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (editId) {
        await apiService.put(`/admin/events/${eventId}/guests/${editId}`, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });

        setAlert({
          show: true,
          title: 'Sucesso!',
          icon: 'fa-solid fa-check',
          text: 'Convidado atualizado com sucesso.',
        });
      } else {
        await apiService.post(`/admin/events/${eventId}/guests`, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
        setAlert({
          show: true,
          title: 'Sucesso!',
          icon: 'fa-solid fa-check',
          text: 'Convidado adicionado com sucesso.',
        });
      }

      onGuestUpdated();
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao salvar convidado.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await apiService.delete(`/admin/events/${eventId}/guests/${editId}`);
      const { success, message } = response.data;
      if (!success) throw new Error(message || 'Erro ao excluir convidado.');

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: 'Convidado excluído com sucesso.',
      });

      onGuestUpdated();
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao excluir convidado.'),
      });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (open) {
      setLog({});
      if (guestToEdit) {
        setEditId(guestToEdit.id);
        setData({
          firstName: guestToEdit.firstName || '',
          lastName: guestToEdit.lastName || '',
          email: guestToEdit.email || '',
          phoneNumber: guestToEdit.phoneNumber || '',
        });
      } else {
        setEditId(null);
        setData({ firstName: '', lastName: '', email: '', phoneNumber: '' });
      }
    }
  }, [open, guestToEdit]);

  return (
    <Modal
      active={open}
      updateShow={onClose}
      closeOut={false}
      onClose={onClose}
    >
      <h2><span className="fa-solid fa-user" /> {editId ? 'Editar Convidado' : 'Novo Convidado'}</h2>

      <S.ModalContent>
        <div className="row">
          <Input
            label="Nome"
            value={data.firstName}
            check={log.firstName === ''}
            messageError={log.firstName}
            onChange={value => changeInput('firstName', value)}
          />

          <Input
            label="Sobrenome"
            value={data.lastName}
            check={log.lastName === ''}
            messageError={log.lastName}
            onChange={value => changeInput('lastName', value)}
          />
        </div>

        <Input
          label="E-mail"
          type="email"
          value={data.email}
          messageError={log.email}
          check={log.email === ''}
          onChange={value => changeInput('email', value)}
        />

        <Input
          label="Celular"
          type="tel"
          value={data.phoneNumber}
          messageError={log.phoneNumber}
          check={log.phoneNumber === ''}
          onChange={value => changeInput('phoneNumber', value)}
        />

        <Button
          text={editId ? 'ATUALIZAR' : 'SALVAR'}
          onClick={sendConfirmation}
          isLoading={loading}
        />

        {editId && (
          <ConfirmAction
            text="Tem certeza que deseja excluir este convidado?"
            onConfirm={handleDelete}
          >
            <S.ButtonLink type="button" disabled={isDeleting}>
              <span className="fa-solid fa-xmark" /> Excluir
            </S.ButtonLink>
          </ConfirmAction>
        )}
      </S.ModalContent>
    </Modal>
  );
};

export default FormConfirmationModal;