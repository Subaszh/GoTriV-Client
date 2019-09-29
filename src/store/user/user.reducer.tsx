const initialState = {
  username: 'John Doe'
} 

export interface User {
  username: string
}

const reducer = (state = initialState, action: any) => {
  return {...state, ...initialState};
}

export { reducer as UserReducer }
