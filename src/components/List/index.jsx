import * as S from './style'

// data: { name: string, id: string, price: number, img: any }
// selected: number[]

const List = ({ data, selected, getData }) => {
  return (
    <S.List>
      {data?.map((item, index) => {
        const isSelected = selected.includes(item.name);

        return (
          <S.Item key={`item-${index}`} onClick={() => getData(item.name)}>
            <S.Image
              className="image ng-star-inserted"
              src="https://b2cproduct-dev-mimonprod.s3.us-west-2.amazonaws.com/public/product/system/casamento/lua-de-mel/202202.jpg"
              alt="Sunset View Lunch"
            />

            <S.WrapperText>
              <span className="title">{item.name}</span>
              <span className="price">
                {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>            
            </S.WrapperText>

            <S.Button style={{ backgroundColor: isSelected ? 'rgb(67, 32, 112)' : '#a9a9a9' }}>
              <span className={`${isSelected ? 'fa-solid fa-check' : 'fa-solid fa-plus'}`}></span>
            </S.Button>
          </S.Item>
        )
      })}
    </S.List>
  )
}

export default List
