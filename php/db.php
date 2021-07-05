<?php
try {
    $connexion = new PDO(
        'mysql:host=localhost;dbname=musicbrain;charset=utf8',
        'root',
        'root',
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
    );
} catch (Exception $exception) {
    echo $exception;
    exit();
}
if (isset($_POST["titre"]) && isset($_POST["artiste"]) && isset($_POST["album"]) && isset($_POST["mbid"])) {

    $titre = htmlspecialchars($_POST["titre"]);
    $artiste = htmlspecialchars($_POST["artiste"]);
    $album = htmlspecialchars($_POST["album"]);
    $mbid = htmlspecialchars($_POST["mbid"]);

    $requete = $connexion->prepare("INSERT INTO music SET titre = :titre, artiste = :artiste, album = :album, mbid = :mbid");
    $requete->execute([
        ':titre' => $titre,
        ':artiste' => $artiste,
        ':album' => $album,
        ':mbid' => $mbid
    ]);
}
if (isset($_GET['mbid'])){
    var_dump($_GET['mbid']);

    $mbid = htmlspecialchars($_GET["mbid"]);

    $requete = $connexion->prepare("SELECT mbid FROM music WHERE mbid = :mbid");
    $requete->execute([
        ':mbid' => $mbid
    ]);
    $data = $requete->rowCount();
    setcookie( 'etat',  $data, time()+60*60*24*365 , '/');
}

if (isset($_GET['list'])){
    $requete = $connexion->query("SELECT * FROM music order by id DESC");
    $data = $requete->fetchAll();
    $data = json_encode($data);

    echo $data ;
}

if (isset($_GET['delete'])){
    $mbid = htmlspecialchars($_GET["delete"]);
    $requete = $connexion->prepare("DELETE FROM music
                                  WHERE mbid = :mbid");
    $requete->execute([
          ':mbid' => $mbid
      ]);

    echo "Musique supprimé";
}
