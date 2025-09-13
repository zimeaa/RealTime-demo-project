
import logo from './logo.svg';
import './App.css';
import SseMessages from './components/SseMessages';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      
      <SseMessages />
      </header>
    </div>
  );
}

export default App;
