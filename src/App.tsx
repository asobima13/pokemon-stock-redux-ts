import './App.css';
import { useActions } from './hooks/useActions';
import StockPokemon from './pages/stock-pokemon/StockPokemon';
import DetailStock from './pages/detail-stock/DetailStock';
import UpdateStockConfirmation from './pages/update-stock-confirmation/UpdateStockConfirmation';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App: React.FC = () => {
  
  const { fetchData } = useActions();
  fetchData()

  return <div className="App">
    <Router>
      <Switch>
        <Route exact path="/">
          <StockPokemon />
        </Route>
        <Route path="/detail-stock/:pokemonName">
          <DetailStock />
        </Route>
        <Route path="/update-stock-confirmation">
          <UpdateStockConfirmation />
        </Route>
      </Switch>
    </Router>
  </div>
}

export default App;
