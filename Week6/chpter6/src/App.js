import './App.css';
import Controller from './component/Controller';
import Viewer from './component/Viewer';

function App() {
  return (
  <div className="App">
    <h1>Simple Counter</h1>
    <section>
      <Viewer />
    </section>
    <section>
      <Controller />
    </section>
  </div>
  );
}
export default App;
