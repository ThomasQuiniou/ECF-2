class BibliothequeModel{
    constructor() {
        this.musiques = [];
    }
    MusicBibListChanged(callback) {
        this.onMusicBibListChanged = callback
    }

    getMusique =  (param) =>{
        this.musiques = []

        const httpRequest = new XMLHttpRequest();
        httpRequest.addEventListener('readystatechange', () => {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {

                const reponse = JSON.parse(httpRequest.responseText);


                reponse.map( (obj, index) => {

                    const music = {

                        id: index,
                        titre: obj.titre,
                        artiste: obj.artiste,
                        album: obj.album,
                        mbid: obj.mbid
                    }
                    this.musiques.push(music)
                })

                this.onMusicBibListChanged(this.musiques)
            }
        })
        httpRequest.open('GET', "./php/db.php?list=" + encodeURIComponent(param), true);
        httpRequest.setRequestHeader('Accept', 'application/json')
        httpRequest.send();
    }
    deleteMusiqueOnDatabase = (mbid) =>{
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', "./php/db.php?delete=" + encodeURIComponent(mbid), true);
        httpRequest.setRequestHeader('Accept', 'application/json')
        httpRequest.send();
    }
}