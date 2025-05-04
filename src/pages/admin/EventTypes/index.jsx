import { useState, useEffect, useContext, useCallback } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Header from 'components/Header';
import Button from 'components/Button';
import DefaultImage from 'assets/default-image.jpg';
import FormEventCategoryModal from './FormEventCategoryModal';
import FormEventTypeModal from './FormEventTypeModal';
import * as S from './style';

const EventTypes = () => {
  const { apiService, setAlert } = useContext(AdminContext);
  const [eventTypesData, setEventTypesData] = useState([]);
  const [showModalForm, setShowModalForm] = useState({ type: false, category: false });
  const [toEdit, setToEdit] = useState(null);
  const [selectedTypeId, setSelectedTypeId] = useState(null);

  const getEventTypesWithCategories = useCallback(async () => {
    try {
      const response = await apiService.get(`/admin/event-types-with-categories`);
      const { eventTypes, success, message } = response.data;
      if (!success) throw new Error(message);
      if (eventTypes) setEventTypesData(eventTypes);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar tipos de eventos.'),
      });
    }
  }, [apiService, setAlert]);

  const openModalForm = useCallback((name = 'type', value = null, typeId = null) => {
    setShowModalForm({ ...showModalForm, [name]: true });
    setToEdit(value);
    if (name === 'category' && typeId) setSelectedTypeId(typeId);
  }, []);

  useEffect(() => {
    getEventTypesWithCategories();
  }, [getEventTypesWithCategories]);

  return (
    <Container>
      <Header />

      <TitlePage title="Tipos de evento" icon="fa-solid fa-folder-tree" />

      <S.Content>
        <small>
          <strong style={{ color: 'red' }}>Atenção:</strong> {" "} 
          Clique para expandir e visualizar as categorias de cada tipo de presente.
        </small>

        <S.WrapperButton>
          <Button text="Novo Tipo" maxWidth="200px" onClick={openModalForm} />
        </S.WrapperButton>

        {eventTypesData.map((type) => {
          return (
            <div key={type.id}>
              <S.ActionCategory>
                <button onClick={() => openModalForm('type', type)}>
                  <span className="fa-solid fa-pen-to-square" />
                  Editar
                </button>
              </S.ActionCategory>

              <S.Details key={type.id}>
                <summary>
                  <div className="summary-left">
                    <img src={type.imageUrl || DefaultImage} alt="Preview" />
                    <h3>{type.name}</h3>
                  </div>
                  <div className="summary-chevron-up">
                    {type.active === false && <span className="type-disabled">INATIVO</span>}
                    <span className="fa-solid fa-chevron-down" />
                  </div>
                </summary>

                <ul>
                  <S.ListItem>
                    <Button
                      text="<i class='fa-solid fa-plus'></i> Nova Categoria"
                      maxWidth="170px"
                      onClick={() => openModalForm('category', null, type.id)}
                    />
                  </S.ListItem>

                  {type.eventCategories && type.eventCategories.map((category) => (
                    <S.ListItem key={category.id}>
                      <span>{category.name}</span>
                      <S.WrapperBadge>
                        <S.Badge 
                          className="fa-solid fa-pen-to-square" 
                          onClick={() => openModalForm('category', category)} 
                        />
                      </S.WrapperBadge>
                    </S.ListItem>
                  ))}
                </ul>
              </S.Details>
            </div>
          );
        })}
      </S.Content>

      <FormEventTypeModal
        open={showModalForm.type}
        onClose={() => setShowModalForm({ ...showModalForm, type: false })}
        typeToEdit={toEdit}
        onUpdate={getEventTypesWithCategories}
      />

      <FormEventCategoryModal
        open={showModalForm.category}
        onClose={() => setShowModalForm({ ...showModalForm, category: false })}
        categoryToEdit={toEdit}
        selectedTypeId={selectedTypeId}
        onUpdate={getEventTypesWithCategories}
      />
    </Container>
  );
};

export default EventTypes;