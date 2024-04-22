class Search{
    constructor(document, window){
        this.document = document;
        this.window = window;
        this.apiKey = '5d3740a5fc6dfa4e862bede23e6d4fdb';
        this.eventContent();
    }

    eventContent(){
        this.document.addEventListener('DOMContentLoaded', () => {
            const dados = this.getParams();
            const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${dados}&api_key=${this.apiKey}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const movieCardsContainer = this.document.getElementById('movie-cards');

                    data.results.forEach(movie => {
                        const movieCard = this.createMovieCard(movie);
                        movieCardsContainer.appendChild(movieCard);
                    });

                    if(movieCardsContainer.querySelectorAll('*').length === 0){
                        const h3 = this.document.createElement('h3');
                        h3.textContent = 'Não há resultados para sua pesquisa.';
                        movieCardsContainer.appendChild(h3);
                    }
                })
                .catch(error => console.error('Erro ao buscar filmes:', error));
        });
    }

    // eventSubmit(){ // Método para tratar do evento submit.
    //     this.document.addEventListener('submit', (e) => {
    //         // Quando o formulário for enviado será enviado um objeto com chave o genero e o valor o id
    //         e.preventDefault();

    //         if(e.target.id === 'formBuscador'){
    //             const dados = e.target.querySelector('#search').value;
    //             this.window.location.href = "pesquisa.html?dados=" + encodeURIComponent(dados);

    //             return;
    //         }
    //     });
    // }

    getParams(){
        // Retornar o nome do filme pra colocar na url
        const params = new URLSearchParams(this.window.location.search);
        const dados = params.get('dados');

        return dados;
    }

    createMovieCard(movie) {
        const card = this.document.createElement('div');
        card.className = 'movie-card';
    
        const title = this.document.createElement('h2');
        title.textContent = movie.title;
    
        const image = this.document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        image.alt = movie.title;
    
        card.appendChild(image);
        card.appendChild(title);
    
        return card;
    }
}

const search = new Search(document, window);