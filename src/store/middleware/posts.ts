import { normalizeData } from './helpers';

export async function fetchTableData() {
  const url = 'http://jsonplaceholder.typicode.com/posts'
  const res = await fetch(url)
  const jsonResults = await res.json()
  const Data = normalizeData(jsonResults)

  return Data
}