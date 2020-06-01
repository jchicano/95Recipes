import React, { useState } from 'react';
import styled, { createGlobalStyle } from '@xstyled/styled-components';
import { ThemeProvider, GlobalStyle, TaskBar } from '@react95/core';

import { Recipes, IngredientsModal, RecipeModal, TaskList } from './components';
import { useRecipes } from './components/RecipeContext';

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  ) || window.innerWidth < 500;

const Hero = styled.h1`
  font-size: 40px;
  width: 100%;
  text-align: center;
`;

const Style = createGlobalStyle`
  body {
    font-size: 12px;
  }
`;

function App() {
  const {
    recipes,
    allIngredients,
    selectedRecipe,
    setSelectedRecipe,
    setAllIngredients,
    sheetId,
    updateRecipes,
  } = useRecipes();

  const [showModal, toggleModal] = useState(false);
  const [showFilterModal, toggleFilterModal] = useState(false);

  function openModal() {
    toggleModal(true);
  }

  function closeModal() {
    toggleModal(false);
  }

  const filter = allIngredients.filter((t) => t.checked).map((i) => i.name);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Style />
      <Hero>95 Recipes </Hero>

      {Object.keys(recipes).length > 0 && (
        <Recipes
          recipes={recipes}
          openModal={openModal}
          setSelectedRecipe={setSelectedRecipe}
          openFilterModal={toggleFilterModal}
          filter={filter}
          isMobile={isMobile}
        />
      )}

      {showModal && (
        <RecipeModal
          selectedRecipe={selectedRecipe}
          closeModal={closeModal}
          isMobile={isMobile}
        />
      )}

      {showFilterModal && (
        <IngredientsModal
          allIngredients={allIngredients}
          toggleFilterModal={toggleFilterModal}
          setAllIngredients={setAllIngredients}
          isMobile={isMobile}
        />
      )}

      <TaskBar
        list={
          <TaskList
            spreadsheetID={sheetId}
            onUpdate={() => {
              updateRecipes();
            }}
          />
        }
      />
    </ThemeProvider>
  );
}

export default App;
