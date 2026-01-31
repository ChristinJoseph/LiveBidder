import { createContext, useContext, useReducer } from 'react'

const AuctionContext = createContext()

const initialState = {
  items: [],
  userBids: {},
  serverTimeOffset: 0
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload }

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item
        )
      }

    case 'SET_TIME_OFFSET':
      return { ...state, serverTimeOffset: action.payload }

    default:
      return state
  }
}

export function AuctionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuctionContext.Provider value={{ state, dispatch }}>
      {children}
    </AuctionContext.Provider>
  )
}

export function useAuction() {
  return useContext(AuctionContext)
}
