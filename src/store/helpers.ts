export interface Action<T extends string> { type: T }
export interface ActionWithPayload<T extends string, P> extends Action<T> { payload: P }

type ActionFunction<T extends string> = () => Action<T>
type ActionFunctionWithPayload<T extends string, P> = (payload: P) => ActionWithPayload<T, P>

export function createAction<T extends string>(type: T): ActionFunction<T>
export function createAction<T extends string, P>(type: T, payload: P): ActionFunctionWithPayload<T, P>
export function createAction<T, P>(type: T, payload?: P) {
  return (payload) => (payload ? { type, payload } : { type })
}

export type ActionCreator = (...args: any[]) => any
export type ActionCreatorsMap = { [actionCreator: string]: ActionCreator }
export type ActionsUnion<A extends ActionCreatorsMap> = ReturnType<A[keyof A]>


