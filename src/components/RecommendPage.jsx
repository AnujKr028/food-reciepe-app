import { useState, useEffect } from 'react';

const RecommendPage = ({ mealName }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    async function fetchRecipeReviews() {
      if (!mealName) return; // Avoid fetching if mealName is not available

      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${mealName}&apiKey=YOUR_API_KEY`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const recipeId = data.results[0].id; // Get the first matching recipe ID
          fetchRatings(recipeId);
        } else {
          console.error("No recipes found for the given meal name.");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    async function fetchRatings(recipeId) {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/reviews?apiKey=YOUR_API_KEY`
        );
        const data = await response.json();
        setRatings(data.reviews || []);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    }

    fetchRecipeReviews();
  }, [mealName]); // Fetch when mealName changes

  return (
    <div className='bg-blue-950'>
      <h2 className="text-white text-lg font-bold mb-4">User Ratings:</h2>
      {ratings.length > 0 ? (
        ratings.map((review, index) => (
          <p key={index} className="text-yellow-400">⭐ {review.rating}/5</p>
        ))
      ) : (
        <p className="text-grey-300">Rating are not available yet.</p>
      )}
    </div>
  );
};

export default RecommendPage;