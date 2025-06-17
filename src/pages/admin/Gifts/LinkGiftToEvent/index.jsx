import { useState, useContext } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import ConfirmAction from 'components/ConfirmAction';
import * as S from './style';

const LinkGiftToEvent = ({ gift, isOpen, onClose }) => {
  const { apiService, setAlert } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState('');

  const validateForm = () => {
    if (!eventId) {
      setAlert({
        show: true,
        title: 'Atenção!',
        icon: 'fa-solid fa-warning',
        text: 'Preencha o ID do evento.',
      });

      return false;
    }

    return true;
  };

  const send = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = { giftId: gift.id, eventId: Number(eventId) };
      const response = await apiService.post(`/admin/gifts/link-to-event`, data);
      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: 'Presente adicionado ao evento com sucesso.',
      });

      setEventId('');
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao adicionar presente ao evento.'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      active={isOpen}
      updateShow={onClose}
      closeOut={false}
      onClose={onClose}
    >
      <h3>Adicionar presente a um evento</h3>
      <h5>{gift?.name}</h5>

      <S.ModalContent>
        <Input
          label="ID do evento"
          type="number"
          value={eventId}
          onChange={(value) => setEventId(value)}
        />

        <small>
          <strong>OBS.: </strong> 
          Certifique-se de que o ID corresponde ao evento correto.
        </small>

        <ConfirmAction
          text="Tem certeza que deseja vincular este presente ao evento?"
          onConfirm={send}
        >
          <Button text="Adicionar" isLoading={loading} onClick={() => {}} />
        </ConfirmAction>
      </S.ModalContent>
    </Modal>
  );
};

export default LinkGiftToEvent;
