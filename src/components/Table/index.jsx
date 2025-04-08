import React, { useState } from 'react';
import * as S from './style';

// columns[] { label: String, name: string }
// actions[] { label: string, onClick: function }

const Table = ({ columns, data, actions }) => {
  const [openDropdown, setOpenDropdown] = useState(null); 

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <S.Wrapper>
      {data && (
        <S.Table>
          <S.TableHeader>
            <tr>
              {columns.map((column, index) => <th key={index}>{column.label}</th>)}
              <th>Opções</th>
            </tr>
          </S.TableHeader>

          <S.TableBody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => <td key={colIndex}>{row[column.name]}</td>)}

                <td>
                  <S.DotsButton type="button" onClick={() => toggleDropdown(rowIndex)}>
                    <i className="fa-solid fa-sort-down"></i>
                  </S.DotsButton>
                  {openDropdown === rowIndex && (
                    <S.Dropdown>
                      {actions.map((action, index) => (
                        <S.DropdownItem 
                          key={index} 
                          onClick={() => action.onClick(row)} 
                          dangerouslySetInnerHTML={{ __html: action.label }}
                        />
                      ))}
                    </S.Dropdown>
                  )}
                </td>
              </tr>
            ))}
          </S.TableBody>
        </S.Table>
      )}
    </S.Wrapper>
  );
};

export default Table;
