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
              <th style={{ textAlign: 'center' }}>Opções</th>
            </tr>
          </S.TableHeader>

          <S.TableBody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => <td key={colIndex}>{row[column.name]}</td>)}

                <td style={{ textAlign: 'center' }}>
                  <S.DotsButton type="button" onClick={() => toggleDropdown(rowIndex)}>
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z" fill="#000000"></path> <path d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" fill="#000000"></path> <path d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z" fill="#000000"></path> </g>
                    </svg>
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

      {(!data || data.length === 0) && (
        <S.NotFoundData>
          <i className="fa-solid fa-circle-info icon"></i>
          <span>Nenhum dado disponível na tabela</span>
        </S.NotFoundData>
      )}

    </S.Wrapper>
  );
};

export default Table;
