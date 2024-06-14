import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';

const ImagePerfil = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = JSON.parse(sessionStorage.getItem('user'))

  useEffect(() => {
    const fetchImage = async () => {

      try {
        const response = await api.get('barbearias/get-image-perfil', {
          headers: {
            'Authorization': token
          },
          responseType: 'arraybuffer'
        });

        const blob = new Blob([response.data], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
        setLoading(false);
      } catch (error) {
        setError('Erro ao buscar a imagem');
        setLoading(false);
      }
    };

    fetchImage();
  }, []); 

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <img src={imageSrc} alt="Imagem de Perfil" />
    </div>
  );
};

export default ImagePerfil;
