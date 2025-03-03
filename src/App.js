import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import MealDetails from './components/MealDetails';
import './style.css'
import RecommendPage  from './components/RecommendPage'; 

function App() {
  return (<>
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/meal/:id" element={<MealDetails />} />
       
      </Routes>
      
      <Routes> <Route path='/RecommendPage' element={<RecommendPage />}/></Routes>
    </Router>

    </>
  );
}

export default App;
