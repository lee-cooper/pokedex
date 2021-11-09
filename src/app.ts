import { Pokemon } from "./models/pokemon.interface";

const mainContent: HTMLElement | null = document.getElementById('mainContent');
const pokemonCount: number = 152;

const getPokemonList = async (): Promise<Pokemon[]> => {
  let pokemonList: Pokemon[] = [];
  for (let index = 1; index < pokemonCount; index++) {
    const pokemon = await getPokemonById(index);
    pokemonList = [...pokemonList, pokemon];
  }

  return pokemonList;
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

const displayPokemon = (pokemonList: Pokemon[]): void => {
  pokemonList.forEach(pokemon => {
    let output: string = `
        <div class="card">
            <h1 class="card--name">#${pokemon.id}: ${pokemon.name}</h1>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <span class="card--details">${pokemon.type}</span>
        </div>
    `
    mainContent!.innerHTML += output
  });
}

const pokemonList = await getPokemonList();
displayPokemon(pokemonList);