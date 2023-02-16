class Zakaznik{
    constructor(ID_Nation, Nation, ID_Year, Year, Population , Slug_Nation){
        this.ID_Nation = ID_Nation;
        this.Nation = Nation;
        this.ID_Year = ID_Year;
        this.Year = Year;
        this.Population = Population;
        this.Slug_Nation = Slug_Nation;
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
}
new EvidenceZakazniku();