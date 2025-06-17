import { useState, useEffect } from "react";
import * as S from "./style";

const colors = [
  '#ed5564', 
  '#fc6e51', 
  '#ffce54', 
  '#a0d468', 
  '#77d5b2', 
  '#00f3ff',
  '#5d9cec', 
  '#ac92eb', 
  '#e292eb', 
  '#ff779d', 
  '#f29157', 
  '#1d314c',
  '#000000', 
  '#432070', 
  '#ff3d60', 
  '#f6b080', 
  '#ff5227'
];

const SelectColor = ({ label, messageError, getData, selected }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(10);
  
  useEffect(() => {
    const updateSize = () => setVisibleCount(window.innerWidth <= 768 ? 6 : 10);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getVisibleColors = () => {
    const endIndex = startIndex + visibleCount;
    if (endIndex <= colors.length) {
      return colors.slice(startIndex, endIndex);
    } else {
      return [...colors.slice(startIndex), ...colors.slice(0, endIndex - colors.length)];
    }
  };

  const nextColors = () => {
    setStartIndex((prev) => (prev + visibleCount) % colors.length);
  };

  const prevColors = () => {
    setStartIndex((prev) => (prev - visibleCount + colors.length) % colors.length);
  };

  return (
    <div>
      <S.Label>{label}</S.Label>
      <S.Container>
        <S.Arrow onClick={prevColors} type="button">
          <span className="fa-solid fa-arrow-left"></span>
        </S.Arrow>

        <S.Content>
          {getVisibleColors().map((color, index) => {
            const isSelected = selected.includes(color);
            return (
              <S.Option
                key={index}
                onClick={() => getData(color)}
                style={{ background: color }}
                className={`${isSelected ? 'selected' : ''}`}
              >
                {isSelected && (
                  <span 
                    className="fa-regular fa-circle-check" 
                    style={{ fontSize: 24, color: '#ffffff' }}
                  />
                )}
              </S.Option>
            );
          })}
        </S.Content>

        <S.Arrow onClick={nextColors} type="button">
          <span className="fa-solid fa-arrow-right"></span>
        </S.Arrow>
      </S.Container>

      {messageError && <S.MessageError>{messageError}</S.MessageError>}
    </div>
  );
};

export default SelectColor;
