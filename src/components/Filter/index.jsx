import { useState, useEffect } from 'react';
import Button from 'components/Button';
import * as S from './style';

const Filter = ({ fields, onSearch, filterValues, isLoading }) => {
  const [filters, setFilters] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (Object.keys(filterValues).length > 0) {
      setFilters(filterValues);
    }
  }, [])

  return (
    <S.WrapperSearch>
      <h3 style={{ marginTop: 8 }}>Filtro</h3>
      <S.WrapperInput>
        {fields.map((field) => (
          <S.SearchField key={field.name}>
            <label htmlFor={field.name}>{field.label}:</label>
            {(field.type === 'text' || !field.type) && (
              <S.Input
                type="text"
                id={field.name}
                name={field.name}
                value={filters[field.name]}
                onChange={handleInputChange}
              />
            )}

            {field.type === 'date' && (
              <S.Input
                type="date"
                id={field.name}
                name={field.name}
                value={filters[field.name]}
                onChange={handleInputChange}
              />
            )}

            {field.type === 'select' && (
              <S.Select
                type="date"
                id={field.name}
                name={field.name}
                value={filters[field.name]}
                onChange={handleInputChange}
              >
                {field?.options?.map((item) => (
                  <option key={item.value} value={item}>
                    {item.label}
                  </option>
                ))}
              </S.Select>
            )}
          </S.SearchField>
        ))}
      </S.WrapperInput>

      <S.WrapperButton>
        <Button 
          isLoading={isLoading} 
          text="Buscar" 
          type="button" 
          onClick={() => onSearch(filters)} 
        />
      </S.WrapperButton>
    </S.WrapperSearch>
  );
};

export default Filter;
