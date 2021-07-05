class BibliothequeController{
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.viewBibliotheque(this.getListBibliotheque)
        this.view.deleteMusique(this.onDeleteMusique)
        this.model.MusicBibListChanged(this.onMusicBibListChange)
    }
    onDeleteMusique = (mbid) => {
        this.model.deleteMusiqueOnDatabase(mbid)
    }

    getListBibliotheque = (param) => {
        this.model.getMusique(param)
    }
    onMusicBibListChange = (musiques) => {
        this.view.displayBibliotheque(musiques)
    }
}

const appar = new BibliothequeController(new BibliothequeModel(), new BibliothequeView())
