class Product {
  constructor(
    id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images
  ) {
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

  vypis() {
    let zprava = `<div class="card m-2" style="width: 18rem;">
      <div class="card-header">
        ${this.title}
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"> DES: ${this.description}</li>
        <li class="list-group-item">PRICE: ${this.price}</li>
        <li class="list-group-item"> DIS: ${this.discountPercentage}%</li>
        <li class="list-group-item">RATING: ${this.rating}</li>
        <li class="list-group-item">STOCK: ${this.stock}</li>
        <li class="list-group-item">CATEGORY: ${this.category}</li>
      </ul>
    </div>`;
    return zprava;
  }

  vypisTable() {
    let zprava = `<table class="table table-success table-striped m-2">
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

class EvidenceProduktu {
  constructor() {
    this.produkty = [];
    this.getProduct();
    console.log(this.produkty);
  }

  getProduct() {
    let xhttp = new XMLHttpRequest();
    let url = "https://dummyjson.com/products";
    xhttp.open("GET", url);
    xhttp.send();

    xhttp.onprogress = (event) => {
      console.log(`Downloaded ${event.loaded} of ${event.total} bytes`);
      let progres = document.getElementById("progres");
      let complete = /*event.loaded*/ (100 / /*event.total*/ 100) * 100;
      console.log(complete);
      progres.style.width = complete + "%";
    };

    xhttp.onerror = (e) => {
      console.log("Error");
    };

    xhttp.onload = (e) => {
      let data = JSON.parse(xhttp.responseText);
      console.log(data);
      data["products"].forEach((element) => {
        this.addProdukt(
          new Product(
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
          )
        );
      });
      this.print();
      this.saveToLocal();
    };
  }

  addProdukt(pro) {
    this.produkty.push(pro);
  }
  delProdukt(id) {
    this.produkty.remove(id);
  }

  print() {
    let dataCard = "";
    this.produkty.forEach((pro) => {
      dataCard += pro.vypis();
    });
    let main = document.getElementById("main");
    main.style.visibility = "visible";
    main.innerHTML = dataCard;
  }

  printTable() {
    let dataTab = "";
    this.produkty.forEach((pro) => {
      dataTab += pro.vypisTable();
    });
    let main = document.getElementById("main");
    main.style.visibility = "visible";
    main.innerHTML = dataTab;
  }

  saveToLocal() {
    localStorage.setItem("produkts", JSON.stringify(this.produkty));
  }

  getFromLocal() {
    localStorage.getItem("produkts");
  }
}

let evidence = new EvidenceProduktu();

let submitKrty = document.getElementById("karty");
let tabulkaData = document.getElementById("dataTable");
let saveToLocalButton = document.getElementById("save");

submitKrty.addEventListener("click", () => {
  evidence.print();
});

tabulkaData.addEventListener("click", () => {
  evidence.printTable();
});

/*
saveToLocalButton.addEventListener("click", () => {
    evidence.saveToLocal();
});
*/
