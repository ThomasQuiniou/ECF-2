class ModaleModel{

    constructor() {
        this.modales = {}
    }

    ModaleChanged(callback) {
        console.log(callback, "callback")
        this.onModaleChanged = callback
    }

    bindModale(mbid){
        console.log('bind')
        const httpRequest = new XMLHttpRequest();
        httpRequest.addEventListener('readystatechange', () => {

            if(httpRequest.readyState == 4 && httpRequest.status == 200) {



                const httpResquest = new XMLHttpRequest();
                httpResquest.open('GET', "./php/db.php?mbid=" + encodeURIComponent(mbid), true);
                httpResquest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                httpResquest.send();


                const response = JSON.parse(httpRequest.responseText);
                const listIdRelease = [];
                const artistArray = [];
                response['artist-credit'].map(function(obj){
                    artistArray.push(obj.name, obj.joinphrase)
                })
                const releaseArray = []
                response.releases.map(function(obj){
                    releaseArray.push(obj.title);
                })
                const genreArray = []
                if(response.genres.length > 0){
                    response.genres.map(function(obj){
                        genreArray.push(obj.name)
                    })
                }
                let note;
                if(response.rating.value !== null){
                    note = response.rating.value
                }
                else{
                    note = 'Pas encore noté'
                }
                this.modales.id = this.modales.length > 0 ? this.modales[this.modales.length - 1].id + 1 : 1;
                this.modales.modaleTitle = artistArray.join('') + ' / ' + response.title ;
                this.modales.Titre = response.title;
                this.modales.Artiste = artistArray.join('');
                this.modales.Album = releaseArray.join(' / ');
                this.modales.Genres = genreArray.join(' / ');
                this.modales.Note = note;
                this.modales.Durée = convertDuration(response.length);

                response.releases.map(function(obj){
                    listIdRelease.push(obj.id);
                })

                const imgArray = [];
                let iterator = 0
                for(let i = 0 ; i < listIdRelease.length ; i++){
                    const httpRequest = new XMLHttpRequest();
                    httpRequest.addEventListener('readystatechange', () =>{
                        if(httpRequest.readyState == 4 && httpRequest.status == 404){
                            this.modales.img = [];
                            this.onModaleChanged(this.modales)

                        }
                        else if(httpRequest.readyState == 4 && httpRequest.status == 200) {
                            const response = JSON.parse(httpRequest.responseText);
                            console.log('status 200')
                            async function push(){
                                response.images.map( (obj) =>{
                                    imgArray.push(obj.thumbnails.small)
                                })
                                console.log(imgArray)
                                return imgArray;
                            }

                            push().then(result => {
                                if(iterator === listIdRelease.length){

                                    this.modales.img = result;
                                    this.onModaleChanged(this.modales)

                                }
                            })
                            iterator++

                        }

                    })
                    httpRequest.open('GET', 'http://coverartarchive.org/release/' + listIdRelease[i], true )
                    httpRequest.setRequestHeader('Accept', 'application/json');
                    httpRequest.send();

                }
            }
        })
        httpRequest.open('GET', 'https://musicbrainz.org/ws/2/recording/' + encodeURIComponent(mbid) + '?inc=releases+artists+genres+ratings' , true);
        httpRequest.setRequestHeader('Accept', 'application/json');
        httpRequest.send();
    }

    addMusique(mbid){
        const httpRequest = new XMLHttpRequest();
        httpRequest.addEventListener('readystatechange', () => {

            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                const response = JSON.parse(httpRequest.responseText)
             
                let release;
                if(response['releases']){

                    release = response['releases'][0]['title'];
                }
                else{
                    release = '-';
                }

                const httpResquest = new XMLHttpRequest();
                let params =
                    'titre=' + encodeURIComponent(response.title) +
                    '&artiste=' + encodeURIComponent(response['artist-credit'][0]['name'])  +
                    '&album=' +  encodeURIComponent(release)  +
                    '&mbid=' + encodeURIComponent( mbid)
                httpResquest.open('POST', "./php/db.php", true);
                httpResquest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                httpResquest.send(params);
            }
        })
        httpRequest.open('GET', 'https://musicbrainz.org/ws/2/recording/' + encodeURIComponent(mbid) + '?inc=releases+artists+genres+ratings' , true);
        httpRequest.setRequestHeader('Accept', 'application/json');
        httpRequest.send();
    }



}