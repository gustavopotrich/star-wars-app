/**
 * CharacterSearchContainer is a React functional component that provides an interface for searching and displaying
 * information about Star Wars characters. It fetches data from the SWAPI (Star Wars API) and displays details such as
 * films, vehicles, and starships associated with a selected character.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.query - The current search query for character names.
 * @param {Function} props.setQuery - Function to update the search query state.
 * @param {Object} props.character - The currently selected character object containing detailed information.
 * @param {Function} props.setCharacter - Function to update the current character state.
 * @param {string} props.error - Error message to be displayed if any issues occur during data fetching.
 * @param {Function} props.searchCharacter - Function to initiate a search for a character based on the current query.
 * @param {Function} props.resetSearch - Function to reset the search state and clear current character data.
 * @param {Array} props.allCharacters - Array of all character objects with additional information such as images.
 *
 * @returns {JSX.Element} A React component that renders the character search interface and displays character details.
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const CharacterSearchContainer = ({
  query,
  setQuery,
  character,
  setCharacter,
  error,
  searchCharacter,
  resetSearch,
  allCharacters,
}) => {
  const [films, setFilms] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (character) {
      Promise.all(character.films.map((url) => axios.get(url)))
        .then((responses) => setFilms(responses.map((res) => res.data.title)))
        .catch((err) => console.error("Error fetching films:", err));

      Promise.all(character.vehicles.map((url) => axios.get(url)))
        .then((responses) => setVehicles(responses.map((res) => res.data.name)))
        .catch((err) => console.error("Error fetching vehicles:", err));

      Promise.all(character.starships.map((url) => axios.get(url)))
        .then((responses) =>
          setStarships(responses.map((res) => res.data.name))
        )
        .catch((err) => console.error("Error fetching starships:", err));
    }
  }, [character]);

  const fetchCharacters = (url) => {
    axios
      .get(url)
      .then((response) => {
        setCharacters(response.data.results);
        setCharacter(null);
        setCurrentIndex(0);
        setNext(response.data.next);
        setPrevious(response.data.previous);
      })
      .catch((err) => console.error("Error fetching characters:", err));
  };

  useEffect(() => {
    fetchCharacters("https://swapi.dev/api/people/");
  }, []);

  const handleNext = async () => {
    if (character && character.url) {
      let currentId = parseInt(character.url.split("/").slice(-2, -1)[0], 10);
      let nextCharacter = null;
      let characterInfo = null;

      while (!nextCharacter && currentId < 100) {
        currentId += 1;
        try {
          const response = await axios.get(
            `https://swapi.dev/api/people/${currentId}/`
          );
          nextCharacter = response.data;
          characterInfo = allCharacters.find(
            (char) =>
              char.name.toLowerCase() === nextCharacter.name.toLowerCase()
          );
        } catch (error) {
          if (error.response && error.response.status === 404) {
            continue;
          } else {
            console.error("Error fetching next character:", error);
            break;
          }
        }
      }

      if (nextCharacter) {
        setCharacter({
          ...nextCharacter,
          imageUrl: characterInfo ? characterInfo.image : null,
        });
      }
    }
  };

  const handlePrevious = async () => {
    if (character && character.url) {
      let currentId = parseInt(character.url.split("/").slice(-2, -1)[0], 10);
      let previousCharacter = null;
      let characterInfo = null;

      while (!previousCharacter && currentId > 1) {
        currentId -= 1;
        try {
          const response = await axios.get(
            `https://swapi.dev/api/people/${currentId}/`
          );
          previousCharacter = response.data;
          characterInfo = allCharacters.find(
            (char) =>
              char.name.toLowerCase() === previousCharacter.name.toLowerCase()
          );
        } catch (error) {
          if (error.response && error.response.status === 404) {
            continue;
          } else {
            console.error("Error fetching previous character:", error);
            break;
          }
        }
      }

      if (previousCharacter) {
        setCharacter({
          ...previousCharacter,
          imageUrl: characterInfo ? characterInfo.image : null,
        });
      }
    }
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      searchCharacter();
      setHasSearched(true);
    }
  };

  const handleNewSearch = () => {
    resetSearch();
    setHasSearched(false);
    setCharacter(null);
  };

  // Determine the height of the main container based on the search state
  const containerHeight = character ? "890px" : "300px";

  return (
    <div className="main-container" style={{ height: containerHeight }}>
      {!hasSearched && (
        <div
          className="info-button-container"
          data-tooltip-id="info-tooltip"
          data-tooltip-content="Enter the name of a Star Wars character to search."
        >
          <FontAwesomeIcon icon={faCircleInfo} className="info-icon" />
        </div>
      )}
      <Tooltip
        id="info-tooltip"
        place="top"
        type="dark"
        effect="solid"
        className="custom-tooltip"
      />
      <h1>Star Wars Character Search</h1>
      {!character && (
        <div className="search-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter character name"
            />
          </div>
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      {character && (
        <div className="character-container">
          <div className="character-name">
            <h1>{character.name}</h1>
          </div>
          <div className="first-part">
            <div className="left-side">
              <div className="character-detail">
                <p>
                  <strong>Height:</strong> {character.height}cm
                </p>
              </div>
              <div className="character-detail">
                <p>
                  <strong>Mass:</strong> {character.mass}kg
                </p>
              </div>
              <div className="character-detail">
                <p>
                  <strong>Hair Color:</strong> {character.hair_color}
                </p>
              </div>
              <div className="character-detail">
                <p>
                  <strong>Skin Color:</strong> {character.skin_color}
                </p>
              </div>
              <div className="character-detail">
                <p>
                  <strong>Eye Color:</strong> {character.eye_color}
                </p>
              </div>
              <div className="character-detail">
                <p>
                  <strong>Birth Year:</strong> {character.birth_year}
                </p>
              </div>
              <div className="character-detail">
                <p>
                  <strong>Gender:</strong> {character.gender}
                </p>
              </div>
            </div>
            <div className="right-side">
              {character.imageUrl && (
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="character-image"
                />
              )}
            </div>
          </div>
          <div className="second-part">
            <div>
              <div className="character-detail">
                <strong>Films:</strong>
                <div className="list-inline">
                  {films.length > 0 ? (
                    films.map((film, index) => (
                      <p key={index}>
                        {" "}
                        {film}
                        {index < films.length - 1 && ", "}
                        {(index + 1) % 4 === 0 && <br />}
                      </p>
                    ))
                  ) : (
                    <p> No films found.</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="character-detail">
                <strong>Vehicles:</strong>
                <div className="list-inline">
                  {vehicles.length > 0 ? (
                    vehicles.map((vehicle, index) => (
                      <p key={index}>
                        {" "}
                        {vehicle}
                        {index < vehicles.length - 1 && ", "}
                        {(index + 1) % 4 === 0 && <br />}
                      </p>
                    ))
                  ) : (
                    <p> No vehicles found.</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="character-detail">
                <strong>Starships:</strong>
                <div className="list-inline">
                  {starships.length > 0 ? (
                    starships.map((starship, index) => (
                      <p key={index}>
                        {" "}
                        {starship}
                        {index < starships.length - 1 && ", "}
                        {(index + 1) % 4 === 0 && <br />}
                      </p>
                    ))
                  ) : (
                    <p> No starships found.</p>
                  )}
                </div>
              </div>
            </div>
            <button onClick={handleNewSearch} className="new-search-button">
              New Search
            </button>
          </div>
        </div>
      )}
      {character && (
        <div className="pagination-buttons">
          <div>
            <button onClick={handlePrevious}>Previous</button>
          </div>
          <div>
            <button
              onClick={handleNext}
              disabled={!next && currentIndex === characters.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSearchContainer;
