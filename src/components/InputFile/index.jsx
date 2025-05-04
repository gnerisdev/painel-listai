import { useState, useEffect } from 'react';
import * as S from './style';

const InputFile = ({
  placeholder,
  label,
  messageError,
  accept,
  onChange,
  disabled,
  defaultPreviewUrl,
}) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!file && defaultPreviewUrl) {
      setPreviewUrl((prevUrl) => {
        if (prevUrl?.startsWith('blob:')) URL.revokeObjectURL(prevUrl);
        return defaultPreviewUrl;
      });
    }
  }, [defaultPreviewUrl, file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);

    setFile(selectedFile);
    onChange && onChange(e.target.files);

    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl('');
    }
  };

  const handleRemoveFile = () => {
    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(null);
    setPreviewUrl('');
    onChange && onChange(null);
  };

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div>
      {label && <S.Label>{label}</S.Label>}

      <S.WrapperInput>
        <S.Input
          placeholder={placeholder}
          type="file"
          accept={accept || "*/*"}
          onChange={handleFileChange}
          disabled={disabled}
        />
      </S.WrapperInput>

      {previewUrl && (
        <S.PreviewFile>
          <img
            src={previewUrl}
            alt="Pré-visualização"
            style={{ maxWidth: '100%', maxHeight: 80, borderRadius: 8 }}
          />
          <S.ButtonClose
            type="button"
            onClick={handleRemoveFile}
            title="Remover imagem"
            className="fa-solid fa-xmark"
          />
        </S.PreviewFile>
      )}

      {messageError && <S.MessageError>{messageError}</S.MessageError>}
    </div>
  );
};

export default InputFile;
