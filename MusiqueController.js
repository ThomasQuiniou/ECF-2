class MusiqueController {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.view.optionSelected(this.getOptionsUrlSelected)
        this.view.onClickNextpage(this.getOptionsUrlNextPage)
        this.model.MusicListChanged(this.onMusicListChanged)
    }

    onMusicListChanged = (musiques) => {
        this.view.displayMusiques(musiques)
    }

    getOptionsUrlSelected = (input, selectOption, offset) => {

        this.model.addMusiquesByUrl(this.switchUrl(input, selectOption), offset)
    }

    getOptionsUrlNextPage = (input, selectOption, offset) => {
        this.model.addMoreMusiquesByUrl(this.switchUrl(input, selectOption), offset)
    }

    switchUrl(input, selectOption){
        let url;
        switch(parseInt(selectOption)){
            case 1: url = 'https://musicbrainz.org/ws/2/recording/?query=recording:"' + encodeURIComponent(input) + '"%20OR%20artist:"' + encodeURIComponent(input) + '"%20OR%20release:"' + encodeURIComponent(input) + '"&limit=100&offset=' ;
                break;
            case 2: url = 'https://musicbrainz.org/ws/2/recording/?query=recording:"' + encodeURIComponent(input) + '"&limit=100&offset=' ;
                break;
            case 3:  url = 'https://musicbrainz.org/ws/2/recording/?query=artist:"' + encodeURIComponent(input) + '"&limit=100&offset=';
                break;
            case 4:  url = 'https://musicbrainz.org/ws/2/recording/?query=release:"' + encodeURIComponent(input) + '"&limit=100&offset=';
                break;
        }
        return url
    }
}

const app = new MusiqueController(new MusiqueModel(), new MusiqueView())

