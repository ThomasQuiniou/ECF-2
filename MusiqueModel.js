class MusiqueModel {
    constructor() {
        this.musiques = [];
    }

    addMusiquesByUrl(url, offset){
        this.musiques = []
        this.request(url, offset)

    }

    addMoreMusiquesByUrl(url, offset){
        this.request(url, offset)

    }

    MusicListChanged(callback) {
        this.onMusicListChanged = callback
    }

    request(url, offset){
        const httpRequest = new XMLHttpRequest();
        httpRequest.addEventListener('readystatechange', () => {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                const response = JSON.parse(httpRequest.responseText);
                response.recordings.map( (obj) => {

                    let release;
                    if(obj['releases']){

                        release = obj['releases'][0]['title'];
                    }
                    else{
                        release = '-';
                    }

                    const music = {

                        id: this.musiques.length > 0 ? this.musiques[this.musiques.length - 1].id + 1 : 1,
                        titre: obj['title'],
                        artiste: obj['artist-credit'][0]['name'],
                        album: release,
                        mbid: obj.id
                    }
                    this.musiques.push(music)
                })
                this.onMusicListChanged(this.musiques)
            }
        })
        httpRequest.open('GET', url + offset , true);
        httpRequest.setRequestHeader('Accept', 'application/json')
        httpRequest.send();
    }
}

