import React, { useRef, useState } from 'react';
import * as S from './style';
import imageCompression from 'browser-image-compression';

const UploadImage = ({ onFileUpload }) => {
  const inputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(compressedFile);
      
      if (onFileUpload) {
        onFileUpload(compressedFile);
      }
    } catch (error) {      
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