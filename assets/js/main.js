class Categorias{
    constructor(document){
        this.document = document;
        this.form = this.document.querySelector('#formulario');
        this.apiKey = '5d3740a5fc6dfa4e862bede23e6d4fdb';
        this.eventContent();
        this.eventSubmit();
    }

    eventSubmit(){
        this.document.addEventListener('submit', (e) => {
            // Quando o formulário for enviado será enviado um objeto com chave o genero e o valor o id
            e.preventDefault();

            if(this.validate(e)){
                // Acessa os valores dos campos do formulário
                const formData = new FormData(this.form);
    
                for (const valor of formData.entries()) {
                    console.log(valor);
                }
                
                this.form.submit(); // Os dados são enviados em forma de query Strings.
            }
        })
    }

    eventContent(){
        this.document.addEventListener('DOMContentLoaded', () => {
            this.fetchGenre();
        })
    }

    fetchGenre() {
        const fetchGenreUrl = `http://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`;
    
        fetch(fetchGenreUrl)
            .then(response => response.json())
            .then(data => { // data é uma array em que cada elemento é um objeto contento duas chaves
                data.genres.forEach(genre => {
                    const {id, name} = genre;

                    const label = this.createLabel(name);
                    label.appendChild(this.createInput(name, id));

                    this.form.appendChild(label);

                });

                this.form.appendChild(this.createButton());
            }).catch(error => console.error('Erro ao buscar gêneros', error));
    }

    createInput(name, id){
        const input = this.document.createElement('input');

        input.className = 'inputs';
        input.name = `${name}`;
        input.id = `${name}`;
        input.type = 'checkbox';
        input.value = `${id}`;

        return input;
    }

    createLabel(name){
        const label = this.document.createElement('label');

        label.className = 'labels';
        label.htmlFor = `${name}`;
        label.textContent = `${name}`;

        return label;
    }

    createButton(){
        const button = this.document.createElement('button');
        button.type = 'submit';
        button.textContent = 'Enviar';

        return button;
    }

    validate(e){
        const el = e.target;
        const checkboxes = el.querySelectorAll('input[type="checkbox"]:checked');
        
        if(checkboxes.length < 3){
            alert('Selecione pelo menos 3 categorias.');
            return false;
        }
        return true;
    }
}

const categorias = new Categorias(document);