import { useDispatch } from 'react-redux';
import './App.css'
import { searchDates } from './store/dates/thunks';
import { AppRouter } from './router/AppRouter'


function App() {
  const dispatch=useDispatch();
  dispatch(searchDates())

  return (
    <AppRouter/>
  )
}

export default App
