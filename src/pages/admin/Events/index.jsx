import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "contexts/Admin";
import { ApplicationUtils } from "utils/ApplicationUtils";
import Container from "components/Container";
import TitlePage from "components/TitlePage";
import Header from "components/Header";
import Table from "components/Table";
import Filter from "components/Filter";
import * as S from "./style";

const Events = () => {
  const navigate = useNavigate();
  const { apiService, setAlert } = useContext(AdminContext);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({});

  const getEvents = async () => {
    try {
      const { data } = await apiService.get(`/admin/events`);
      if (!data.success) throw new Error(data?.message);
      if (data.events) {
        setTableData(
          data.events.map((event) => ({
            id: event.id,
            title: event.title,
            slug: '/' + event.slug,
            userName: event.userName,
            active: event.active ? 'Ativo' : 'Não ativo',
            phoneNumber: event.phoneNumber,
            createdAt: ApplicationUtils.formatDate(event.createdAt),
            updatedAt: ApplicationUtils.formatDate(event.updatedAt),
          }))
        );
      }
    } catch (error) {
      setAlert({
        show: true,
        title: "Erro!",
        type: "error",
        text: ApplicationUtils.getErrorMessage(error, "Erro ao buscar eventos."),
      });
    }
  };  

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container>
      <Header />
      <TitlePage title="Eventos" icon="fa-solid fa-calendar-days" />

      <S.Content>
        <S.WrapperFilter>
          <Filter
            fields={[
              { name: "title", label: "Título" },
              { name: "slug", label: "Url" },
              {
                name: "active",
                label: "Status",
                type: "select",
                options: [
                  { label: "Selecione", value: "" },
                  { label: "Ativo", value: true },
                  { label: "Desativo", value: false },
                ],
              },
              {
                name: "dateFilterType",
                label: "Filtrar por",
                type: "select",
                options: [
                  { label: "Selecione", value: "" },
                  { label: "Data de criação", value: "createdAt" },
                  { label: "Data do evento", value: "eventDate" },
                ],
              },
              { name: "startDate", label: "Data inicial", type: "date" },
              { name: "endDate", label: "Data final", type: "date" },
            ]}
            onSearch={(filters) => setFilters(filters)}
            filterValues={filters}
          />
        </S.WrapperFilter>

        <Table
          data={tableData}
          columns={[
            { label: "ID", name: "id" },
            { label: "Criador", name: "userName" },
            { label: "Título", name: "title" },
            { label: "Url", name: "slug" },
            { label: "Data de cadastro", name: "createdAt" },
            { label: "Última atualização", name: "updatedAt" },
            { label: "Status", name: "active" },
          ]}
          actions={[
            { 
              label: "<i class='fa-regular fa-eye'></i> Ver detalhes",
              onClick: (row) => navigate(`/admin/events/${row.id}`),
            },
          ]}
        />
      </S.Content>
    </Container>
  );
};

export default Events;
