import { useContext, useEffect, useState } from 'react';
import { UsersContext } from 'contexts/Users';
import Button from 'components/Button';
import ListGifts from 'components/ListGifts';
import Input from "components/Input";
import Modal from "components/Modal";
import * as S from './style';

const Step2 = ({ data, isLoading, getData, next, gifts }) => {
  const { setAlert } = useContext(UsersContext);
  const [modalSuggestion, setModalSuggestion] = useState(false);
  const [suggestion, setSuggestion] = useState({ title: "", description: "" });

  const validateFields = () => {
    if (data?.giftList?.length >= 4) {
      next();
    } else {
      setAlert({
        show: true,
        title: 'Lista de Presentes',
        text: 'Necessário selecionar mais 4 presentes para continuar.',
      });
    }
  };

  const addSuggestion = async () => {
    if (!suggestion.title.trim()) {
      setAlert({ 
        show: true, 
        title: 'Erro!', 
        icon: 'fa-solid fa-triangle-exclamation',
        text: 'Preencha o título!' 
      });
      return;
    }

    if (suggestion.title.length > 150) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: 'O título deve ter no máximo 150 caracteres!'
      });
      return;
    }

    if (suggestion.description && suggestion.description.length > 500) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: 'A descrição deve ter no máximo 500 caracteres!'
      });
      return;
    }

    const list = [ ...(data.suggestions ?? []), suggestion ];
    
    getData({ suggestions: list });
    setSuggestion({ title: "", description: "" });
    setModalSuggestion(false);
  };

  const deleteSuggestion = (indexToDelete) => {
    const list = [];
    if (data?.suggestion) list.push(...data.suggestion);
    list = list.filter((_, index) => index !== indexToDelete);
    getData({ suggestions: [...list] });
  };

  return (
    gifts && (
      <div>
        <S.Subtitle>
          Lista de Presentes
          {data?.giftList?.length > 0 && <S.ListNumber>{data.giftList.length}</S.ListNumber>}
        </S.Subtitle>

        <S.Text>
          Escolha no mínimo 4 presentes para seguir. <br />
          Caso não encontre o que procura, você pode criar uma sugestão de presente.
        </S.Text>

        {/* Suggestions */}
        <Button
          text="Criar sugestão"
          maxWidth={300}
          margin="16px 0 8px"
          background="#999999"
          onClick={() => setModalSuggestion(true)}
        />

        {data.suggestions?.length > 0 && (
          <>
            <h3 style={{ textAlign: 'left' }}>Sugestões</h3>
            <S.Suggestion>
              {data.suggestions?.map((sug, index) => (
                <li key={index}>
                  • {sug.title}
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => deleteSuggestion(index)}
                    title="Excluir sugestão"
                  />
                </li>
              ))}
            </S.Suggestion>
          </>
        )}

        {/* List */}
        <ListGifts
          data={gifts}
          selected={data.giftList || []}
          getData={(value) => {
            const list = [];
            if (data?.giftList) list.push(...data.giftList);

            if (list.includes(value)) {
              getData({ giftList: list.filter((item) => item !== value) });
            } else {
              getData({ giftList: [...list, value] });
            }
          }}
        />

        <Button text="Próximo" onClick={validateFields} isLoading={isLoading} />

        {/* Modal Suggestion  */}
        <Modal
          active={modalSuggestion}
          updateShow={() => setModalSuggestion(false)}
          closeOut={false}
        >
          <S.TitleModal>
            <i className="fa-solid fa-gift"></i>
            Adicionar Sugestão de Presente
          </S.TitleModal>

          <S.WrapperForm>
            <Input
              label="Tilulo do Presente"
              placeholder="Digite o título sugestão de presente..."
              value={suggestion.title}
              onChange={(value) => setSuggestion({ ...suggestion, title: value })}
            />

            <Input
              type="textarea"
              label="Descrição de Presente"
              placeholder="Digite a descrição da sugestão de presente..."
              value={suggestion.description}
              onChange={(value) => setSuggestion({ ...suggestion, description: value })}
            />

            <Button
              text="Salvar"
              onClick={addSuggestion}
            />
          </S.WrapperForm>
        </Modal>
      </div>
    )
  );
};

export default Step2;
