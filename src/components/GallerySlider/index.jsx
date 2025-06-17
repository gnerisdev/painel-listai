import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import * as S from './style';

const GallerySlider = ({ gallery }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!gallery?.length) return null;

  const renderMedia = (item, index) => {
    const isVideo = item.type?.includes('video') || item.url?.match(/\.(mp4|webm|ogg)$/i);

    if (isVideo) {
      return (
        <video
          src={item.url}
          controls
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      );
    }

    return <S.SlideImage src={item.url} alt={`Slide ${index + 1}`} />;
  };

  return (
    <S.Embla>
      <S.EmblaViewport ref={emblaRef}>
        <S.EmblaContainer>
          {gallery.map((item, index) => (
            <S.EmblaSlide key={index}>
              {renderMedia(item, index)}
            </S.EmblaSlide>
          ))}
        </S.EmblaContainer>
      </S.EmblaViewport>

      <S.EmblaButton className="fa-solid fa-angle-left" onClick={scrollPrev} />
      <S.EmblaButton className="fa-solid fa-angle-right" onClick={scrollNext} />
    </S.Embla>
  );
};

export default GallerySlider;
