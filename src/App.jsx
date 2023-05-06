import React, { useEffect, useState } from "react";
import PokemonThumb from "./components/PokemonThumb";
import { MdCatchingPokemon } from 'react-icons/md';
import { SiPokemon } from 'react-icons/si';


function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=10000');
  const [loadedPokemonCount, setLoadedPokemonCount] = useState(20);

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
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
  }, []);

  const handleLoadMoreClick = () => {
    setLoadedPokemonCount(currentCount => currentCount + 20);
  };

  return (
    <>
      <div className="app-container">
        <div className="display">
          <MdCatchingPokemon size={48} className="poke" />
          <SiPokemon className="poke" size={200} />

        </div>
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemon.slice(0, loadedPokemonCount).map(pokemon => (
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