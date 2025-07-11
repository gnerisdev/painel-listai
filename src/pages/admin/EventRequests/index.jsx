import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "contexts/Admin";
import { ApplicationUtils } from "utils/ApplicationUtils";
import Container from "components/Container";
import TitlePage from "components/TitlePage";
import Table from "components/Table";
import Filter from "components/Filter";
import Pagination from "components/Pagination";
import LoadingLogo from "components/LoadingLogo";
import Button from "components/Button";
import HeaderWithButton from "components/HeaderWithButton";
import * as S from "./style";
import InfoModal from "./InfoModal";

const EventRequests = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { apiService, setAlert } = useContext(AdminContext);
  const [userEventRequests, setUserEventRequests] = useState([]);
  const [infoModal, setInfoModal] = useState({ show: false, id: null });
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
    getUserEventRequests(queryParams);
  };

  const getUserEventRequests = async (queryParams) => {
    try {
      setLoading(true);

      const response = await apiService.get(`/admin/pre-user-requests${queryParams || ''}`);
      const { success, message, userEventRequests, totalPages, page } = response.data;

      if (!success) throw new Error(message);

      if (userEventRequests.length > 0) {
        const userEventRequestFormat = userEventRequests.map((item) => ({
          ...item,
          accountCreated: item.accountCreated ? 'Sim' : 'Não',
          phoneNumber: ApplicationUtils.formatPhone(item.phoneNumber),
          paymentStatus: ApplicationUtils.translateTransactiontatus(item.paymentStatus),
          createdAt: ApplicationUtils.formatDate(item.createdAt),
        }));

        setUserEventRequests(userEventRequestFormat);
      }
      setTotalPages(totalPages);
      setPage(page);
    } catch (error) {
      setAlert({
        show: true,
        title: "Erro!",
        icon: "fa-solid fa-triangle-exclamation",
        text: ApplicationUtils.getErrorMessage(error, "Erro ao buscar eventos."),
      });
    } finally {
      setLoading(false);
    }
  };

  const openInfo = async (id) => setInfoModal({ show: true, id });

  useEffect(() => {
    getUserEventRequests();
  }, []);

  return (
    <Container>
      <TitlePage title="Solicitação de Eventos" icon="fa-solid fa-clipboard-list" />

      <S.Content>
        <S.WrapperFilter>
          <Filter
            fields={[
              { label: "ID", name: "id", type: "number" },
              { label: "Email", name: "email", type: "text" },
              { label: "Celular", name: "phoneNumber", type: "number" },
              { name: "startDate", label: "Data inicial", type: "date" },
              { name: "endDate", label: "Data final", type: "date" },
            ]}
            onSearch={onSearch}
            filterValues={filters}
          />
        </S.WrapperFilter>

        <S.WrapperTable>
          <Table
            data={userEventRequests}
            columns={[
              { label: "ID", name: "id" },
              { label: "Nome", name: "name" },
              { label: "Email", name: "email" },
              { label: "Celular", name: "phoneNumber" },
              { label: "Evento criado", name: "accountCreated" },
              { label: "Pagamento", name: "paymentStatus" },
              { label: "Data", name: "createdAt" },
            ]}
            actions={[
              {
                label: "<i class='fa-solid fa-file-lines'></i> Informações do evento",
                onClick: (row) => openInfo(row.id),
              },
              {
                label: "<i class='fa-solid fa-calendar-plus'></i> Criar evento",
                onClick: (row) => {
                  navigate(`/events/create`, { state: { 
                    ...row.eventInfoJson,
                    email: row.email,
                    phoneNumber: row.phoneNumber,
                    firstName: row.name.split(' ')[0],
                    lastName: row.name.split(' ')[1],
                    preUserRequestId: row.id,
                    useUserPassword: true
                  }})
                },
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

      <InfoModal 
        id={infoModal.id} 
        show={infoModal.show} 
        onClose={() => setInfoModal({ show: false, id: null })} 
      />

      {loading && <LoadingLogo />}
    </Container>
  );
};

export default EventRequests;
