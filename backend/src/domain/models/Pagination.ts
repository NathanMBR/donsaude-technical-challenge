export type Pagination<T> = {
  quantityPerPage: number
  total: number
  currentPage: number
  lastPage: number
  data: Array<T>
}
