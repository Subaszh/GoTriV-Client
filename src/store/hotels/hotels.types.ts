export interface Hotel {
  id: string,
  name: string,
  phone: string,
  city: string,
  country: string,
  price: number,
  stars: number
}

export interface Hotels {
  selected: string,
  list: Hotel[]
}
