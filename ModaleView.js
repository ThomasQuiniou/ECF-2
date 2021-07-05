class ModaleView{
    constructor() {
        this.resultSection = document.querySelector('.resultat');
        this.modaleSection = document.createElement('section');
        this.modaleSection.className = 'modale';
        this.modaleContainer = document.createElement('div');
        this.modaleContainer.className = 'container';

        this.modaleSection.append(this.modaleContainer);
        this.resultSection.parentNode.insertBefore(this.modaleSection, this.resultSection.nextSibling);
        this.buttonAdd = document.createElement('button')
        this.buttonAdd.textContent = 'Ajouter';
        this.buttonClose = document.createElement('button')
        this.buttonClose.textContent = 'Fermer';



        this.rechercheContainer = document.querySelector('.recherche .container')

    }

    optionModale(gestionnaire){

        const resultList = document.querySelector('.resultat .container ul')
        resultList.addEventListener('click', (e) => {
            this.loaderContainer = document.createElement('div')
            this.loaderContainer.className = "loader-container"
            this.loader = document.createElement('img')
            this.loader.className = "loader"
            this.loader.src = 'img/loader.gif'
            this.loaderContainer.appendChild(this.loader)

            this.modaleContainer.appendChild(this.loaderContainer)


            this.resultSection.className = 'resultat hidden';
            this.musiqueBibList = document.querySelector('.bibliotheque .container ul')
            this.musiqueBibList.className = ""

            if(e.target.parentElement.className === 'resultat-list'){
                gestionnaire(e.target.id)
                this.buttonAdd.id = e.target.id

            }
            else if(e.target.className === 'resultat-list'){
                this.buttonAdd.id = e.target.id
                return
            }
            else {
                this.buttonAdd.id = e.target.parentElement.id
                gestionnaire(e.target.parentElement.id)
            }
        });

    }

    displayModale(modale){



        while(this.modaleContainer.firstChild){
            this.modaleContainer.removeChild(this.modaleContainer.firstChild)

        }

        this.ButtonContainer = document.createElement('div')
        this.ButtonContainer.className = 'button-container';


        if(parseInt((document.cookie).charAt((document.cookie).length-1)) === 0){
            this.ButtonContainer.appendChild(this.buttonAdd);

        }

        this.ButtonContainer.appendChild(this.buttonClose)
        this.rechercheContainer.appendChild(this.ButtonContainer);

        this.buttonClose.addEventListener('click', () => {
            while(this.modaleContainer.firstChild){
                this.modaleContainer.removeChild(this.modaleContainer.firstChild)

            }
            this.buttonClose.remove()
            this.buttonAdd.remove();
            this.resultSection.className = 'resultat';
        })


        this.sectionInfo = document.createElement('section')
        this.sectionInfo.className = 'modale-info';

        for (let [key, value] of Object.entries(modale)) {
            if(key !== 'img' && key !== 'id'){
                if(key === 'modaleTitle'){
                    const elt = document.createElement('h2');
                    elt.textContent = value
                    this.sectionInfo.appendChild(elt)
                }
                else{
                    const elt = document.createElement('p');
                    elt.textContent = key + ' - ' + value
                    this.sectionInfo.appendChild(elt)
                }

            }


        }
        this.sectionImg = document.createElement('section')
        this.sectionImg.className = 'modale-img'
        this.listImg = document.createElement('ul')
        this.listImg.className = 'list-img';

        if(modale.img){
            modale.img.map( obj => {
                const itemImg = document.createElement('li')
                const image = document.createElement('img')
                image.src = obj;
                itemImg.appendChild(image)
                this.listImg.appendChild(itemImg)
            })
        }
        this.sectionImg.appendChild(this.listImg)
        this.modaleContainer.append(this.sectionInfo, this.sectionImg)


    }

    optionAddOnDb(gestionnaire){
        this.buttonAdd.addEventListener('click', () => {

            this.buttonAdd.remove();
            gestionnaire(this.buttonAdd.id)
        })
    }




}