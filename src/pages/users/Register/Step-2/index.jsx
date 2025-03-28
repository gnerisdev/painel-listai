import { useContext, useEffect, useState } from 'react';
import { UsersContext } from 'contexts/Users';
import Button from 'components/Button';
import ListGifts from 'components/ListGifts';
import * as S from './style';

const Step2 = ({ data, isLoading, getData, next, gifts }) => {
  const { setAlert } = useContext(UsersContext);

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

  return (
    gifts && (
      <div>
        <S.Subtitle>
          Lista de Presentes em Dinheiro
          {data?.giftList?.length > 0 && (
            <S.ListNumber>{data.giftList.length}</S.ListNumber>
          )}
        </S.Subtitle>

        <S.Text>
          Escolha no mínimo 4 presentes para seguir. <br />
          Você pode editar, criar e adicionar mais presentes.
        </S.Text>

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
      </div>
    )
  );
};

export default Step2;
