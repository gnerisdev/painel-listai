import { useState, useContext, useEffect } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Modal from 'components/Modal';

const InfoModal = ({ id, show, onClose }) => {
  const { apiService, setAlert } = useContext(AdminContext);
  const [data, setData] = useState(null);
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getInfoEvent = async () => {
    try {
      setLoading(true);

      const response = await apiService.get(`/admin/pre-user-requests/info/${id}`);
      const { success, message, infoEvent } = response.data;

      if (!success) throw new Error(message);

      setData(infoEvent);
    } catch (error) {
      handleCloseModal();

      setAlert({
        show: true,
        title: "Erro!",
        icon: "fa-solid fa-triangle-exclamation",
        text: ApplicationUtils.getErrorMessage(error, "Erro ao buscar informações de evento."),
      });
    } finally {
      setLoading(false);
    }
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };


  useEffect(() => {
    if (show) {
      setIsModalOpen(show);
      getInfoEvent();
      setData(null)
    }
  }, [show]);


  return (
    <Modal active={modalIsOpen} updateShow={handleCloseModal} closeOut={false} background="#fff">
      {loading ? (
        <p>Carregando informações do evento...</p>
      ) : data ? (
        <div>
          <h2 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            Informação do Evento
          </h2>

          <h3 style={{ marginBottom: '10px', marginTop: '20px' }}>Categoria do Evento</h3>
          <p>{data.eventCategory.name}</p>
         
          <h3 style={{ marginBottom: '10px', marginTop: '20px' }}>Tipo de Evento</h3>
          <p>{data.eventType.name}</p>

          {data.gifts && data.gifts.length > 0 && (
            <>
              <h3 style={{ marginBottom: '10px', marginTop: '20px' }}>Presentes</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {data.gifts.map((gift) => (
                  <li key={gift.id} style={{ marginBottom: '15px', border: '1px solid #eee', padding: '10px', borderRadius: '5px' }}>
                    <h4 style={{ marginBottom: '5px' }}>{gift.name}</h4>
                    <p style={{ color: '#7a7a7a' }}>
                      R$ {gift.price.toFixed(2).replace('.', ',')}
                    </p>
                    {gift.imageUrl && (
                      <img
                        src={gift.imageUrl}
                        alt={gift.name}
                        style={{ height: '90px', marginTop: '10px', borderRadius: '3px' }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : (
        <p>Nenhuma informação do evento disponível.</p>
      )}
    </Modal>
  );
};

export default InfoModal;