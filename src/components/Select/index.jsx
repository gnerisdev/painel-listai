import * as S from './style'

// Data: { title: string, value: any }

const Select = ({ label, messageError, data, value, onBlur, onChange }) => {
  return (
    <div>
      <S.Label>{label}</S.Label>
      <S.WrapperInput>
        <S.Select
          onBlur={onBlur ? (e) => onBlur(e.target.value) : undefined}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          value={value}
        >
          <option value='' disabled key="item-0">Selecione</option>
          {data?.map((item) => (
            <option value={item.value} key={item.value}>{item.title}</option>
          ))}
        </S.Select>

        <S.WrapperIcons>
          <span>▲</span>
          <span>▼</span>
        </S.WrapperIcons>
      </S.WrapperInput>

      {messageError && <S.MessageError>{messageError}</S.MessageError>}
    </div>
  )
}

export default Select
