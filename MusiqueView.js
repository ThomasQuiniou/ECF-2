class MusiqueView {
    constructor() {

        this.offset = 0
        this.header = document.createElement('header');
        this.headerContainer = document.createElement('div');
        this.headerContainer.className = 'container'
        this.title = document.createElement('h1');
        this.title.textContent = 'music play'
        this.header.appendChild(this.headerContainer)

        this.headerNav =  document.createElement('nav')
        this.headerNav.className = "header-nav"

        this.headerNavList = document.createElement('ul')
        this.headerNavList.className = "header-nav-list"

        this.headerNavItemCon = document.createElement('li')
        this.headerNavItemCon.className = "header-nav-item"

        this.headerNavItemBib = document.createElement('li')
        this.headerNavItemBib.className = "header-nav-item"

        this.librairyButton = document.createElement('button')
        this.librairyButton.textContent = "Bibliothèque"
        this.librairyButton.className = "header-nav-link-bib"

        this.headerNavItemBib.appendChild(this.librairyButton)

        this.headerNavList.append(this.headerNavItemBib, this.headerNavItemCon)
        this.headerNav.appendChild(this.headerNavList)

        this.headerContainer.append(this.title, this.headerNav)

        this.form = document.createElement('form');
        this.form.className = 'recherche-form'

        this.input = document.createElement('input')
        this.input.type = 'text'
        this.input.placeholder = 'Entrez votre recherche'
        this.input.name = 'recherche-input'
        this.input.id = 'recherche-input'
        this.input.required = true

        this.select = document.createElement('select');
        this.select.id = 'recherche-select'
        this.select.name = 'recherche-select'

        this.option1 = document.createElement('option');
        this.option1.value = "1";
        this.option1.textContent = 'Toutes catégories';

        this.option2 = document.createElement('option');
        this.option2.value = "2";
        this.option2.textContent = 'Titre';

        this.option3 = document.createElement('option');
        this.option3.value = "3";
        this.option3.textContent = 'Artiste';

        this.option4 = document.createElement('option');
        this.option4.value = "4"
        this.option4.textContent = 'Albums'

        this.select.append(this.option1, this.option2, this.option3, this.option4)

        this.submitButton = document.createElement('button')
        this.submitButton.textContent = 'voir';


        this.rechercheSection = document.createElement('section');
        this.rechercheSection.className = 'recherche';
        this.rechercheContainer = document.createElement('div');
        this.rechercheContainer.className = 'container';




        this.rechercheSection.appendChild(this.rechercheContainer);
        this.rechercheContainer.appendChild(this.form)

        this.form.append(this.input, this.select, this.submitButton)

        this.resultatSection = document.createElement('section')
        this.resultatSection.className = 'resultat'
        this.resultatContainer = document.createElement('div')
        this.resultatContainer.className = 'container'

        this.loaderContainer = document.createElement('div')
        this.loaderContainer.className = "loader-container"
        this.loader = document.createElement('img')
        this.loader.className = "loader hidden"
        this.loader.src = 'img/loader.gif'

        this.loaderContainer.appendChild(this.loader)
        this.musiqueList = document.createElement('ul')

        this.menu = document.createElement('section')
        this.menu.className = "menu-musique"
        this.menuHashtag = document.createElement('div')
        this.menuHashtag.textContent = "#"
        this.menuArtiste = document.createElement('div')
        this.menuArtiste.textContent = "Artiste"
        this.menuTitre = document.createElement('div')
        this.menuTitre.textContent = "Albums"
        this.menuAlbums = document.createElement('div')
        this.menuAlbums.textContent = "Albums"
        this.menuActions = document.createElement('div')
        this.menuActions.textContent = "Actions"
        this.menu.append(this.menuHashtag,this.menuTitre, this.menuArtiste, this.menuAlbums, this.menuActions)


        this.resultatSection.appendChild(this.resultatContainer)
        this.resultatContainer.append(this.menu, this.loaderContainer, this.musiqueList)



        document.body.prepend(this.header, this.rechercheSection, this.resultatSection);

    }

    get _input() {
        return this.input.value
    }
    get _select() {
        return this.select.value
    }



    displayMusiques(musiques, count) {

        this.loader.className = "loader hidden"
        // Delete all nodes
        this.musiqueBibList = document.querySelector('.bibliotheque .container ul')
        while (this.musiqueList.firstChild) {
            this.musiqueList.removeChild(this.musiqueList.firstChild)
        }
        while (this.musiqueBibList.firstChild) {
            this.musiqueBibList.removeChild(this.musiqueBibList.firstChild)
        }


        if (musiques.length > 0) {

            this.musiqueList.className = 'resultat-list';
            musiques.forEach(musique => {

                const li = document.createElement('li')
                li.id = musique.mbid
                li.className = 'resultat-item'

                const id = document.createElement('p');
                id.textContent = musique.id

                const title = document.createElement('p');
                title.textContent = musique.titre;


                const release = document.createElement('p');
                release.textContent = musique.album;

                const artist = document.createElement('p');
                artist.textContent = musique.artiste;

                const mbid = document.createElement('button');
                mbid.textContent = 'MORE'
                mbid.className = "resultat-button"




                li.append(id, title, artist, release, mbid)


                this.musiqueList.append(li)
            })
        }
    }

    optionSelected(gestionnaire){
        this.form.addEventListener('submit', event => {
            this.resultatSection.className="resultat"
            event.preventDefault()
            this.submitButton.disabled = true
            setTimeout(() => {
                this.submitButton.disabled = false
            }, 1000)
            this.listMusic = document.querySelector('.resultat .container ul')
            this.listMusic.style.display = "block"
            this.loader.className = "loader"
            if (this._input && this._select) {
                this.offset = 0;
                gestionnaire(this._input, this._select, this.offset.toString())
            }
        })
    }

    onClickNextpage(gestionnaire){
        document.addEventListener("scroll", () => {

            const modale = document.querySelector('.modale .container')
            if (((window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight) && modale.childElementCount === 0 ) {
                if (this._input && this._select) {
                    this.offset +=100;

                    if ( this.offset !== this.musiqueList.childElementCount ){
                        return
                    }
                    else{
                        gestionnaire(this._input, this._select, this.offset.toString())
                    }
                }
            }
        })
    }
}