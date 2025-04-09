import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Book, ChefHat } from 'lucide-react';
import { fetchRecipeById } from '../api';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strInstructions: string;
  strCategory: string;
  [key: string]: string;
}

function RecipeInfo() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await fetchRecipeById(id!);
        setRecipe(data.meals?.[0] || null);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  const getIngredients = (recipe: Recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <ChefHat className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Recipe not found</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.strMeal}</h1>
            
            <div className="flex items-center mb-6">
              <MapPin className="h-5 w-5 text-gray-500" />
              <button
                onClick={() => navigate(`/?country=${recipe.strArea}`)}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                {recipe.strArea} Cuisine
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getIngredients(recipe).map(({ ingredient, measure }, index) => (
                  <li key={index} className="flex items-center">
                    <button
                      onClick={() => navigate(`/?ingredient=${ingredient}`)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {ingredient}
                    </button>
                    <span className="ml-2 text-gray-600">- {measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
              <div className="prose max-w-none">
                {recipe.strInstructions.split('\n').map((instruction, index) => (
                  <p key={index} className="mb-4 text-gray-700">{instruction}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Book className="h-5 w-5 text-gray-500" />
            <h2 className="ml-2 text-xl font-semibold text-gray-900">Category</h2>
          </div>
          <button
            onClick={() => navigate(`/?category=${recipe.strCategory}`)}
            className="w-full text-left px-4 py-2 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-900"
          >
            {recipe.strCategory}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeInfo;