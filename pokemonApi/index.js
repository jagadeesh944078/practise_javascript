const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonSelect = document.getElementById("pokemonSelect");
const pokemonDetailsContainer = document.getElementById("pokemonDetails");
let pokemonCache = {};

async function fetchPokemonList() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    const pokemonList = data.results;
    pokemonList.forEach((pokemon) => {
      const option = document.createElement("option");
      option.value = pokemon.url;
      option.textContent = pokemon.name;
      pokemonSelect.appendChild(option);
    });
  } catch (err) {
    console.error("Error fetching Pokemon List" + err);
  }
}

async function fetchPokemonDetails(url) {
  if (pokemonCache[url]) {
    displayPokemonDetails(pokemonCache[url]);
  } else {
    try {
      const response = await fetch(url);
      const data = await response.json();
      pokemonCache[url] = data;
      displayPokemonDetails(data);
    } catch (err) {
      console.error("error while fetch pokemonDetails", +err);
    }
  }
}

function displayPokemonDetails(pokemon) {
  pokemonDetailsContainer.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p><strong>Abilities:</strong> ${pokemon.abilities
          .map((ability) => ability.ability.name)
          .join(", ")}</p>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
    `;
}

pokemonSelect.addEventListener("change", (event) => {
  const selectedPokemon = event.target.value;
  if (selectedPokemon) {
    fetchPokemonDetails(selectedPokemon);
  }
});

fetchPokemonList();
