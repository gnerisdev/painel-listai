import * as S from './style';

const InputUrl = ({
  url,
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
        <S.WrapperUrl>{url}</S.WrapperUrl>

        <S.Input
          onBlur={onBlur ? (e) => onBlur(e.target.value) : undefined}
          onChange={onChange ? (e) => onChange(e.target.value.toLowerCase()) : undefined}
          value={value}
          disabled={disabled}
        />

        <S.WrapperIcons>
          {check && <S.Check className="fa-solid fa-check" />}
        </S.WrapperIcons>
      </S.WrapperInput>

      {messageError && <S.MessageError>{messageError}</S.MessageError>}
    </div>
  );
};

export default InputUrl;