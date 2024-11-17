
alert("Entrei!");
console.log("Deu certo! ")
const pokeContainer = document.querySelector("#pokeContainer");

const pokemonCount = 150
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
  
   for (let i = 1; i <= pokemonCount; i++) {
     await getPokemons(i)
    
   }


}

/* Aqui  está definindo uma função  getPokemons usando a sintaxe de função anônima (arrow function).
   A palavra-chave async indica que a função será assíncrona, ou seja, 
   ela pode usar o comando await dentro dela para lidar com operações assíncronas, como chamadas a APIs. 
*/


const  getPokemons = async (id) => {
     const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    //const url= `https://pokeapi.co/api/v2/pokemon/${id}`
    /*
      Na linha 23  fiz uma requisição HTTP para o endereço 
      especificado em url usando a função fetch. 
      O await faz com que o código, onde ele espera até que a requisição seja concluída 
      antes de continuar para a próxima linha. O resultado da requisição é armazenado na variável resp,
      que contém informações da resposta HTTP, como status, cabeçalhos e corpo.

    */
    // Como estou trabalhando com uma função assincrona precisa de um await "Espera"
    const resp = await fetch(url)

    // Transforma a resposta em um Json
    const data = await resp.json()

    /*
      console.log(data.name);
      console.log(data);
      console.log(data.types[0].type.name);
    */
    createPokemonCard(data)
    
}

const createPokemonCard = (poke) => {
   const  card = document.createElement('div')
   card.classList.add("pokemon")
   const name = poke.name[0].toUpperCase() + poke.name.slice(1)
   const id = poke.id.toString().padStart(3,'0')
 
   const pokeTypes = poke.types.map(type => type.type.name)
   const type  = mainTypes.find(type => pokeTypes.indexOf(type) > -1)

   const color = colors[type]

   card.style.backgroundColor = color

   const  pokemonInnerHTML = `
      <div class="imagemContainer">           
         <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
      </div>
      <div class="info">
        <span class="number"> #${id}</span>
        <h3 class="name"> ${name}</h3>
        <small class="type"> Tipo <span>${type} </span> </small>
      </div> 
    `
    
    card.innerHTML= pokemonInnerHTML

    pokeContainer.appendChild(card)



  }

fetchPokemons()