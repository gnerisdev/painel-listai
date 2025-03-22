import { useContext } from 'react';
import { HostsContext } from 'contexts/Hosts';
import Button from 'components/Button';
import List from 'components/List';
import * as S from './style';

const Step2 = ({ data, getData, next }) => {
  const { setAlert } = useContext(HostsContext);
  
  const items = [
    { name: "Sunset View Lunch", price: 129.90 },
    { name: "Stand Up Paddle", price: 100.00 },
    { name: "Spa Day", price: 259.90 },
    { name: "Passeio de Helicóptero", price: 1200.00 },
    { name: "Passeio de Catamarã", price: 389.90 },
    { name: "Passeio de Barco", price: 590.90 },
    { name: "Passeio de Balão", price: 890.90 },
    { name: "Mergulho com Raia", price: 119.90 },
    { name: "Mergulho Snorkel", price: 100.00 },
    { name: "Jantar Romântico", price: 520.00 },
    { name: "Diária Bangalô", price: 380.00 },
    { name: "Diária Bangalô", price: 450.00 },
    { name: "Cota Trip to Roma", price: 360.00 },
    { name: "Cota Trip to Paris", price: 650.00 },
    { name: "Cota Safari", price: 300.00 },
    { name: "Cota Cruzeiro", price: 280.00 },
    { name: "Cota Balcony Cruzeiro", price: 600.00 },
    { name: "Café da Manhã Beach View", price: 100.00 },
    { name: "Brinde dos Noivos Sunset", price: 100.00 },
    { name: "Brinde dos Noivos", price: 109.90 },
    { name: "Beach Lunch", price: 149.90 },
    { name: "Aquabike", price: 249.90 }
  ];

  const validateFields = () => {  
    if (data?.giftList?.length >= 4) {
      next();
    } else {
      setAlert({ 
        show: true, 
        title: 'Lista de Presentes', 
        text: 'Necessário selecionar mais 4 presentes para continuar.' 
      });
    }
  };

  return (
    <div>
      <S.Subtitle>
        Lista de Presentes em Dinheiro
        {data?.giftList?.length > 0 && <S.ListNumber>{data.giftList.length}</S.ListNumber>}
      </S.Subtitle>

      <S.Text>
        Escolha no mínimo 4 presentes para seguir. <br />
        Você pode editar, criar e adicionar mais presentes.
      </S.Text>

      <List 
        data={items} 
        selected={data.giftList || []}
        getData={(value) => {
          const list = [];
          if (data?.giftList) list.push(...data.giftList)

          if (list.includes(value)) {
            getData({ giftList: list.filter(item => item !== value) });
          } else {
            getData({ giftList: [...list, value] });
          } 
        }}

      />

      <Button text="Próximo" onClick={validateFields} />
    </div>
  );
};

export default Step2;
