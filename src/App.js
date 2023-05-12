import logo from './logo.svg';
import './App.css';
import MovieList from './components/MoviesList';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <MovieList/>
    </div>
  );
}

export default App;
