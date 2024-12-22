import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './v2let/Home';
import V2lettercard from './v2let/v2lettercard';
import WordSelector from './v2let/WordSelector';
import LetCard from './v2let/LetCard';
import GameContainer from './v2let/GameContainer';



function App() {
  return (
    <Router basename="/games/wsletters">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/v2let" element={<V2lettercard />} /> */}
        <Route path='/' element={<WordSelector/>}/>
        <Route path="/letcard" element={<LetCard/>} />
        <Route path="/gamecontainer" element={<GameContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
