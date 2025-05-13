import { useState, useEffect } from 'react';
import Button from 'components/Button';
import * as S from './style';

const Filter = ({ fields, onSearch, filterValues, isLoading }) => {
  const [filters, setFilters] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
  );

  const [isOpen, setIsOpen] = useState(false); // começa recolhido

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (Object.keys(filterValues).length > 0) setFilters(filterValues);
  }, [filterValues]);

  return (
    <S.WrapperSearch>
      <S.ToggleButton onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? 'Esconder Filtro' : 'Mostrar Filtro'}
        <span
          className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}
          style={{ marginLeft: 8 }}
        />
      </S.ToggleButton>

      {isOpen && (
        <>
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

                {field.type === 'number' && (
                  <S.Input
                    type="number"
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
                    id={field.name}
                    name={field.name}
                    value={filters[field.name]}
                    onChange={handleInputChange}
                  >
                    {field?.options?.map((item) => (
                      <option key={item.value} value={item.value}>
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
              maxWidth='200px'
              type="button"
              text="Buscar"
              isLoading={isLoading}
              onClick={() => onSearch(filters)}
            />
          </S.WrapperButton>
        </>
      )}
    </S.WrapperSearch>
  );
};

export default Filter;
