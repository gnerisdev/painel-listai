import React, { useRef, useState } from 'react';
import * as S from './style';

const UploadImage = ({ onFileUpload }) => {
  const inputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      if (onFileUpload) {
        onFileUpload(file); 
      }
    }
  };

  return (
    <S.UploadImageWrapper>
      <S.UploadImageContainer>
        {previewImage ? (
          <S.ImagePreview src={previewImage} alt="Preview" onClick={() => inputRef.current.click()} />
        ) : (
          <S.UploadImageLabel htmlFor="file">
            <S.UploadIcon className="fa-solid fa-upload" />
            <S.UploadImageText>Fazer Uploads</S.UploadImageText>
          </S.UploadImageLabel>
        )}
        <S.UploadImageInput
          type="file"
          accept="image/*"
          id="file"
          ref={inputRef}
          onChange={handleFileChange}
        />
      </S.UploadImageContainer>
    </S.UploadImageWrapper>
  );
};

export default UploadImage;