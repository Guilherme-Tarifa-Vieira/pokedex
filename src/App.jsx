import React, { useEffect, useState } from "react";
import PokemonThumb from "./components/PokemonThumb";
import { SiPokemon } from 'react-icons/si';


function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loadedPokemonCount, setLoadedPokemonCount] = useState(0);
  const [loadMore, setLoadMore] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${loadedPokemonCount}`);

  const [noOffSet, setOffSet] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");

  const getAllPokemons = async () => {
    const res = await fetch(loadedPokemonCount > 0 ? loadMore : noOffSet);
    const data = await res.json();

    setLoadMore(data.next);

    const results = data.results.sort((a, b) => a.id - b.id); // Ordena resultados por ID

    async function createPokeObj(results) {
      const pokeData = await Promise.all(
        results.map(async (result) => {
          const url = result.url;
          const res = await fetch(url + "?key=" + url);
          return res.json();
        })
      );

      setAllPokemon((currentList) => {
        const filteredList = pokeData.filter(({ id }) => {
          return !currentList.find(pokemon => pokemon.id === id);
        });
        return [...currentList, ...filteredList];
      });
    }

    createPokeObj(results);
  };

  useEffect(() => {
    getAllPokemons();
  }, [loadedPokemonCount]);

  const handleLoadMoreClick = () => {
    setLoadedPokemonCount(loadedPokemonCount + 20);

    console.log(loadedPokemonCount)
  };

  return (
    <>
      <div className="app-container">
        <div className="display">
          <SiPokemon className="poke" size={200} />

        </div>
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemon.slice(0, loadedPokemonCount + 20).map(pokemon => (
              <PokemonThumb
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
                key={pokemon.id}
              />
            ))}
          </div>
          <button className="load-more" onClick={handleLoadMoreClick}>Load more</button>
        </div>
      </div>
    </>
  )
}

export default App;