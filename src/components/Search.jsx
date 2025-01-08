import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  // Fetch meals when component mounts
  useEffect(() => {
    fetchAllMeals();
  }, []);

  return (
    <>
      <h1>Search Your Taste 😋</h1>
      <input
        type="text"
        value={mealname}
        onChange={(e) => setMealName(e.target.value)}
        placeholder="Search for a meal"
      />
      <button onClick={handleSearchClick}>🔍</button>

      {/* Display meals */}
      {mealdata && (
        <div className="div_item_box">
          {mealdata.map((meal) => (
            <div
              key={meal.idMeal}
              className="div_items"
              onClick={() => navigate(`/meal/${meal.idMeal}`)}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} width="200px" />
              <h2>{meal.strMeal}</h2>
              <h3>Category: {meal.strCategory}</h3>
            </div>
          ))}
        </div>
      )}

      {/* If no meals found */}
      {!isSearchActive && mealdata && mealdata.length === 0 && (
        <p>No meals found. Showing default meals.</p>
      )}
    </>
  );
};

export default Search;
