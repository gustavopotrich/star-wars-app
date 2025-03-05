/**
 * StarWarsApp component that allows users to search for Star Wars characters and display their information.
 * Utilizes external APIs to fetch character data and images.
 *
 * @component
 * @returns {JSX.Element} The rendered component displaying the search interface and results.
 *
 * @example
 * <StarWarsApp />
 *
 * @description
 * This component maintains the state for the search query, the selected character, any error messages,
 * and a list of all characters fetched from an external API. It provides functionality to search for a character
 * by name using the Star Wars API and displays the character's information along with an image if available.
 *
 * @function
 * @name StarWarsApp
 *
 * @dependencies
 * - React: For managing component state and lifecycle.
 * - axios: For making HTTP requests to fetch character data.
 * - ParticlesBackground: A component for rendering a background effect.
 * - CharacterSearchContainer: A component for rendering the search interface and results.
 *
 * @state {string} query - The current search query input by the user.
 * @state {Object|null} character - The currently selected character's data, including an image URL if available.
 * @state {string} error - Any error message related to the search process.
 * @state {Array} allCharacters - A list of all characters fetched from the external API.
 *
 * @effect
 * Fetches all character images from an external API on component mount and stores them in the state.
 *
 * @method
 * @name searchCharacter
 * Searches for a character based on the current query and updates the state with the character's data or an error message.
 *
 * @method
 * @name resetSearch
 * Resets the search query, selected character, and error message to their initial states.
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StarWarsApp.css";
import ParticlesBackground from "./ParticlesBackground";
import CharacterSearchContainer from "./characterSearchContainer";

const StarWarsApp = () => {
  const [query, setQuery] = useState("");
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacterImages = async () => {
      try {
        const response = await axios.get(
          "https://akabab.github.io/starwars-api/api/all.json"
        );
        setAllCharacters(response.data); // Store the fetched data
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacterImages();
  }, []);

  const searchCharacter = async () => {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${query}`
      );
      if (response.data.results.length > 0) {
        const characterData = response.data.results[0];
        // Find the character in the API data
        const characterInfo = allCharacters.find(
          (char) => char.name.toLowerCase() === characterData.name.toLowerCase()
        );
        setCharacter({
          ...characterData,
          imageUrl: characterInfo ? characterInfo.image : null, // Use image from API
        });
        setError(""); // Clear any previous error
      } else {
        setCharacter(null); // No character found
        setError("No character found."); // Set error message
      }
    } catch (error) {
      console.error("Error searching for character:", error);
      setError("An error occurred while searching for the character."); // Set error message
    }
  };

  const resetSearch = () => {
    setQuery(""); // Clear the search query
    setCharacter(null); // Clear the selected character
    setError(""); // Clear any error message
  };

  return (
    <>
      <ParticlesBackground />
      <CharacterSearchContainer
        query={query}
        setQuery={setQuery}
        character={character}
        setCharacter={setCharacter}
        error={error}
        searchCharacter={searchCharacter}
        resetSearch={resetSearch}
        allCharacters={allCharacters} // Pass allCharacters as a prop
      />
    </>
  );
};

export default StarWarsApp;
