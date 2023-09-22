import { useDispatch } from 'react-redux';
import { searchDates } from './store/dates/thunks';
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme/AppTheme';
import 'react-calendar/dist/Calendar.css';


function App() {
  const dispatch=useDispatch();
  dispatch(searchDates())

  return (
    <AppTheme>
      <AppRouter/>
    </AppTheme>
  )
}

export default App
