import { normalizeData, Normalized } from './helpers';

export async function fetchTableData(): Promise<Normalized> {
  const url = 'http://jsonplaceholder.typicode.com/posts'
  const res = await fetch(url)
  const jsonResults = await res.json()

  return normalizeData(jsonResults)
}