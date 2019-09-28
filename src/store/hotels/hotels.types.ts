import { map } from 'rxjs/operators';

export interface Hotel {
  id: string,
  name: string,
  phone: string,
  city: string,
  country: string,
  price_category: string,
  stars: number
}

export interface Hotels {
  selected: string,
  list: Hotel[],
  visibleList: Hotel[],
  filters: HotelsFilters
}

export interface HotelsFilters {
  amenities: string[],
  price_category: string[]
}