let urlBase = "https://rickandmortyapi.com/api/character";
let url = urlBase;
let carregando = false;

async function carregarPersonagens(reset = false) {
    if (carregando || !url) return;

    carregando = true;

    const res = await fetch(url);
    const data = await res.json();

    if (reset) {
        document.querySelector(".cards").innerHTML = ""; // Limpa os cards se for nova pesquisa
    }

    displayPersonagens(data.results);
    url = data.info.next; // próxima página

    const btnMais = document.querySelector("#btn-mais")
    if (!url) {
        btnMais.style.display = 'none'
    } else {
        btnMais.style.display = 'block'
    }

    carregando = false;
}

function displayPersonagens(personagens) {
    let divCards = document.querySelector(".cards");

    personagens.map((personagem) => {
        let statusClass = '';
        if (personagem.status === 'Alive') {
            statusClass = 'alive-color';
        } else if (personagem.status === 'Dead') {
            statusClass = 'dead-color';
        } else {
            statusClass = 'unknown-color';
        }

        divCards.innerHTML += `
            <div class="card" data-link="./pages/detalhes.html?id=${personagem.id}">
                <div class="image-container">
                    <img src="${personagem.image}" alt="${personagem.name}">
                </div>
                <div class="content">
                    <h2>${personagem.name}</h2>
                    <div class="status-specie">
                        <div class="status-color ${statusClass}"></div>
                        <p>${personagem.status}</p>
                        <span>-</span>
                        <p>${personagem.species}</p>
                    </div>
                    <div class="origin">
                        <p>Origin</p>
                        <p>${personagem.origin.name}</p>
                    </div>
                    <div class="gender">
                        <p>Gender</p>
                        <p>${personagem.gender}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // clique cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            const link = card.getAttribute('data-link');
            window.location.href = link;
        });
    });
}

//carregar outro pagina com o botão
document.getElementById('btn-mais').addEventListener('click', () => {
    carregarPersonagens();
});

//pesquisar
document.getElementById('btn-pesquisar').addEventListener('click', () => {
    const termo = document.getElementById('input-pesquisa').value.trim();
    
    if (termo) {
        url = `${urlBase}?name=${encodeURIComponent(termo)}`;
    } else {
        url = urlBase;
    }

    carregarPersonagens(true); // true para resetar os cards
});

document.getElementById('input-pesquisa').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('btn-pesquisar').click();
    }
});

carregarPersonagens();