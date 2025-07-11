import { useState } from 'react';
import { useGlobal } from 'contexts/Global';
import Button from 'components/Button';
import ListGifts from 'components/ListGifts';
import TitlePage from 'components/TitlePage';
import Modal from 'components/Modal';
import FormContainer from 'components/FormContainer';
import Input from 'components/Input';
import * as S from './style';

const Step2 = ({ data, isLoading, getData, next, giftList }) => {
  const { setAlert } = useGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalPassword = () => {
    if (!data?.gifts || data.gifts.length < 4) {
      setAlert({
        show: true,
        title: 'Lista de Presentes',
        text: 'Selecione pelo menos 4 presentes antes de continuar.',
      });

      return;
    }

    setIsModalOpen(true);
  };

  return (
    giftList && (
      <div>
        <h3>
          Lista de Presentes
          {data?.gifts?.length > 0 && <S.ListNumber>{data.gifts.length}</S.ListNumber>}
        </h3>

        <ListGifts
          data={giftList}
          selected={data.gifts || []}
          getData={(value) => {
            const list = [...(data?.gifts || [])];

            const newList = list.includes(value)
              ? list.filter((item) => item !== value)
              : [...list, value];

            getData({ gifts: newList });
          }}
        />

        <Button text="Finalizar" onClick={openModalPassword} />

        <Modal active={isModalOpen} updateShow={setIsModalOpen} closeOut={false}>
          <TitlePage title="Autenticação" icon="fa-solid fa-lock" />

          <FormContainer margin="32px 0 0">
            <p>Insira sua senha cadastrada anteriormente para continuar.</p>

            <Input
              label="Senha"
              type="password"
              value={data.password}
              onChange={(value) => getData({ password: value })}
            />

            <Button text="Confirmar" onClick={next} isLoading={isLoading} />
          </FormContainer>
        </Modal>
      </div>
    )
  );
};

export default Step2;
