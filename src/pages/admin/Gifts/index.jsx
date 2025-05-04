import { useState, useEffect, useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from "react-router-dom";
import { AdminContext } from "contexts/Admin";
import { ApplicationUtils } from "utils/ApplicationUtils";
import Container from "components/Container";
import TitlePage from "components/TitlePage";
import Header from "components/Header";
import Table from "components/Table";
import * as S from "./style";
import Button from "components/Button";

const Gifts = () => {
  const navigate = useNavigate();
  const { apiService, setAlert } = useContext(AdminContext);
  const [typesWithCategories, setTypesWithCategories] = useState([]);
  const [tableData, setTableData] = useState([]);

  const getDataTable = (gifts) => {
    const dataTable = gifts.map((gift) => ({
      id: gift.id,
      name: gift.name,
      description: gift.description,
      price: ApplicationUtils.formatPrice(gift.price),
      createdAt: ApplicationUtils.formatDate(gift.createdAt),
      updatedAt: ApplicationUtils.formatDate(gift.updatedAt),
    }));

    return dataTable;
  };

  const getEventTypesWithCategories = async () => {
    try {
      const response = await apiService.get(`/admin/gifts/categories`);
      const { categories, success, message } = response.data;
      if (!success) throw new Error(message);

      if (categories) {
        setTypesWithCategories(categories);
        // getGifts(categories[0].id);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: "Erro!",
        icon: "fa-solid fa-triangle-exclamation",
        text: ApplicationUtils.getErrorMessage(error, "Erro ao buscar eventos."),
      });
    }
  };

  useEffect(() => {
    getEventTypesWithCategories();
  }, []);

  return (
    <Container>
      <Header />

      <S.WrapperSubHeader>
        <TitlePage title="Presentes" icon="fa-solid fa-gifts" />
        <Button text="ADD Presente" maxWidth="200px" />
      </S.WrapperSubHeader>

      <S.Content>
        <small>
          <strong style={{ color: 'red' }}>OBS.:</strong> 
          {' '} Clique para expandir e ver os presentes de cada categoria.
        </small>

        {typesWithCategories.map((type) => {
          return (
            <S.Details key={type.id}>
              <summary>
                <span class="summary-title">
                  <h3>{type.name}</h3>
                </span>
                <div class="summary-chevron-up">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </summary>

              <Tabs>
                <TabList>
                  {type.eventCategories.map((category) => (
                    <Tab
                      key={category.id}
                    // isActive={selectedCategory === category.id}
                    // onClick={() => handleTabClick(category.id)}
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </Tabs>

              <S.WrapperTable>
                <Table
                  data={getDataTable(type.eventCategories[0].gifts)}
                  columns={[
                    { label: "ID", name: "id" },
                    { label: "Nome", name: "name" },
                    { label: "Descrição", name: "description" },
                    { label: "Preço", name: "price" },
                    { label: "Criado em", name: "createdAt" },
                  ]}
                  actions={[
                    {
                      label: "<i className='fa-regular fa-eye'></i> Ver detalhes",
                      onClick: (row) => navigate(`/event/${row.id}`),
                    },
                  ]}
                />
              </S.WrapperTable>
            </S.Details>
          );
        })}
      </S.Content>
    </Container>
  );
};

export default Gifts;
