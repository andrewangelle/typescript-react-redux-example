export type Normalized = {id: object};

export const normalizeData =
  (arr: Array<any>): Normalized =>
  arr.length > 0 ?
    arr.reduce((acc, currentValue) => {
      const next = {
        [currentValue.id]: currentValue
      }
      return {...acc,...next}
    },{})
  : []
;