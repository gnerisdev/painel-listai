import { useState } from 'react';
import Input from 'components/Input';
import Select from 'components/Select';
import InputUrl from 'components/InputUrl';
import Button from 'components/Button';
import * as S from './style';

const socialMediaList = [
  { title: 'Facebook', value: 'facebook' },
  { title: 'Instagram', value: 'instagram' },
  { title: 'Twitter', value: 'twitter' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'TikTok', value: 'tiktok' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'WhatsApp', value: 'whatsapp' },
];

const Step1 = ({ data, eventCategories, isLoading, getData, next }) => {
  const [log, setLog] = useState({
    event: null,
    title: null,
    subtitle: null,
    slug: null,
    source: null,
  });

  const getEventCategoriesData = () => {
    return eventCategories.map((item) => ({ title: item.name, value: item.id }));
  };

  const validateFields = () => {
    let newLog = {};
    let errorCount = 0;

    if (!data.event) {
      newLog.event = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.event = '';
    }

    if (!data.title) {
      newLog.title = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.title = '';
    }

    if (!data.subtitle) {
      newLog.subtitle = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.subtitle = '';
    }

    if (!data.slug) {
      newLog.slug = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.slug = '';
    }

    if (!data.source) {
      newLog.source = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.source = '';
    }

    setLog(newLog);

    if (errorCount === 0) next();
  };

  return (
    <div>
      <S.Subtitle>Lista de Presentes em Dinheiro</S.Subtitle>

      <S.Text>
        Escolha no mínimo 4 presentes para seguir. <br />
        Você pode editar, criar e adicionar mais presentes.
      </S.Text>

      <S.WrapperForm>
        {eventCategories && (
          <Select
            label="Evento"
            messageError={log.event}
            data={getEventCategoriesData(eventCategories)}
            value={data.event || ''}
            onChange={(value) => {
              getData({ event: value });
              value === ''
                ? setLog({ ...log, event: '* Campo obrigatório' })
                : setLog({ ...log, event: '' });
            }}
          />
        )}

        <Input
          label="Título"
          type="text"
          check={log.title === ''}
          messageError={log.title}
          value={data.title}
          onChange={(value) => {
            getData({ title: value });
            value === ''
              ? setLog({ ...log, title: '* Campo obrigatório' })
              : setLog({ ...log, title: '' });
          }}
        />

        <Input
          label="Subtítulo"
          type="text"
          messageError={log.subtitle}
          check={log.subtitle === ''}
          value={data.subtitle}
          onChange={(value) => {
            getData({ subtitle: value });
            value === ''
              ? setLog({ ...log, subtitle: '* Campo obrigatório' })
              : setLog({ ...log, subtitle: '' });
          }}
        />

        <InputUrl
          label="URL - Link do seu site"
          url="https://sites.mimon.com.br/"
          messageError={log.slug}
          check={log.slug === ''}
          value={data.slug}
          onBlur={(value) => {
            getData({ slug: value });
            value === ''
              ? setLog({ ...log, slug:'* O link www.mimon.com.br/aaaaa está em uso, por favor, crie outro' })
              : setLog({ ...log, slug: '' });
          }}
        />

        <Select
          label="Como nos conheceu?"
          messageError={log.source}
          data={socialMediaList}
          value={data.source || ''}
          onChange={(value) => {
            getData({ source: value });
            value === ''
              ? setLog({ ...log, source: '* Campo obrigatório' })
              : setLog({ ...log, sourceSocialMedia: '' });
          }}
        />
      </S.WrapperForm>

      <Button text="Próximo" onClick={validateFields} isLoading={isLoading} />
    </div>
  );
};

export default Step1;
