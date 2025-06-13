import { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import * as S from './style';

const Step3 = ({ data, isLoading, getData, next }) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

  const [log, setLog] = useState({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    password: null,
    url: null,
    sourceSocialMedia: null,
  });

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})/, '$1-$2')
      .substring(0, 15);
  };

  const validateFields = () => {
    const newLog = { ...log };
    let errorCount = 0;

    if (!data.firstName) {
      newLog.firstName = '* Campo obrigatório';
      errorCount++;
    } else {
      newLog.firstName = '';
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

    if (!data.password) {
      newLog.password = '* Campo obrigatório';
      errorCount++;
    } else if (!passwordRegex.test(data.password)) {
      newLog.password = '* A senha precisa ter no mínimo 8 caracteres, pelo menos uma letra e um número.';
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
    
    if (errorCount === 0) next();
  };

  return (
    <div>
      <S.Subtitle>Informações do Cadastro</S.Subtitle>
      <S.Text>Preencha as informações de cadastro e sua lista está pronta.</S.Text>

      <S.WrapperForm>
        <S.Row style={{ display: 'grid' }}>
          <Input
            label="Nome"
            value={data.firstName}
            check={log.firstName === ''}
            messageError={log.firstName}
            onChange={(value) => {
              getData({ firstName: value });
              value === ''
                ? setLog({ ...log, firstName: '* Campo obrigatório' })
                : setLog({ ...log, firstName: '' });
            }}
          />

          <Input
            label="Sobrenome"
            value={data.lastName}
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
          value={data.phoneNumber}
          messageError={log.phoneNumber}
          check={log.phoneNumber === ''}
          onChange={(value) => {
            getData({ ...data, phoneNumber: formatPhone(value) });
            if (!phoneRegex.test(formatPhone(value))) {
              setLog({ ...log, phoneNumber: '* Número inválido' });
              return;
            }
            setLog({ ...log, phoneNumber: '' });
          }}
        />

        <Input
          label="E-mail"
          type="email"
          value={data.email}
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
            value={data.password}
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
            value={data.confirmPassword}
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

      <Button text="Finalizar" onClick={validateFields} isLoading={isLoading} />
    </div>
  );
};

export default Step3;