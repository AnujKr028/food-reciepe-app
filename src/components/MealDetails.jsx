import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MealDetails = () => {
  const { id } = useParams(); // Get meal ID from the URL
  const [mealData, setMealData] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMealData(data.meals[0]);
    };

    fetchMealDetails();
  }, [id]); // Run this when ID changes

  return (
    <div className="meal-details-container">
      {mealData ? (
        <div className="meal-details">
          <img src={mealData.strMealThumb} alt={mealData.strMeal} width="300px" />
          <h2>{mealData.strMeal}</h2>
          <h3>Category: {mealData.strCategory}</h3>
          <h3>Cuisine: {mealData.strArea}</h3>
          <h4>Instructions:</h4>
          <p>{mealData.strInstructions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MealDetails;
