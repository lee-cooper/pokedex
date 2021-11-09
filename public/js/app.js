var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mainContent = document.getElementById('mainContent');
const pokemonCount = 152;
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    let pokemonList = [];
    for (let index = 1; index < pokemonCount; index++) {
        const pokemon = yield getPokemonById(index);
        pokemonList = [...pokemonList, pokemon];
    }
    console.log(pokemonList);
});
const getPokemonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = yield data.json();
    const pokemonType = pokemon.types
        .map((poke) => poke.type.name)
        .join(", ");
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
    };
});
// Gets the pokemon
fetchData();
export {};
