import { useEffect } from 'react';
import Logo from 'assets/logo-2.png';
import * as S from './style';

const LoadingLogo = () => {
  const injectAnimationStyle = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  };
  
  useEffect(() => {
    injectAnimationStyle();
  }, []);

  return (
    <S.Wrapper>
      <S.SpinnerWrapper>
        <S.Spinner />
        <S.LogoImg src={Logo} alt="Logo ListAi" />
      </S.SpinnerWrapper>
    </S.Wrapper>
  );
};

export default LoadingLogo;