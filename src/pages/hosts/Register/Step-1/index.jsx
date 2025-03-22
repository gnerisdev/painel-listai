import { useState } from 'react';
import Input from 'components/Input';
import Select from 'components/Select';
import InputUrl from 'components/InputUrl';
import * as S from './style';
import Button from 'components/Button';

const socialMediaList = [
  { title: 'Facebook', value: 'facebook' },
  { title: 'Instagram', value: 'instagram' },
  { title: 'Twitter', value: 'twitter' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'TikTok', value: 'tiktok' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'WhatsApp', value: 'whatsapp' },
];

const Step1 = ({ getData, data, next }) => {
  const [log, setLog] = useState({
    event: null,
    title: null,
    subtitle: null,
    url: null,
    sourceSocialMedia: null,
  });

  const [eventList, setEventList] = useState([
    { title: 'Casamento', value: 'casamento' },
    { title: 'Aniversário', value: 'aniversário' },
    { title: 'Chá de cozinha', value: 'chá de cozinha' },
  ]);

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
  
    if (!data.url) {
      newLog.url = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.url = '';
    }
  
    if (!data.sourceSocialMedia) {
      newLog.sourceSocialMedia = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.sourceSocialMedia = '';
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
        <Select
          label="Evento"
          messageError={log.event}
          data={eventList}
          value={data.event || ''}
          onChange={(value) => {
            getData({ event: value });
            value === ''
              ? setLog({ ...log, event: '* Campo obrigatório' })
              : setLog({ ...log, event: '' });
          }}
        />

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
          messageError={log.url}
          check={log.url === ''}
          value={data.url}
          onBlur={(value) => {
            getData({ url: value });
            value === ''
              ? setLog({ ...log, url: '* O link www.mimon.com.br/aaaaa está em uso, por favor, crie outro' })
              : setLog({ ...log, url: '' });
          }}
        />

        <Select
          label="Como nos conheceu?"
          messageError={log.sourceSocialMedia}
          data={socialMediaList}
          value={data.socialMediaList || ''} 
          onChange={(value) => {
            getData({ sourceSocialMedia: value });
            value === ''
              ? setLog({ ...log, sourceSocialMedia: '* Campo obrigatório' })
              : setLog({ ...log, sourceSocialMedia: '' });
          }}
        />
      </S.WrapperForm>

      <Button text="Próximo" onClick={validateFields} />
    </div>
  );
}

export default Step1;