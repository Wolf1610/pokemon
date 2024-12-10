const form = document.getElementById('pokemon-form');
const container = document.getElementById('pokemon-container');
let selectedCategory = '';

document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        selectedCategory = button.getAttribute('data-category');
        document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});
 
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const numCards = document.getElementById('numCard').value;
    if(!selectedCategory) {
        alert('Please select a category!');
        return;
    }

    // clear previous card
    container.innerHTML = '';

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedCategory}`);
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        const pokeList = await data.pokemon.slice(0, numCards); // limit the number of cards
        console.log(pokeList);
        displayPoke(pokeList);
    } catch (error) {
        console.log("Error fetching Pokemoon data: ", error);
    }
});


async function fetchPokemonDataBeforeRedirect(id) {
    try {
        const [ poke, pokeSpecies ] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json()),
        ]);
        return true;
    } catch (error) {
        console.log("Failed to fetch pokemon data before redirect", error);
        return false;
    }
}

function displayPoke(pokeArray) {
    const listWrapper = container;
    listWrapper.innerHTML = ""; // clear existing content
    pokeArray.forEach((pokeItem) => {
        const pokeId = pokeItem.pokemon.url.split("/")[6];
        console.log(pokeId);
        const listItem = document.createElement("div");
        console.log(listItem);
        listItem.className = "list-item";
        listItem.innerHTML = `
            <div style=" padding: 1.25em; background-color: #070706; color: black; border-radius: 0.4em; border: 2px solid #6a6a6a;">
                <div class="img-wrap">
                    <img  style="height: 12.875rem; width: 12.875rem;" src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg" alt="${pokeItem.pokemon.name}" />
                </div>
                <div class="name-wrap">
                    <p style=" font-weight: bold; display: flex; color: #fff; margin-left: 3.125em; padding: 0.75em 0.75em;" class="body3-fonts" >${pokeItem.pokemon.name}</p>
                </div>
            </div>`;
        listItem.addEventListener('click', async () => {
            return await fetchPokemonDataBeforeRedirect(pokeId);
           
        });
        listWrapper.appendChild(listItem);
        console.log(listWrapper);
    });
}
{/* <div>
    <img  
        style="height: 6.875rem; width: 6.875rem;" 
        src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg" alt="${pokeItem.pokemon.name}" 
    />
</div> */}

const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open'); 
}
