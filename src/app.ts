import { Pokemon } from "./models/pokemon.interface";

const mainContent: HTMLElement | null = document.getElementById('mainContent');
const pokemonCount: number = 152;

const fetchData = async () => {
  let pokemonList: Pokemon[] = [];
  for (let index = 1; index < pokemonCount; index++) {
    const pokemon = await getPokemonById(index);
    pokemonList = [...pokemonList, pokemon];
  }

  console.log(pokemonList);
}

const getPokemonById = async (id: number): Promise<Pokemon> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon: any = await data.json()
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ")

  return {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  }
}

// Gets the pokemon
fetchData();