function convertDuration(length){
    const temps = length / 1000;
    let minutes = Math.floor(temps/60);
    let secondes = Math.floor(temps%60);
    if(secondes < 10){
        secondes = '0' + secondes;
    }
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    const duree = minutes + ' min ' + secondes;
    if(duree !== '00:00'){
        length = duree;
    }
    else{
        length = '-'
    }
    return length
}