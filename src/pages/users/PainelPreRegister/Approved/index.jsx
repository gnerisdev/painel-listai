import EventCreate from './EventCreate';
import * as S from './style';

const Approved = ({preRegisterInfo }) => {
  return (
    <S.ContentInfo>
      {
        !preRegisterInfo.hasEventInfo 
          ? (
            <>
              <h3>🎉 Agora, vamos criar o seu site de convite!</h3>
              <p>
                Sua compra foi aprovada com sucesso! ✅  <br />
                Agora é hora de transformar sua festa em uma experiência inesquecível.
              </p>
              <br />
              <h3>Preencha o formulário a seguir:</h3>
              <EventCreate email={preRegisterInfo.email} />
            </>
          ) :(
            <div style={{ textAlign: 'center' }}>
              <h3>🎉 As informações iniciais do seu evento foram preenchidas com sucesso!</h3>
              <p>Aguarde enquanto finalizamos a criação da sua lista personalizada.</p>

              <S.WhatsAppButton
                href="https://wa.me/5599999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp"></i> Fale conosco pelo WhatsApp
              </S.WhatsAppButton>
            </div>
          )
      }
    </S.ContentInfo>
  );
};

export default Approved;