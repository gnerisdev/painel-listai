const naviagtionItems = {
  menuItems: [
    {
      icon: 'fa-solid fa-gift',
      label: 'Presentes recebidos',
      link: '/gifts-received'
    },
    {
      icon: 'fa-solid fa-check-square',
      label: 'Confirmação de presença',
      link: '/confirmations',
    },
    { icon: 'fa-solid fa-comment-dots', label: 'Recados', link: '/messages' },
    { icon: 'fa-solid fa-right-from-bracket', label: 'Sair', link: '/logout' },
  ],
  cardItems: [
    {
      title: 'Cores e Textos',
      text: 'Deixe o site do seu evento com a sua cara',
      icon: 'fa-solid fa-pen-to-square',
      color: '#a0d468',
      link: '/custom',
    },
    {
      title: 'Galeria de Fotos e Vídeos',
      text: 'Compartilhe momentos inesquecíveis',
      icon: 'fa-regular fa-image',
      color: '#5d9cec',
      link: '/gallery',
    },
    {
      title: 'Informações do Evento',
      text: 'Tudo em um só lugar para seu convidado',
      icon: 'fa-regular fa-calendar',
      color: '#ac92eb',
      link: '/info',
    },
    {
      title: 'Lista de Presentes',
      text: 'Adicione mais detalhes ao seu site',
      icon: 'fa-solid fa-gift',
      color: '#ff779d',
      link: '/gifts',
    },
    {
      title: 'Pacote de Serviços',
      text: 'Serviços para personalizar ainda mais o seu site',
      icon: 'fa-solid fa-box',
      color: '#77d5b2',
      link: '/service-package',
    },
    {
      title: 'Configurações do Site',
      text: 'Segurança e praticidade em primeiro lugar',
      icon: 'fa-solid fa-gear',
      color: '#1d304c',
      link: '/settings',
    },
    {
      title: 'Compartilhar o Seu Site',
      text: 'Clique para compartilhar com os amigos e familiares',
      icon: 'fa-regular fa-paper-plane',
      color: '#1d304c',
      link: '/shared-whatsapp',
    },
  ]
};

export default naviagtionItems;
