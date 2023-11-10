import './App.css';
import AddToDo from './components/AddToDo';
import NavBar from './components/NavBar';
import ToDos from './components/ToDos';

function App() {
  return (
    <main>
      <h2>My TODO</h2>
      <NavBar />
      <AddToDo />
      <ToDos />
    </main>
  );
}
export default App;
