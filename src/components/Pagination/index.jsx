import * as S from './style';

// currentPage: number;
// totalPages: number;
// onPageChange: (page: number) => void;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <S.Wrapper>
      <S.PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </S.PaginationButton>

      <span>Página {currentPage} de {totalPages}</span>

      <S.PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima
      </S.PaginationButton>
    </S.Wrapper>
  );
};

export default Pagination;
