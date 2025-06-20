import * as S from './style';

// data: { name: string, id: string, price: number, img: any }
// selected: number[]
// getData: (id: number) => {}
// mode: 'add' || 'edit' 

const ListGifts = ({ data, selected, getData, mode="add" }) => {
  return (
    <S.List>
      {data?.map((item, index) => {
        const isSelected = selected.includes(item.id);

        return (
          <S.Item key={`item-${item.id}`} onClick={() => getData(item.id)}>
            <S.Image
              className="image ng-star-inserted"
              src={item.image_url}
              alt="Sunset View Lunch"
            />

            <S.WrapperText>
              <span className="title">{item.name}</span>
              <span className="price">
                {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </S.WrapperText>

            <S.Button 
              style={{ backgroundColor: isSelected ? 'rgb(67, 32, 112)' : '#a9a9a9' }} 
              type="button"
            >
              {mode === "add" && (
                <span className={`${isSelected ? 'fa-solid fa-check' : 'fa-solid fa-plus'}`}></span>
              )}
              {mode === "edit" && (<span className="fa-solid fa-trash"></span>)}
            </S.Button>
          </S.Item>
        );
      })}
    </S.List>
  );
};

export default ListGifts;
