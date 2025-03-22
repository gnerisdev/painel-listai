import { useState } from 'react';
import Input from 'components/Input';
import * as S from './style';
import Button from 'components/Button';

const Step3 = ({ data, getData }) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phoneRegex = /^(\d{2})?(\s?\(?\d{2}\)?[\s\-]?)?\d{4}[\s\-]?\d{4}$/;
  const passwordRegex = /^(?=.*[a-zA-Z]).{8,}$/;

  const [log, setLog] = useState({
    name: null,
    lastName: null,
    phoneNumber: null,
    password: null,
    url: null,
    sourceSocialMedia: null,
  });

  const validateFields = () => {
    const newLog = { ...log }; 
    let errorCount = 0;
    
    if (!data.name) {
      newLog.name = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.name = '';
    }
  
    if (!data.lastName) {
      newLog.lastName = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.lastName = '';
    }
  
    if (!data.phoneNumber) {
      newLog.phoneNumber = '* Campo obrigatório';
      errorCount++;
    } else if (!phoneRegex.test(data.phoneNumber)) {
      newLog.phoneNumber = '* Formato de telefone inválido';
      errorCount++;
    } else {
      newLog.phoneNumber = '';
    }
  
    if (!data.email) {
      newLog.email = '* Campo obrigatório';
      errorCount++;
    } else if (!emailRegex.test(data.email)) {
      newLog.email = '* Formato de e-mail inválido';
      errorCount++;
    } else {
      newLog.email = '';
    }
  
    if (!data.password ) {
      newLog.password = '* Campo obrigatório';
      errorCount++;
    } else if (!passwordRegex.test(data.password)) {
      newLog.password = '* A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial';
      errorCount++;
    } else {
      newLog.password = '';
    }
  
    if (!data.confirmPassword) {
      newLog.confirmPassword = '* Campo obrigatório';
      errorCount++;
    } else if (data.confirmPassword !== data.password) {
      newLog.confirmPassword = '* As senhas não coincidem';
      errorCount++;
    } else {
      newLog.confirmPassword = '';
    }
  
    setLog(newLog);
  
  };
  
  return (
    <div>
      <S.Subtitle>Informações do Cadastro</S.Subtitle>
      <S.Text>Preencha as informações de cadastro e sua lista está pronta.</S.Text>

      <S.WrapperForm>
        <S.Row style={{ display: 'grid' }}>
          <Input
            label="Nome"
            check={log.name === ''}
            messageError={log.name}
            onChange={(value) => {
              getData({ name: value });
              value === ''
                ? setLog({ ...log, name: '* Campo obrigatório' })
                : setLog({ ...log, name: '' });
            }}
          />

          <Input
            label="Sobrenome"
            check={log.lastName === ''}
            messageError={log.lastName}
            onChange={(value) => {
              getData({ lastName: value });
              value === ''
                ? setLog({ ...log, lastName: '* Campo obrigatório' })
                : setLog({ ...log, lastName: '' });
            }}
          />
        </S.Row>

        <Input
          label="Celular"
          type="tel"
          messageError={log.phoneNumber}
          check={log.phoneNumber === ''}
          onChange={(value) => {
            getData({ phoneNumber: value });
            if (!phoneRegex.test(value)) {
              setLog({ ...log, phoneNumber: '* E-mail inválido' });
              return;
            }
            setLog({ ...log, phoneNumber: '' });
          }}
        />

        <Input
          label="E-mail"
          type="email"
          messageError={log.email}
          check={log.email === ''}
          onChange={(value) => {
            getData({ email: value });           
            if (!emailRegex.test(value)) {
              setLog({ ...log, email: '* E-mail inválido' });
              return;
            }
            setLog({ ...log, email: '' });
          }}
        />

        <S.Row style={{ display: 'grid' }}>
          <Input
            label="Senha"
            type="password"
            check={log.password === ''}
            messageError={log.password}
            onChange={(value) => {
              getData({ password: value });
              value === ''
                ? setLog({ ...log, password: '* Campo obrigatório' })
                : setLog({ ...log, password: '' });
            }}
          />

          <Input
            label="Confirmar senha"
            type="password"
            check={log.confirmPassword === ''}
            messageError={log.confirmPassword}
            onChange={(value) => {
              getData({ confirmPassword: value });
              if (value !== data?.password) {
                setLog({ ...log, confirmPassword: '* As senhas não coincidem' });
              } else {
                setLog({ ...log, confirmPassword: '' });
              }
            }}
          />
        </S.Row>
      </S.WrapperForm>

      <Button text="Próximo" onClick={validateFields} />
    </div>
  );
};

export default Step3;