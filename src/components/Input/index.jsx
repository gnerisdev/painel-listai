import * as S from './style';

const Input = ({
  placeholder,
  type,
  label,
  check,
  value,
  messageError,
  onChange,
  onBlur,
  disabled,
}) => {
  return (
    <div>
      <S.Label>{label}</S.Label>
      <S.WrapperInput>
        {type !== 'textarea' ? (
          <S.Input
            placeholder={placeholder}
            type={type}
            onBlur={onBlur ? (e) => onBlur(e.target.value) : undefined}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            value={value}
            disabled={disabled}
          />
        ) : (
          <S.Textarea
            placeholder={placeholder}
            type={type}
            onBlur={onBlur ? (e) => onBlur(e.target.value) : undefined}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            value={value}
            disabled={disabled}
          />
        )}

        {check &&
          <S.WrapperIcons>
            <S.Check className="fa-solid fa-check" />
          </S.WrapperIcons>
        }
      </S.WrapperInput>

      {messageError && <S.MessageError>{messageError}</S.MessageError>}
    </div>
  );
};

export default Input;
