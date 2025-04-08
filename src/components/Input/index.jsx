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

        <S.WrapperIcons>
          {check && (
            <S.Check src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABOElEQVR4Ae3TgUYEYRSG4YW1diNCwAIGUJs5h7q3QIGQhAjdRyIt7EIQBF1FRBcwKXwso+KwZw7v+1/A/3zzmxEREREREREREW3W7ttpYf7hnr9557d1+a/efR+7LszXhKp8nYuqfJ32vCZfx87gw/+jZrc6/wV+UvATgg8f/mKnOv8ZflbwE4IP30/syWejQPNpIv/o2D698/V8GuCv8/jtD7/ThGp8/9CVmlCGvzjY4GtCFf7c33uuXv3/d/aZrTL4yu56rtcr5H/9wIRmks8PTbClJgyWH5jQTBL5gQni2zKbH5iQzw9NGCJf2c1vE/L5gQk+zufHJjz4eOh85Vd9TL/3xxA//xXK8DWhLl8TSvKVXZbma0JdvibU5WtCXb4m1OVrQl2+JhTla8J2+URERERERET0BTMPgAX3NpM4AAAAAElFTkSuQmCC" />
          )}
        </S.WrapperIcons>
      </S.WrapperInput>

      {messageError && <S.MessageError>{messageError}</S.MessageError>}
    </div>
  );
};

export default Input;
