import { useRef, useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import Button from 'components/Button';
import * as S from './style';

const UploadImage = ({ onFileUpload, previewUrl, messageError }) => {
  const inputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const options = { maxSizeMB: 5, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();

      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(compressedFile);
      
      if (onFileUpload) onFileUpload(compressedFile);
    } catch (error) {      
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      
      if (onFileUpload) onFileUpload(file);
    }
  };

  useEffect(() => {
    setPreviewImage(previewUrl);
  }, [previewUrl]);

  return (
    <S.UploadImageWrapper>
      <S.UploadImageContainer>
        {previewImage ? (
          <S.WrapperPreview>
            <S.ImagePreview src={previewImage} alt="Preview" />
            <Button               
              onClick={() => inputRef.current.click()} 
              text="Nova imagem"
            />
          </S.WrapperPreview>
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

      <S.MessageError>{messageError}</S.MessageError>
    </S.UploadImageWrapper>
  );
};

export default UploadImage;