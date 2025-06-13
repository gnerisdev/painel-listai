import { useState, useContext, useEffect } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import * as S from './style';

const Gallery = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [formData, setFormData] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [videoQuantity, setVideoQuantity] = useState(0);
  const [imageQuantity, setImageQuantity] = useState(0);

  const getGallery = async () => {
    try {
      const response = await apiService.get(`/users/event-gallery/${event.id}`);
      const { gallery, videoQuantity, imageQuantity } = response.data;

      setVideoQuantity(videoQuantity || 0)
      setImageQuantity(imageQuantity || 0)

      if (gallery) setGallery(gallery);
    } catch (error) { }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    if (type === 'image') {
      setImagePreview(previewUrl);
      setVideoPreview(null);
    } else {
      setVideoPreview(previewUrl);
      setImagePreview(null);
    }

    const newFormData = new FormData();
    newFormData.append('file', file);
    newFormData.append('fileType', type);

    setFormData(newFormData);
    setFileType(type);
  };

  const handleRemoveMedia = () => {
    setImagePreview(null);
    setVideoPreview(null);
    setFormData(null);
    setFileType(null);
  };

  const saveFile = async () => {
    if (!formData || !fileType) return;

    try {
      setLoading(true);
      const response = await apiService.post(`/users/event-gallery/${event.id}`, formData, true);
      const { success, message, gallery } = response.data;

      if (!success) throw new Error(message);
      if (gallery) setGallery(gallery);

      setAlert({ show: true, title: 'Sucesso!', icon: 'fa-solid fa-check', text: 'Mídia salva.' });
      handleRemoveMedia();
      getGallery();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao atualizar evento.')
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  const mediaUrl = imagePreview || videoPreview;
  const isImage = !!imagePreview;

  return (
    <main style={{ margin: '72px 0' }}>
      <Container>
        <TitlePage
          title="Galeria de Fotos e Vídeos"
          subtitle="Contrate mais espaço logo abaixo em serviços"
          align="center"
        />

        <S.Content>
          <S.UploadLabel>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'image')}
            />
            <S.Card>
              <S.Icon className="fa-solid fa-camera" />
              <S.Title>ADICIONAR FOTOS</S.Title>
              <S.Subtitle>
                {imageQuantity === 0 
                  ? 'Nenhuma foto incluída' 
                  : `Inclusa${imageQuantity > 1 ? 's' : ''} ${imageQuantity} foto${imageQuantity > 1 ? 's' : ''}`}
              </S.Subtitle>            
            </S.Card>
          </S.UploadLabel>

          <S.UploadLabel>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, 'video')}
            />
            <S.Card>
              <S.Icon className="fa-solid fa-video" />
              <S.Title>ADICIONAR VÍDEO</S.Title>
              <S.Subtitle>
                {videoQuantity === 0 
                  ? 'Nenhum vídeo incluído' 
                  : `${videoQuantity} vídeo${videoQuantity > 1 ? 's' : ''} incluído${videoQuantity > 1 ? 's' : ''}`}
              </S.Subtitle>
            </S.Card>
          </S.UploadLabel>
        </S.Content>

        <br /> <br />

        {mediaUrl && (
          <>
            <S.Description>Clique em upload em cada mídia para salvar.</S.Description>
            <S.Container>
              <S.BlurredBackground src={mediaUrl} alt="blurred" />
              <S.CenterContent>
                {isImage ? (
                  <img src={mediaUrl} alt="Prévia da imagem" />
                ) : (
                  <video src={mediaUrl} controls style={{ maxHeight: '100%' }} />
                )}
              </S.CenterContent>
              <S.Actions>
                <S.Button onClick={handleRemoveMedia}>✕</S.Button>
                <S.Button onClick={saveFile} disabled={loading}>
                  {loading ? '...' : '⬆'}
                </S.Button>
              </S.Actions>
            </S.Container>
          </>
        )}

        {gallery.length > 0 && (
          <>
            <S.GalleryTitle>Mídias salvas</S.GalleryTitle>
            <S.GalleryGrid>
              {gallery.map((item) => (
                <S.GalleryItem key={item.id}>
                  {item.type === 'image' ? (
                    <img src={item.url} alt={`Imagem ${item.id}`} />
                  ) : (
                    <video src={item.url} controls />
                  )}
                </S.GalleryItem>
              ))}
            </S.GalleryGrid>
          </>
        )}
      </Container>
    </main>
  );
};

export default Gallery;
