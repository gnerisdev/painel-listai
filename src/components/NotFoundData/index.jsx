import * as S from './style';

const NotFoundData = ({ active, text, icon, textSize, iconSize }) => (
  active && (
    <S.NotFoundData>
      <i 
        className={`${icon} icon`}
        style={iconSize ? { fontSize: iconSize } : {}} 
      />
      <span style={textSize ? { fontSize: textSize } : {}}>
        {text}
      </span>
    </S.NotFoundData>
  )
);

export default NotFoundData;
