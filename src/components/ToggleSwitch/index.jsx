import * as S from "./style";

const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <S.SwitchContainer>
      <S.Label>{label}</S.Label>
      <S.Switch>
        <S.Checkbox type="checkbox" checked={checked} onChange={onChange} />
        <S.Slider />
      </S.Switch>
    </S.SwitchContainer>
  );
};

export default ToggleSwitch;
