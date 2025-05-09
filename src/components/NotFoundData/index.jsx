import * as S from './style';

const NotFoundData = ({ active, text, icon }) => (
  active && (
    <S.NotFoundData>
      <i className={`${icon} icon`} />
      <span>{text}</span>
    </S.NotFoundData>
  )
);

export default NotFoundData;
