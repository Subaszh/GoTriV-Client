export interface Room {
  id: string,
  name: string,
  price_in_usd: number,
  description: string,
  hotel_id: string,
  max_occupancy: number
}

export interface Rooms {
  list: Room[],
  selected: string
}