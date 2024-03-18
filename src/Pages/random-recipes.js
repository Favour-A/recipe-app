import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoArrowRight } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/recipe.css';
import { Container, Row, Col } from 'react-bootstrap';
import HomePage from './home';


const FoodRecipes = () => {
    const [categories, setCategories] = useState([]);
    
    const navigation = useNavigate();
    const HandleBackHome = () => {
        navigation('/')
       
    }

    const viewRecipe = (category) => {
        navigation('/recipe-page/' + category);
    };

    useEffect(() => {
        const getCategory = async () => {
          const response = await axios.get('https://www.themealdb.com/api/json/v2/9973533/categories.php');
            
          setCategories(response.data.categories);
          console.log(response.data.categories);
        };
  
        getCategory();
       
    }, []);
  

    return (
        <Container className="text-center">
            <Row>
                <Col className='upperDisplay'>
                    <div id='search'>
                        <input type="text" placeholder="Search for a recipe" />
                        <button><IoSearchSharp /></button>
                    </div>
                    <div id='heading'>
                        
                        <button onClick={ HandleBackHome }><span> < GoArrowRight /></span> Chefs Academy</button>
                        
                    </div>

                </Col>
            </Row>


            {categories.map((category) => (
            <Row>
                
                <Col id='foodCategories'>
                    <div className='foodImage'>
                      <img src={category.strCategoryThumb} alt='food' />
                      <h4>{category.strCategory}</h4>
                    
                    </div>
                    <div className='foodDescription'>
                      <p>{category.strCategoryDescription }</p>
                      <button type='button' className='btn ' onClick={() => viewRecipe(category.strCategory) }> Recipes < MdKeyboardDoubleArrowRight /> </button>
                    </div>
                </Col>
                
            </Row>
            ))}
            <Row>
            <footer>
              <p>© 2024 Chefs Academy. All rights reserved.</p>
            </footer>
            </Row>
            
        </Container>

    )
}

export default FoodRecipes;