import { useState, useEffect, useContext } from "react";
import { AdminContext } from "contexts/Admin";
import { ApplicationUtils } from "utils/ApplicationUtils";
import Container from "components/Container";
import TitlePage from "components/TitlePage";
import Table from "components/Table";
import Filter from "components/Filter";
import Pagination from "components/Pagination";
import LoadingLogo from "components/LoadingLogo";
import * as S from "./style";

const GiftSuggestions = () => {
  const [loading, setLoading] = useState(true);
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
    getSuggestions(queryParams);
  };

  const getSuggestions = async (queryParams) => {
    try {
      setLoading(true);

      const response = await apiService.get(`/admin/gift-suggestions${queryParams || ''}`);
      const { success, message, giftSuggestions, totalPages: fetchedTotalPages } = response.data;

      if (!success) throw new Error(message);

      if (giftSuggestions) {
        setTableData(
          giftSuggestions.map((item) => ({
            id: item.id,
            userId: item.userId,
            eventId: item.eventId,
            title: item.title,
            description: item.description,
            createdAt: ApplicationUtils.formatDate(item.createdAt),
          }))
        );
      }

      if (fetchedTotalPages) setTotalPages(fetchedTotalPages);


    } catch (error) {
      setAlert({
        show: true,
        title: "Erro!",
        icon: "fa-solid fa-triangle-exclamation",
        text: ApplicationUtils.getErrorMessage(error, "Erro ao buscar sugestões."),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuggestion = async (suggestionId) => {
    const confirmDelete = window.confirm("Tem certeza que deseja remover essa sugestão?");
    if (!confirmDelete) return;

    try {
      const response = await apiService.delete(`/admin/gift-suggestions/${suggestionId}`);
      const { success, message } = response.data;

      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: "Sucesso!",
        icon: "fa-solid fa-check",
        text: "Sugestão removida com sucesso.",
      });

      onSearch(filters, page);

    } catch (error) {
      setAlert({
        show: true,
        title: "Erro!",
        icon: "fa-solid fa-triangle-exclamation",
        text: ApplicationUtils.getErrorMessage(error, "Erro ao remover sugestão."),
      });
    }
  };


  useEffect(() => {
    getSuggestions(`?page=${page}&limit=${PAGE_LIMIT}`);
  }, []);

  return (
    <Container>
      <TitlePage title="Sugestões de Presentes" icon="fa-solid fa-gift" />

      <S.Content>
        <S.WrapperFilter>
          <Filter
            fields={[
              { label: "ID do Evento", name: "eventId", type: "number" },
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
              { label: "ID do Evento", name: "eventId" },
              { label: "Título", name: "title" },
              { label: "Descrição", name: "description" },
              { label: "Data de Criação", name: "createdAt" },
            ]}
            actions={[
              {
                label: "<i class='fa-solid fa-trash'></i> Remover",
                onClick: (row) => handleDeleteSuggestion(row.id),
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

      {loading && <LoadingLogo />}
    </Container>
  );
};

export default GiftSuggestions;