import { useEffect, useState } from 'react';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import * as S from './style';

const Info = ({ event }) => {
  const [urlMap, setUrlMap] = useState(null);

  useEffect(() => {
    const loadMapUrl = async () => {
      if (event?.details?.latitude && event?.details?.longitude) {
        setUrlMap(`/marker-map.html?lat=${event?.details?.latitude}&lon=${event?.details?.longitude}`);
        return;
      }

      if (!event?.details?.fullAddress) return;

      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(event.details.fullAddress)}`;
        const response = await fetch(url);
        const places = await response.json();
        if (!places || places.length === 0) return;

        console.log(places)
        setUrlMap(`/marker-map.html?lat=${places[0].lat}&lon=${places[0].lon}`);
      } catch (error) {
        console.error('Erro ao buscar coordenadas com fetch:', error);
      }
    };

    loadMapUrl();
  }, []);


  return (
    <S.SectionInfo>
      <Container>
        <S.TitleSection style={{ color: 'var(--primary-color)' }}>
          Informações do Evento
        </S.TitleSection>

        <div className="content" style={{ color: 'var(--primary-color)' }}>
          <div className="text-info">
            <span className="fa-regular fa-calendar"></span>
            <p>
              {event?.details?.eventDate
                ? ApplicationUtils.formatDate(event.details.eventDate, false)
                : "A definir"
              }
            </p>
          </div>

          <div className="text-info">
            <span className="fa-regular fa-clock"></span>
            <p>
              {event?.details?.startTime && event?.details?.endTime
                ? `${ApplicationUtils.formatToInputTime(event.details.startTime)} às ${ApplicationUtils.formatToInputTime(event.details.endTime)}`
                : "A definir"}
            </p>
          </div>

          {event?.details?.eventType === 'virtual' && (
            <div className="text-info">
              <span className="fa-solid fa-wifi" style={{ fontSize: 32 }} />
              <div>
                <strong>{event.details.transmission}</strong>
                <p>Link:{" "}
                  <a href={event.details.transmissionLink}>
                    {event.details.transmissionLink}
                  </a>
                </p>
                <p>Senha: {event.details.transmissionPassword}</p>
              </div>
            </div>
          )}

          {event?.details?.eventType === 'in-person' && (
            <>
              <div className="text-info">
                <span className="fa-solid fa-location-dot"></span>
                <div>
                  <p>{event.details.fullAddress}</p>
                  <p>Cep: {event.details.postalCode}</p>
                  <p>Local do evento: {event.details.eventLocation}</p>
                </div>
              </div>

              {urlMap && (
                <iframe
                  width="100%"
                  height="350"
                  src={urlMap}
                  style={{ border: 'none' }}
                  title="mapa"
                />
              )}
            </>
          )}
        </div>
      </Container>
    </S.SectionInfo>
  );
};

export default Info;