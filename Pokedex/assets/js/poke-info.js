const pokeInfoHTML = document.getElementById('pokeInfo')

function convertPokeApiDetailToInfo(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.base_experience = pokeDetail.base_experience

    return pokemon

}

function getPokemonInfo() {
    const id = location.search.replace(/[^0-9]/g,'');

    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToInfo) 
    .then((pokemon) => {
        const newHtml = `
        <li class="pokemon ${pokemon.type} info">
        <img src="${pokemon.photo}" 
            alt="${pokemon.name}">
        <span class="number">${pokemon.number}</span>
        <span class="name title">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>

        <div class="attributeInfo">
            <span class="pokemonInfo">Height: ${pokemon.height}</span>
            <span class="pokemonInfo">Weight: ${pokemon.weight}</span>
            <span class="pokemonInfo">Base experience: ${pokemon.base_experience}</span>
        </div>
    </li> 
     `

        pokeInfoHTML.innerHTML += newHtml
    })

}

getPokemonInfo()
