import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Embla,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  EmblaButton,
  SlideImage,
} from './style';

const GallerySlider = ({ gallery }) => {
  console.log(gallery)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!gallery?.length) return null;

  return (
    <Embla>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {gallery.map((item, index) => (
            <EmblaSlide key={index}>
              <SlideImage src={item.url} alt={`Slide ${index + 1}`} />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaViewport>

      <EmblaButton className="fa-solid fa-angle-left" onClick={scrollPrev} />
      <EmblaButton className="fa-solid fa-angle-right" onClick={scrollNext} />
    </Embla>
  );
};

export default GallerySlider;
