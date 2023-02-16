class Product{
    constructor(id, title, description, price, discountPercentage , rating, stock, brand, category, thumbnail, images){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.rating = rating;
        this.stock = stock;
        this.brand = brand;
        this.category = category;
        this.thumbnail = thumbnail;
        this.images = images;
    }

    vypis(){
        let zprava = `<div class="card m-2" style="width: 18rem;">
        <img src="${this.images[0]}" class="card-img-top" alt="img">
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <p class="card-text">${this.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Price: ${this.price}$</li>
          <li class="list-group-item">Discount percentage: ${this.discountPercentage}%</li>
          <li class="list-group-item">Rating: ${this.rating}</li>
          <li class="list-group-item">Stock: ${this.stock}</li>
          <li class="list-group-item">Brand: ${this.brand}</li>
          <li class="list-group-item">Category: ${this.category}</li>
        </ul>
      </div>`;
      return zprava
    }

    vypisTable(){
        let zprava = `<table class="table table-striped m-2">
        <tbody>
          <tr>
            <th scope="row">${this.id}</th>
            <td>${this.title}</td>
            <td>${this.description}</td>
            <td>${this.price}</td>
            <td>@${this.discountPercentage}</td>
            <td>${this.rating}</td>
            <td>${this.stock}</td>
            <td>@${this.brand}</td>
            <td>${this.category}</td>
          </tr>
        </tbody>
      </table>`;
      return zprava;
    }
}

class EvidenceProduktu{
    constructor(){
        this.produkty = [];
        this.getProduct();
        console.log(this.produkty)
    }

    getProduct(){
        let xhttp = new XMLHttpRequest();
        let url = "https://dummyjson.com/products";
        xhttp.open("GET", url);
        xhttp.send();
        xhttp.onload = (e) =>{
            let data = JSON.parse(xhttp.responseText);
            console.log(data);
            data["products"].forEach(element => {
                this.addProdukt(new Product(
                    element.id,
                    element.title,
                    element.description,
                    element.price,
                    element.discountPercentage,
                    element.rating,
                    element.stock,
                    element.brand,
                    element.category,
                    element.thumbnail,
                    element.images
                ));
            });
        }
    }

    addProdukt(pro){
        this.produkty.push(pro);
    }
    delProdukt(id){
        this.produkty.remove(id);
    }

    print(){
        let dataCard = "";
        this.produkty.forEach(pro =>{
            dataCard += pro.vypis();
        });
        let main = document.getElementById("main");
        main.innerHTML = dataCard;
    }

    printTable(){
        let dataTab = "";
        this.produkty.forEach(pro =>{
            dataTab += pro.vypisTable();
        });
        let main = document.getElementById("main");
        main.innerHTML = dataTab;
    }

}
let evidence = new EvidenceProduktu();

let submitKrty = document.getElementById("karty");
let tabulkaData = document.getElementById("dataTable");

submitKrty.addEventListener("click", () => {
    evidence.print();
});

tabulkaData.addEventListener("click", ()=>{
    evidence.printTable();
});