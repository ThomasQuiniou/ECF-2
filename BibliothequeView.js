class BibliothequeView {
    constructor() {
        this.bibSection = document.createElement('section')
        this.bibSection.className = "bibliotheque"
        this.bibContainer = document.createElement('div')
        this.bibContainer.className = 'container'

        this.bibSection.appendChild(this.bibContainer)
        this.modaleSection = document.querySelector('.modale')
        this.modaleElement = document.querySelector('.modale .container')

        this.modaleSection.parentNode.insertBefore(this.bibSection, this.modaleSection.nextSibling);
        this.musiqueBibList = document.createElement('ul')

        this.bibContainer.appendChild(this.musiqueBibList)

        this.bibButton = document.querySelector('.header-nav-link-bib')

        this.resultMusicList = document.querySelector('.resultat .container ul')
    }

    viewBibliotheque = (gestionnaire) => {
        this.bibButton.addEventListener('click', () =>{
            this.resultMusicList.style.display="none"
            this.a
            gestionnaire(1)
        })
    }
    displayBibliotheque = (musiques) => {
        this.buttonContainer = document.querySelector('.button-container')
        if( this.buttonContainer){
            this.buttonContainer.remove()
        }

        console.log(this.buttonContainer)
        // Delete all nodes
        while (this.resultMusicList.firstChild) {
            this.resultMusicList.removeChild(this.resultMusicList.firstChild)
        }

        while(this.modaleElement.firstChild){
            this.modaleElement.removeChild(this.modaleElement.firstChild)

        }
        while (this.musiqueBibList.firstChild) {
            this.musiqueBibList.removeChild(this.musiqueBibList.firstChild)
        }


        if (musiques.length === 0) {

            const p = document.createElement('p')
            p.textContent = 'No results'
            p.style.color = "#fff"
            this.musiqueBibList.append(p)
        }
        else {

            this.musiqueBibList.className = 'resultat-bib-list';
            musiques.forEach(musique => {

                const li = document.createElement('li')
                li.className = 'resultat-item'

                const id = document.createElement('p');
                id.textContent = musique.id

                const title = document.createElement('p');
                title.textContent = musique.titre;


                const release = document.createElement('p');
                release.textContent = musique.album;

                const artist = document.createElement('p');
                artist.textContent = musique.artiste;

                this.mbid = document.createElement('button');
                this.mbid.textContent = 'DELETE'
                this.mbid.className = "resultat-button"
                this.mbid.id = musique.mbid




                li.append(id, title, artist, release, this.mbid)


                this.musiqueBibList.append(li)
            })
        }
    }
    deleteMusique =  (gestionnaire) => {
        this.musiqueBibList = document.querySelector('.bibliotheque .container ul')
        this.musiqueBibList.className = ""
        this.musiqueBibList.addEventListener('click', (e) => {
            if (e.target.textContent === "DELETE"){
                gestionnaire(e.target.id)
                e.target.parentNode.remove()
            }
            else{
                return
            }

        });
    }


}