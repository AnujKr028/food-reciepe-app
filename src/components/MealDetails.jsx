import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import RecommendPage from "../components/RecommendPage";

const MealDetails = () => {
  const { id } = useParams(); // Get meal ID from the URL
  const [mealData, setMealData] = useState(null);
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchMealDetails = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setMealData(data.meals[0]);
    };

    fetchMealDetails();
  }, [id]); // Run this when ID changes

  // YouTube API key
  const apiKey = "AIzaSyAOP3CKmj3N38hYEolBmCPYsF_0HbczR9g";

  useEffect(() => {
    async function fetchYouTubeVideos(query) {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`
      );
      const data = await response.json();
      setVideoData(data.items); // Store videos in state
    }

    if (mealData) {
      fetchYouTubeVideos(mealData.strMeal); // Use dynamic meal name for search
    }
  }, [mealData]); // Runs when mealData is fetched

  return (
    <>
      <div className="meals-bg min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center p-4">
          {mealData ? (
            <div className="meal-details flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-5xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
              {/* Meal Image */}
              <img
                src={mealData.strMealThumb}
                alt={mealData.strMeal}
                className="w-72 h-72 object-cover rounded-lg shadow-md"
              />

              {/* Meal Details */}
              <div className="text-md text-left leading-7 px-4 sm:px-0">
                <h2 className="text-3xl text-blue-400 font-extrabold">
                  {mealData.strMeal}
                </h2>
                <h3 className="text-lg font-thin text-gray-300">
                  <span className="font-mono">Category:</span> {mealData.strCategory}
                </h3>
                <h3 className="text-lg font-thin text-gray-300">
                  <span className="font-mono">Cuisine: </span>
                  {mealData.strArea}
                </h3>

                {/* Instructions */}
                <h4 className="text-white mt-6 text-lg mb-2 font-mono">
                  Instructions:
                </h4>
                <p className="text-lg font-thin text-gray-300 max-w-md">
                  {mealData.strInstructions}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-white text-center text-lg">Loading...</p>
          )}
        </div>

        <div className="flex flex-col items-center text-center mt-6">
          <p className="text-white text-lg font-bold mb-4">Recommended Video:</p>
          <div className="flex flex-col justify-center">
          {videoData.length > 0 ? (
            <iframe
              
              src={`https://www.youtube.com/embed/${videoData[0].id.videoId}`}
              allowFullScreen
             className="rounded-lg shadow-md w-full sm:w-80 sm:h-60 md:w-[560px] md:h-[315px] lg:w-[720px] lg:h-[405px]"
            ></iframe>
          ) : (
            <p className="text-gray-300">Loading video...</p>
          )}
          </div>
        </div>
        <Footer />
       
      </div>
    </>
  );
};

export default MealDetails;
