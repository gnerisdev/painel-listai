import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "contexts/Admin";
import { ApplicationUtils } from "utils/ApplicationUtils";
import Container from "components/Container";
import TitlePage from "components/TitlePage";
import Table from "components/Table";
import Filter from "components/Filter";
import Pagination from "components/Pagination";
import * as S from "./style";

const Events = () => {
  const navigate = useNavigate();
  const { apiService, setAlert } = useContext(AdminContext);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_LIMIT = 20;

  const onSearch = (filters, pageCurrent = page) => {
    let queryParams = `?page=${pageCurrent}&limit=${PAGE_LIMIT}`;

    for (let filter in filters) {
      if (filter === 'active' && filters[filter]) {
        queryParams += `&${filter}=${filters[filter] === 'active' ? true : false}`;
        continue;
      }
      if (filters[filter]) queryParams += `&${filter}=${filters[filter]}`;
    }

    setFilters(filters);
    getEvents(queryParams);
  };

  const getEvents = async (queryParams) => {
    try {
      const { data } = await apiService.get(`/admin/events${queryParams || ''}`);
      if (!data.success) throw new Error(data?.message);
      if (data.events) {
        setTableData(
          data.events.map((event) => ({
            id: event.id,
            title: event.title,
            slug: '/' + event.slug,
            userName: event?.user?.firstName + ' ' + event?.user?.lastName,
            active: event.active ? 'Ativo' : 'Não ativo',
            phoneNumber: event.phoneNumber,
            createdAt: ApplicationUtils.formatDate(event.createdAt),
            updatedAt: ApplicationUtils.formatDate(event.updatedAt),
          }))
        );
      }

      if (data.totalPages) setTotalPages(data.totalPages);
      if (data.setPage) setTotalPages(data.setPage);

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
    getEvents();
  }, []);

  return (
    <Container>
      <TitlePage title="Eventos" icon="fa-solid fa-calendar-days" />

      <S.Content>
        <S.WrapperFilter>
          <Filter
            fields={[
              { label: "ID", name: "id", type: "number" },
              { name: "title", label: "Título" },
              { name: "slug", label: "Url" },
              {
                name: "active",
                label: "Status",
                type: "select",
                options: [
                  { label: "Selecione", value: "" },
                  { label: "Ativo", value: "active" },
                  { label: "Desativo", value: "disabled" },
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
            onSearch={onSearch}
            filterValues={filters}
          />
        </S.WrapperFilter>

        <S.WrapperTable>
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
                label: "<i class='fa-solid fa-eye'></i> Ver detalhes",
                onClick: (row) => navigate(`/events/${row.id}`),
              },
                 {
                label: "<i class='fa-solid fa-envelope-open-text'></i> Recados recebido",
                onClick: (row) => navigate(`/events/${row.id}/messages`),
              },
              {
                label: "<i class='fa-solid fa-users'></i> Lista de presença",
                onClick: (row) => navigate(`/events/${row.id}/guests`),
              },
              {
                label: "<i class='fa-solid fa-gift'></i> Presentes recebido",
                onClick: (row) => navigate(`/events/${row.id}/gifts-received`),
              },           
              {
                label: "<i class='fa-solid fa-box-open'></i> Serviços",
                onClick: (row) => navigate(`/events/${row.id}/services`),
              },
            ]}
          />
        </S.WrapperTable>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => {
            setPage(page);
            onSearch(filters, page);
          }}
        />
      </S.Content>
    </Container>
  );
};

export default Events;
