import './styles/app.scss';
import Header from './components/Header'
import GameScreen from './components/GameScreen'

function App() {
  return (
    <div className="app">
      <Header />
      <GameScreen className={2}/>
    </div>
  );
}

export default App;
