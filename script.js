class Zakaznik{
    constructor(ID_Nation, Nation, ID_Year, Year, Population , Slug_Nation){
        this.ID_Nation = ID_Nation;
        this.Nation = Nation;
        this.ID_Year = ID_Year;
        this.Year = Year;
        this.Population = Population;
        this.Slug_Nation = Slug_Nation;
    }

    vypis(){
        let zprava = `<div class="card m-2" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID nation: ${this.ID_Nation}</li>
          <li class="list-group-item">Nation: ${this.Nation}</li>
          <li class="list-group-item">ID year: ${this.ID_Year}</li>
          <li class="list-group-item">Year: ${this.Year}</li>
          <li class="list-group-item">Population: ${this.Population}</li>
          <li class="list-group-item">Slug nation: ${this.Slug_Nation}</li>
        </ul>
      </div>`;
      return zprava
    }

    vypisTable(){
        let zprava = `<table class="table">
        <thead>
          <tr>
            <th scope="col">ID Nation</th>
            <th scope="col">Nation</th>
            <th scope="col">ID year</th>
            <th scope="col">Year</th>
            <th scope="col">Population</th>
            <th scope="col">Slug nation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>${this.ID_Nation}</td>
            <td>${this.Nation}</td>
            <td>${this.ID_Year}</td>
            <td>${this.Year}</td>
            <td>${this.Population}</td>
            <td>${this.Slug_Nation}</td>
          </tr>
        </tbody>
      </table>`;
      return zprava;
    }
}

class EvidenceZakazniku{
    constructor(){
        this.zakaznici = [];
        this.getZakaznici();
    }

    getZakaznici(){
        let xhttp = new XMLHttpRequest();
        let url = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
        xhttp.open("GET", url);
        xhttp.send();
        xhttp.onload = () =>{
            let data = JSON.parse(xhttp.responseText);
            console.log(data);
            data["data"].forEach(element => {
                this.addZak(new Zakaznik(
                  element.ID_Nation,
                  element.Nation,
                  element.ID_Year,
                  element.Year,
                  element.Population,
                  element.Slug_Nation
                ));
            });
        }
    }

    addZak(zak){
        this.zakaznici.push(zak);
    }
    delZak(id){
        this.zakaznici.remove(id);
    }

    print(){
        let dataCard = "";
        this.zakaznici.forEach(zak =>{
            dataCard += zak.vypis();
        });
        let main = document.getElementById("main");
        main.innerHTML = dataCard;
    }

    printTable(){
        let dataTab = "";
        this.zakaznici.forEach(zak =>{
            dataTab += zak.vypisTable();
        });
        let main = document.getElementById("main");
        main.innerHTML = dataTab;
    }

}
let evidence = new EvidenceZakazniku();

let submitKrty = document.getElementById("karty");
let tabulkaData = document.getElementById("dataTable");

submitKrty.addEventListener("click", () => {
    evidence.print();
});

tabulkaData.addEventListener("click", ()=>{
    evidence.printTable();
});