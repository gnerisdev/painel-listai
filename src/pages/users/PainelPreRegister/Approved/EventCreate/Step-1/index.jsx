import { useState } from 'react';
import Input from 'components/Input';
import Select from 'components/Select';
import Button from 'components/Button';
import * as S from './style';

const Step1 = ({ data, eventCategories, isLoading, getData, next }) => {
  const [log, setLog] = useState({ 
    eventCategoryId: null, 
    title: null, 
    giftDeliveryPreference: null 
  });

  const getEventCategoriesData = () => eventCategories.map((item) => ({ 
    title: item.name, value: item.id 
  }));

  const validateFields = () => {
    let newLog = {};
    let errorCount = 0;

    const newError = (key, isError) => {
      if (isError) {
        newLog[key] = '* Campo obrigatório';
        errorCount++;
      } else {
        newLog[key] = '';
      }
    }

    if (!data.eventCategoryId) newError('eventCategoryId', true);
    if (!data.title) newError('title', true);
    if (!data.giftDeliveryPreference) newError('giftDeliveryPreference', true);

    setLog(newLog);

    if (errorCount === 0) next();
  };

  const handleInput = (name, value) => {
    getData({ [name]: value });
    value === ''
      ? setLog({ ...log, event: '* Campo obrigatório' })
      : setLog({ ...log, event: '' });
  };

  return (
    <div>
      <S.WrapperForm>
        {eventCategories && (
          <Select
            label="Evento"
            messageError={log.event}
            data={getEventCategoriesData(eventCategories)}
            value={data.eventCategoryId || ""}
            onChange={(value) => handleInput('eventCategoryId', value)}
          />
        )}

        <Input
          label="Título"
          type="text"
          check={log.title === ''}
          messageError={log.title}
          value={data.title}
          onChange={(value) => handleInput('title', value)}
        />

        <div>
          <S.Label>Forma de recebimento dos presentes:</S.Label>
          <S.LabelOption htmlFor="deliveryWeek">
            <S.Checkbox 
              type="checkbox" 
              value="weekOfParty" 
              checked={data.giftDeliveryPreference === 'weekOfParty'}
              onChange={(e) => getData({ giftDeliveryPreference: e.target.value })}
            />
            Presentes entregues na semana da festa
          </S.LabelOption>

          <S.LabelOption htmlFor="deliveryAfter">
            <S.Checkbox 
              type="checkbox" 
              value="weekAfterParty"
              checked={data.giftDeliveryPreference === 'weekAfterParty'}
              onChange={(e) => getData({ giftDeliveryPreference: e.target.value })}
            />
            Enviar na semana posterior à festa
          </S.LabelOption>

          <S.LabelOption htmlFor="cashValue">
            <S.Checkbox 
              type="checkbox" 
              value="cash" 
              checked={data.giftDeliveryPreference === 'cash'}
              onChange={(e) => getData({ giftDeliveryPreference: e.target.value })}
            />
            Recebimento do valor em dinheiro (resgate)
          </S.LabelOption>

          {log.giftDeliveryPreference && <S.MessageError>* Campo obrigatório</S.MessageError>}
        </div>
      </S.WrapperForm>

      <Button text="Próximo" onClick={validateFields} isLoading={isLoading} />
    </div>
  );
};

export default Step1;
