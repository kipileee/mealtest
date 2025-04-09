import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { fetchRecipes } from '../api';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const ingredient = searchParams.get('ingredient');
  const country = searchParams.get('country');
  const category = searchParams.get('category');

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes({ ingredient, country, category });
        setRecipes(data.meals || []);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [ingredient, country, category]);

  const getTitle = () => {
    if (ingredient) return `Recipes with ${ingredient}`;
    if (country) return `${country} Recipes`;
    if (category) return `${category} Recipes`;
    return 'All Recipes';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{getTitle()}</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
            onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{recipe.strMeal}</h2>
            </div>
          </div>
        ))}
      </div>

      {recipes.length === 0 && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No recipes found</h3>
          <p className="mt-1 text-sm text-gray-500">Try changing your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default RecipeList;