export class ApplicationUtils {
  static formatPrice(price) {
    if (!price) return;

    return (
      price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ||
      'R$ 0,00'
    );
  }

  static formatToInputPrice = (value) => {
    const numeric = value.replace(/\D/g, '');
    const float = (parseInt(numeric, 10) / 100).toFixed(2);
    return float.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  
  static parsePrice = (value) => {
    if (typeof value === 'number' && value >= 0) return value;
    if (!value) return 0;
    const cleanedValue = value.replace(/\./g, '').replace(',', '.');
    const numericValue = parseFloat(cleanedValue);
    return isNaN(numericValue) ? 0 : numericValue;
  };
  
  static formatDate(dateString, includeTime = true, includeYear = true) {
    const date = new Date(dateString);
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hour = '',
      minutes = '',
      seconds = '';

    if (includeTime) {
      hour = String(date.getHours()).padStart(2, '0');
      minutes = String(date.getMinutes()).padStart(2, '0');
      seconds = String(date.getSeconds()).padStart(2, '0');
    }

    const formattedDate =
      `${day}/${month}${includeYear ? '/' + year : ''}` +
      (includeTime ? ` ${hour}:${minutes}:${seconds}` : '');
    return formattedDate;
  }

  static formatToInputDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  }

  static formatToInputTime(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  static formatToInputPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})/, '$1-$2')
      .substring(0, 15);
  };
  
  static convertHexToRgba(hex, alpha) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const clampedAlpha = Math.min(1, Math.max(0, alpha));
    const rgba = `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
    return rgba;
  }

  static getErrorMessage (error, defaultMessage = "Ocorreu um erro inesperado.") {  
    let message = error?.response?.data?.message || error?.message || defaultMessage;
    if (message === 'Request failed with status code 404') {
      message = 'Algo deu errado. Tente novamente mais tarde!';
    }
    if (message === 'Network Error') message = 'Erro de rede!';
    
    return message;
  };

  static translateServiceType(key) {
    switch (key.toUpperCase()) {
      case 'PASSWORD':
        return 'Senha';
      case 'VIDEO':
        return 'Vídeo';
      case 'IMAGE':
        return 'Imagem';
      case 'PAGE':
        return 'Página';
      case 'EXTRA':
        return 'Extra';
      default:
        return '-';
    }
  }
}
