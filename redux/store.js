import { createStore } from 'redux'
import notesReducer from './appRedux'

const store = createStore(notesReducer)

export default store
