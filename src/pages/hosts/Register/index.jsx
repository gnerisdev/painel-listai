import { useState } from 'react';
import { ApiService } from 'services/api.service';
import Container from 'components/Container';
import Step1 from './Step-1';
import Step2 from './Step-2';
import Step3 from './Step-3';
import * as S from './style';

export default function Login() {
  const apiService = new ApiService(false);

  const [loading, setLoading] = useState(false);
  const [stepCurrent, setStepCurrent] = useState('step1');
  const [data, setData] = useState({});

  const submit = async (e) => {
    try {

      const response = await apiService.post('/hosts/login', data);

      // if (!response.data.success) return toast.error(response.data.message);

      localStorage.setItem('id', JSON.stringify(response.data.id));
      localStorage.setItem('hostToken', JSON.stringify(response.data.token));

      console.log(response.data);
    } catch (e) {
      console.log(e);
      // setAlert({ show: true, title: 'Login', text: 'Dados inválidos' });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    console.log(data)
    if (stepCurrent === 'step1') setStepCurrent('step2');
    if (stepCurrent === 'step2') setStepCurrent('step3');
    if (stepCurrent === 'step3') submit();
  };

  return (
    <S.Main>
      <Container>
        <S.Logo
          src="https://painel.mimon.com.br/assets/logos/mimon.png"
          alt="Logomarca"
        />

        <S.Steps>
          <span 
            className={`${stepCurrent === 'step1' ? 'stepCurrent' : ''}`} 
            onClick={() => setStepCurrent('step1')}
          >
          </span>
          <span 
            className={`${stepCurrent === 'step2' ? 'stepCurrent' : ''}`} 
            onClick={() => setStepCurrent('step2')}
          >
          </span>
          <span 
            className={`${stepCurrent === 'step3' ? 'stepCurrent' : ''}`} 
            onClick={() => setStepCurrent('step3')}
          >
          </span>
        </S.Steps>

        {stepCurrent === 'step1' && (
          <Step1 
            data={data} 
            getData={(v) => setData({ ...data, ...v })} 
            next={() => nextStep()}
          />
        )}

        {stepCurrent === 'step2' && (
          <Step2 
            data={data} 
            getData={(v) => setData({ ...data, ...v })} 
            next={() => nextStep()}
          />
        )}

        {stepCurrent === 'step3' && (
          <Step3 data={data} getData={(v) => setData({ ...data, ...v })} />
        )}
      </Container>
    </S.Main>
  );
}
