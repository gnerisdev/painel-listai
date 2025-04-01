import { useState } from 'react';
import * as S from './style';
import Button from 'components/Button';

const Filter = ({ fields, onSearch }) => {
  const [filters, setFilters] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <S.WrapperSearch onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 8 }}>Filtro</h3>
      <S.WrapperInput>
        {fields.map((field) => (
          <S.SearchField key={field.name}>
            <label htmlFor={field.name}>{field.label}:</label>
            <S.Input
              type="text"
              id={field.name}
              name={field.name}
              value={filters[field.name]}
              onChange={handleInputChange}
            />
          </S.SearchField>
        ))}
      </S.WrapperInput>

      <S.WrapperButton>
        <Button text="Buscar" type="button" />
      </S.WrapperButton>
    </S.WrapperSearch>
  );
};

export default Filter;
