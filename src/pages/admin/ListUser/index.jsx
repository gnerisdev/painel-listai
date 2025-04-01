import * as S from './style';
import { useState, useEffect } from "react"
import { fetchUser } from "../../mocks/apiMock"

const ListUser = () => {
  const [user, setUser] = useState([]); const [loading, setLoading] = useState(true); const [searchParams, setSearchParams] = useState({ name: "", email: "", status: "", }); useEffect(() => {
    const fetchData = async () => { try { const reponse = await fetchUser(); setUser(reponse.data); setLoading(false); } catch (err) { console.error("Erro ao carregar os usuários:", err); setLoading(false); } };

    fetchData();
  }, []);

  const handleInputChange = (e) => { const { name, value } = e.target; setSearchParams((prev) => ({ ...prev, [name]: value })); };

  const handleSearch = (e) => { e.preventDefault(); console.log("Buscando com parâmetros:", searchParams); }; const filteredUsers = user.filter(user => { return (user.name.toLowerCase().includes(searchParams.name.toLowerCase()) && user.email.toLowerCase().includes(searchParams.email.toLowerCase()) && user.status.toLowerCase().includes(searchParams.status.toLowerCase())); }); if (loading) { return <div>loading....</div> } return (<S.Container> <S.Content> <S.Title>Listagem de Usuários</S.Title>

    <S.SearchForm onSubmit={handleSearch}>
      <S.SearchField>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" name="name" value={searchParams.name} onChange={handleInputChange} />
      </S.SearchField>

      <S.SearchField>
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" name="email" value={searchParams.email} onChange={handleInputChange} />
      </S.SearchField>

      <S.SearchField>
        <label htmlFor="status">Status:</label>
        <input type="text" id="status" name="status" value={searchParams.status} onChange={handleInputChange} />
      </S.SearchField>

      <S.SearchButton type="submit">Buscar</S.SearchButton>
    </S.SearchForm>

    <S.Table>
      <S.TableHeader>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Números de eventos</th>
        </tr>
      </S.TableHeader>
      <S.TableBody>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.events}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Nenhum usuário encontrado</td>
          </tr>
        )}
      </S.TableBody>
    </S.Table>
  </S.Content>
  </S.Container>
  );
};

export default ListUser;