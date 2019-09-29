import { map } from 'rxjs/operators';

export interface Hotel {
  id: string,
  name: string,
  phone: string,
  city: string,
  country: string,
  price_category: string,
  rating: number,
  distance_from_venue: number,
  description: string,
  images: string[]
}

export interface Hotels {
  selected: string,
  list: Hotel[],
  visibleList: Hotel[],
  filters: HotelsFilters,
  sort: SortFilters
}

export interface HotelsFilters {
  amenities: string[],
  price_category: string[]
}

export interface SortFilters {
  key: string,
  order: string
}