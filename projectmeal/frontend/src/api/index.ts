import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface RecipeParams {
  ingredient?: string | null;
  country?: string | null;
  category?: string | null;
}

export const fetchRecipes = async (params: RecipeParams) => {
  const queryParams = new URLSearchParams();
  if (params.ingredient) queryParams.append('ingredient', params.ingredient);
  if (params.country) queryParams.append('country', params.country);
  if (params.category) queryParams.append('category', params.category);

  const response = await axios.get(`${API_URL}/recipes?${queryParams.toString()}`);
  return response.data;
};

export const fetchRecipeById = async (id: string) => {
  const response = await axios.get(`${API_URL}/recipes/${id}`);
  return response.data;
};