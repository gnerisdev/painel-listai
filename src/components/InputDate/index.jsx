import '../../../node_modules/react-datepicker/dist/react-datepicker.module.css';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale } from 'react-datepicker';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import * as S from './style';

registerLocale('pt-BR', ptBR);

const InputDate = ({
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
      {label && <S.Label>{label}</S.Label>}
      <S.WrapperInput>
        <DatePicker
          selected={ApplicationUtils.toDateString(value)}
          onChange={onChange}
          onBlur={onBlur}
          locale="pt-BR"
          placeholderText={placeholder || (type === 'time' ? 'Selecione a hora' : 'Selecione a data')}
          disabled={disabled}
          {...(type === 'time'
            ? {
              showTimeSelectOnly: true,
              showTimeSelect: true,
              timeIntervals: 15,
              timeCaption: 'Hora',
              dateFormat: 'HH:mm',
            }
            : { dateFormat: 'dd/MM/yyyy' }
          )}
        />

        {check && (
          <S.WrapperIcons>
            <S.Check className="fa-solid fa-check" />
          </S.WrapperIcons>
        )}
      </S.WrapperInput>

      {messageError && <S.MessageError>{messageError}</S.MessageError>}
    </div>
  );
};

export default InputDate;
