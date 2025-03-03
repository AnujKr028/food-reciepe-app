import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link  } from "react-router-dom"; 
import RecommendPage from "./RecommendPage";
import Footer from "../components/Footer";
const Search = () => {
  const [mealname, setMealName] = useState('');
  const [mealdata, setMealData] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const navigate = useNavigate();

  // Fetch all meals
  const fetchAllMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setMealData(data.meals);
  };

  // Handle search click
  const handleSearchClick = async () => {
    if (mealname) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`);
      const data = await response.json();
      setMealData(data.meals);
      setIsSearchActive(true);
    }
  };



  // handle recommendartion 
  const handleReviewClick = ()=>{ 

  }


  // Fetch meals when component mounts
  useEffect(() => {
    fetchAllMeals();
  }, []);

  return (
    <>
      <div className="home-page-background flex flex-col min-h-screen">
        <div className="flex-grow">
          <h1 className="search-title text-center text-gray-400 pt-8 pb-8 text-4xl md:text-4xl sm:text-2xl font-mono font-semibold">
            Search Your Taste 😋
          </h1>

          <input
            type="text"
            value={mealname}
            onChange={(e) => setMealName(e.target.value)}
            placeholder="Search for a meal"
            className="search-input w-80 sm:w-60 pt-2 pb-2 border-none rounded-3xl"
          />
          <button onClick={handleSearchClick} className="search-button">
            🔍
          </button>

          <br />
         
          {/* Display meals */}
          {mealdata && (
            <div className="div_item_box">
              {mealdata.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="div_items"
                  onClick={() => navigate(`/meal/${meal.idMeal}`)}
                >
                  <img
                    className="meal-img"
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width="200px"
                   
                  />
                  <h2 className="font-serif mt-3">{meal.strMeal}</h2>
                  <h3 className="font-serif">Category: {meal.strCategory}</h3>
                  <Link to={"/RecommendPage"} className="text-sm underline underline-offset-4 hover:text-blue-400"
                  onClick={(e) => e.stopPropagation()}
                  >see reviews</Link>
                </div>
              ))}
            </div>
          )}

          {/* If no meals found */}
          {!isSearchActive && mealdata && mealdata.length === 0 && (
            <p>No meals found. Showing default meals.</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Search;
