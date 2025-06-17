import { useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Table from 'components/Table';
import Button from 'components/Button';
import DefaultImage from 'assets/default-image.jpg';
import HeaderWithButton from 'components/HeaderWithButton';
import LoadingLogo from 'components/LoadingLogo';
import LinkGiftToEvent from './LinkGiftToEvent';
import * as S from './style';

const Gifts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { apiService, setAlert } = useContext(AdminContext);
  const [giftsByCategory, setGiftsByCategory] = useState([]);
  const [tables, setTables] = useState({});
  const [linkGiftToEvent, setLinkGiftToEvent] = useState({ isOpen: false, gift: null });

  const transformGiftList = (gifts) => {
    const dataTable = gifts.map((gift) => ({
      id: gift.id,
      name: gift.name,
      description: gift.description,
      price: ApplicationUtils.formatPrice(gift.price),
      pricePercentage: ApplicationUtils.formatPrice(gift.pricePercentage),
      createdAt: ApplicationUtils.formatDate(gift.createdAt),
      updatedAt: ApplicationUtils.formatDate(gift.updatedAt),
    }));

    return dataTable;
  };

  const updateCurrentCategory = (typeId, gifts) => {
    setTables({ ...tables, [typeId]: transformGiftList(gifts) });
  };

  const getEventTypesWithCategories = async () => {
    try {
      setLoading(true);

      const response = await apiService.get(`/admin/gifts/categories`);
      const { giftsByCategory, success, message } = response.data;

      if (!success) throw new Error(message);

      if (giftsByCategory?.length > 0) {
        setGiftsByCategory(giftsByCategory);

        // Get tables
        const tablesOfType = {};
        giftsByCategory.forEach((type) => {
          const typeId = type.id;
          const { gifts } = type?.eventCategories[0] || [];
          tablesOfType[typeId] = transformGiftList(gifts);
        });
        setTables(tablesOfType);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar lista de presentes.'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventTypesWithCategories();
  }, []);

  return (
    <Container>
      <HeaderWithButton>
        <TitlePage title="Presentes" icon="fa-solid fa-gifts" />
        <Button 
          text="ADD Presente" 
          maxWidth="200px" 
          onClick={() => navigate('/gifts/create')} 
        />
      </HeaderWithButton>

      <S.Content>
        <small style={{ display: 'block', marginBottom: 16 }}>
          <strong style={{ color: 'red' }}>OBS.:</strong> Clique para expandir e
          ver os presentes de cada categoria.
        </small>

        {giftsByCategory.map((type) => (
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

            <Tabs style={{ marginTop: 8 }}>
              <TabList>
                {type.eventCategories.map((category) => (
                  <Tab
                    key={category.id}
                    onClick={() => updateCurrentCategory(type.id, category.gifts)}
                  >
                    {category.name}
                  </Tab>
                ))}
              </TabList>

              {type.eventCategories.map((category) => (
                <TabPanel key={category.id}>
                  <S.WrapperTable>
                    <Table
                      data={tables[type.id]}
                      columns={[
                        { label: "ID", name: "id" },
                        { label: "Nome", name: "name" },
                        { label: "Preço", name: "price" },
                        { label: "Preço Final", name: "pricePercentage" },
                      ]}
                      actions={[
                        {
                          label: '<i class="fa-solid fa-pen"></i> Editar Informações', 
                          onClick: (row) => navigate(`/gifts/${row.id}`),
                        },
                        {
                          label: '<i class="fa-solid fa-gift"></i> Adicionar a um evento',
                          onClick: (row) => setLinkGiftToEvent({ gift: row, isOpen: true })
                        },
                      ]}
                    />
                  </S.WrapperTable>
                </TabPanel>
              ))}
            </Tabs>
          </S.Details>
        ))}
      </S.Content>

      <LinkGiftToEvent 
        isOpen={linkGiftToEvent.isOpen}
        gift={linkGiftToEvent.gift}
        onClose={() => setLinkGiftToEvent({ gift: null, isOpen: false })}
      /> 

      {loading && <LoadingLogo />}
    </Container>
  );
};

export default Gifts;
