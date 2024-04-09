function w3_open() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}

async function getVozila() { // ova funk povlaci podatke iz backend-a 
   
  let tableBody = document.getElementById("tableBody") //selektuje table body iz html
  tableBody.innerHTML = null //refresuje tabelu da se podaci ne bi ponavljali
 
  try { //pokusavamo da povucemo podatke i prikazemo ih u tabeli, ako se desi greska catch blok je hvata i prikazuje

    let row //kreiramo red u tabeli

    const response = await fetch("http://localhost:4000/vozila") //fecth-ovanje podataka sa servera
    const data = await response.json() //niz iz baze, response pretvara u js objekat i cuva ga u data varijabli

  

    data.forEach((vozilo) => {  //za svaki element niza data uradi ovo iz <tr></tr>, za svaki automobil napravi red i upise u tabelu
      console.log("vozilo:", vozilo);
      row = `
      <tr>
            <td>${vozilo?.id}</td>
            <td>${vozilo?.marka}</td>
            <td>${vozilo?.model}</td>
            <td>${vozilo?.registracijski_broj}</td>
            <td>${vozilo?.datum_isteka_registracije}</td>
            <td>${vozilo?.godina_proizvodnje}</td>
            <td>${vozilo?.tip_goriva}</td>
            <td>${vozilo?.status}</td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil"
                viewBox="0 0 16 16">
                <path
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
              </svg></td> 
            <td>
            <div class= "action-button" onClick="deleteVozilo(${vozilo?.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
                viewBox="0 0 16 16">
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
              </div>
              </td>
          </tr>
      ` //kopirano iz html-a i izmjenjeno iz db.json

      tableBody.innerHTML += row // dodaje red, kreirani red ubacuje u tabelu
      //table.Body.innerHTML = table.Body.innerHTML + row - moze se i ovako zapisati

    })

  } catch (err) {
    tableBody.innerHTML = `<tr>Desila se greska!</tr>`
  }

}

async function deleteVozilo(voziloId){ //funkcije koja brise vozilo
  try{
    //pokusavamo da izbrisemo vozilo
    const response = await fetch(`http://localhost:4000/vozila/${voziloId}`,{
      method: "DELETE",
    }) //govori serveru da pogodi ovaj  link `http://localhost:4000/vozila/${voziloId}`

console.log("response",response);

  }catch(err){
    //ako se desi greska prilikom brisanja odradi ovo ispod
    console.log("greska je:",err);

  }
}

getVozila() // pokretanje funkcije 