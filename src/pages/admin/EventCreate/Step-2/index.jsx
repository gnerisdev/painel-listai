import { useAdmin } from 'contexts/Admin';
import Button from 'components/Button';
import ListGifts from 'components/ListGifts';
import * as S from './style';

const Step2 = ({ data, isLoading, getData, next, giftList }) => {
  const { setAlert } = useAdmin();

  const validateFields = () => {
    if (data?.gifts?.length >= 4) {
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
    giftList && (
      <div>
        <S.Subtitle>
          Lista de Presentes
          {data?.gifts?.length > 0 && <S.ListNumber>{data.gifts.length}</S.ListNumber>}
        </S.Subtitle>

        {/* List */}
        <ListGifts
          data={giftList}
          selected={data.gifts || []}
          getData={(value) => {
            const list = [];
            if (data?.gifts) list.push(...data.gifts);

            if (list.includes(value)) {
              getData({ gifts: list.filter((item) => item !== value) });
            } else {
              getData({ gifts: [...list, value] });
            }
          }}
        />

        <Button text="Próximo" onClick={validateFields} isLoading={isLoading} />
      </div>
    )
  );
};

export default Step2;
