const mainContent = document.getElementById('mainContent');
const pokemonCount = 152;
const getPokemonList = async () => {
    let pokemonList = [];
    for (let index = 1; index < pokemonCount; index++) {
        const pokemon = await getPokemonById(index);
        pokemonList = [...pokemonList, pokemon];
    }
    return pokemonList;
};
const getPokemonById = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await data.json();
    const pokemonType = pokemon.types
        .map((poke) => poke.type.name)
        .join(' / ');
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
    };
};
const displayPokemon = (pokemonList) => {
    pokemonList.forEach((pokemon) => {
        let output = `
        <div class="card">
            <h1>#${pokemon.id} ${pokemon.name}</h1>
            <img src=${pokemon.image} alt=${pokemon.name} />
            <span>Type: ${pokemon.type}</span>
        </div>
    `;
        mainContent.innerHTML += output;
    });
};
const pokemonList = await getPokemonList();
displayPokemon(pokemonList);
export {};
