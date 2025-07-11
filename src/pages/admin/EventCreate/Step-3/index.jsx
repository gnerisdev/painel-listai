import { useState } from 'react';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_NUMBER_REGEX } from 'constants/Regexs';
import Input from 'components/Input';
import Button from 'components/Button';
import * as S from './style';

const Step3 = ({ data, isLoading, getData, next }) => {
  const [log, setLog] = useState({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    password: null,
    url: null,
    sourceSocialMedia: null,
  });

  const handleInput = (name, value) => {
    if (name === 'phoneNumber') value = ApplicationUtils.formatPhone(value);
    
    getData({ ...data, [name]: value });
    
    if (name === 'email') {
      !EMAIL_REGEX.test(value)
        ? setLog({ ...log, email: '* E-mail inválido' })
        : setLog({ ...log, email: '' });
    } else  if (name === 'phoneNumber') {
      !PHONE_NUMBER_REGEX.test(ApplicationUtils.formatPhone(value))
        ? setLog({ ...log, phoneNumber: '* Número inválido' })
        : setLog({ ...log, phoneNumber: '' });
      return;
    } else if (name === 'confirmPassword') {
      value !== data?.password
        ? setLog({ ...log, confirmPassword: '* As senhas não coincidem' })
        : setLog({ ...log, confirmPassword: '' });
      return;
    } else {
      value === ''
        ? setLog({ ...log, [name]: '* Campo obrigatório' })
        : setLog({ ...log, [name]: '' });
    }
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
    } else if (!PHONE_NUMBER_REGEX.test(data.phoneNumber)) {
      newLog.phoneNumber = '* Formato de telefone inválido';
      errorCount++;
    } else {
      newLog.phoneNumber = '';
    }

    if (!data.email) {
      newLog.email = '* Campo obrigatório';
      errorCount++;
    } else if (!EMAIL_REGEX.test(data.email)) {
      newLog.email = '* Formato de e-mail inválido';
      errorCount++;
    } else {
      newLog.email = '';
    }

    if (!data.password && !data.useUserPassword) {      
      newLog.password = '* Campo obrigatório';
      errorCount++;
    } else if (!PASSWORD_REGEX.test(data.password) && !data.useUserPassword) {
      newLog.password = '* A senha precisa ter no mínimo 8 caracteres, pelo menos uma letra e um número.';
      errorCount++;
    } else {
      newLog.password = '';
    }

    if (!data.confirmPassword && !data.useUserPassword) {
      newLog.confirmPassword = '* Campo obrigatório';
      errorCount++;
    } else if (data.confirmPassword !== data.password && !data.useUserPassword) {
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

      <S.WrapperForm>
        <S.Row style={{ display: 'grid' }}>
          <Input
            label="Nome"
            value={data.firstName}
            check={log.firstName === ''}
            messageError={log.firstName}
            onChange={(value) => handleInput('firstName', value)}
          />

          <Input
            label="Sobrenome"
            value={data.lastName}
            check={log.lastName === ''}
            messageError={log.lastName}
            onChange={(value) => handleInput('lastName', value)}
          />
        </S.Row>

        <Input
          label="Celular"
          type="tel"
          value={data.phoneNumber}
          messageError={log.phoneNumber}
          check={log.phoneNumber === ''}
          onChange={(value) => handleInput('phoneNumber', value)}
        />

        <Input
          label="E-mail"
          type="email"
          value={data.email}
          messageError={log.email}
          check={log.email === ''}
          onChange={(value) => handleInput('email', value)}
        />

        {!data.useUserPassword && (
          <S.Row style={{ display: 'grid' }}>
            <Input
              label="Senha"
              type="password"
              value={data.password}
              check={log.password === ''}
              messageError={log.password}
              onChange={(value) => handleInput('password', value)}
            />

            <Input
              label="Confirmar senha"
              type="password"
              value={data.confirmPassword}
              check={log.confirmPassword === ''}
              messageError={log.confirmPassword}
              onChange={(value) => handleInput('confirmPassword', value)}
            />
          </S.Row>
        )}

        {data.preUserRequestId && (
          <S.LabelOption>
            <S.Checkbox 
              type="checkbox" 
              checked={data.useUserPassword}
              onChange={(e) => getData({ useUserPassword: e.target.checked })}
            />
            Utilizar a senha cadastrada pelo usuário
          </S.LabelOption>
        )}
      </S.WrapperForm>

      <Button text="Finalizar" onClick={validateFields} isLoading={isLoading} />
    </div>
  );
};

export default Step3;