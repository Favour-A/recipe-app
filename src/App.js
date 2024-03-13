import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css';
import HomePage from './Pages/home';
import FoodRecipes from './Pages/random-recipes';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import RecipePage from './Pages/recipe-page';


function App() {
 const router = createBrowserRouter([
  
    { path: '/',
      element: <HomePage/>},
      { path: '/random-recipes',
       element: <FoodRecipes/>},
      { path: '/recipe-page/:id',
      element: <RecipePage/>},
  //     { path: '/Random-recipe',
  //     element: <RandomRecipe/>},

       {
         path: '/*',
         element: 'NotFound'
       }

      
])

  return (
      <>
     <RouterProvider router={router}/>
    </>
      
  );
}

export default App;
