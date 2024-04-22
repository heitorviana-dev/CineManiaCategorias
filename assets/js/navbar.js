// Colocando navbar via js

class Navbar{
    constructor(document){
        this.document = document;
        this.ul = document.querySelector('#navbar');
        this.eventContent();
    }

    eventContent(){ // Método para tratar do evento DOMContentLoaded
        this.document.addEventListener('DOMContentLoaded', () => {
            const cinemania = this.createLink('#home', 'active', 'CineMania');
            const lancamentos = this.createLink('#lancamentos', null, 'Lançamentos');
            const categorias = this.createLink('#categorias', null, 'Categorias');
            const search = this.createLink(null, null, null, 'buscador');
            const entrar = this.createLink('#login', null, 'Entrar');
            const registrar = this.createLink('#registrar', null, 'Registrar-se');
            const buttonPortugues = this.createButton('button', 'btnPortugues', 'btnLanguage', 'Português');
            const buttonEnglish = this.createButton('button', 'btnIngles', 'btnLanguage', 'Inglês');

            this.ul.appendChild(cinemania);
            this.ul.appendChild(lancamentos);
            this.ul.appendChild(categorias);
            this.ul.appendChild(buttonPortugues);
            this.ul.appendChild(buttonEnglish);
            this.ul.appendChild(search);
            this.ul.appendChild(entrar);
            this.ul.appendChild(registrar);

        })
    }

    createLink(href, classe, content, id = null){
        const li = this.document.createElement('li');

        if(id){
            li.setAttribute('id', id);

            const formBuscador = this.createForm('/', 'get', 'formBuscador');
            const label = this.createLabel('Search: ', 'search');
            const buscador = this.createInput('search');
            const button = this.createButton('submit', 'botaoPesquisa');

            label.appendChild(buscador);

            formBuscador.appendChild(label);
            formBuscador.appendChild(button);

            li.appendChild(formBuscador);


            return li;
        }

        const a = this.document.createElement('a');

        if(classe){
            a.classList.add(`${classe}`);
        }

        a.setAttribute('href', `${href}`);
        a.textContent = `${content}`;

        li.appendChild(a);

        return li;

    }

    createLabel(content, idDoInput){ // Método para criar o elemento label.
        const label = this.document.createElement('label');

        label.htmlFor = `${idDoInput}`;
        label.textContent = `${content}`;

        return label;
    }

    createInput(id){ // Método para criar o elemento input.
        const input = this.document.createElement('input');

        input.id = `${id}`;
        input.type = 'text';

        return input;
    }

    createButton(type, id, classe, content = null){ // Método para criar o elemento button.
        const button = this.document.createElement('button');
        button.type = `${type}`;

        if(id){
            button.id = `${id}`;
        }

        if(content){
            button.textContent = content;
        }

        if(classe){
            button.classList.add(`${classe}`);
        }

        return button;
    }

    createForm(action, method, id){
        const form = this.document.createElement('form');

        form.setAttribute('action', action);
        form.setAttribute('method', method);
        form.setAttribute('id', id);

        return form;
    }
}

const navbar = new Navbar(document);