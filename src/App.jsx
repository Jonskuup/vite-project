import './App.css';
import Greeting from './components/Greeting';
import Home from './components/Home';
const App = () => {
  const sitename = 'WSK super site';

  return (
    <>
      <h1>{sitename}</h1>
      <p> moi moi moi</p>
      <Greeting name="Johanna"> </Greeting>
      <Greeting name="Helena"> </Greeting>
      <Greeting name="Mochi"> </Greeting>
      <Greeting name="Kuma"> </Greeting>

      <h1>My App</h1>
      <Home />
    </>
  );
};
export default App;
