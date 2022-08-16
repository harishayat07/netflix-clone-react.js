import './App.scss';
import Header from './Components/Header/Header';
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
