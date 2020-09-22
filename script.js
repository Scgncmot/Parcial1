const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let comprados = [];

let confirmados = [];

let jsondata;
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    jsondata = json;
    loadData(0);
  });

function loadData(item) {
  let header = document.getElementById("header1");
  let content = document.getElementById("content");

  while (!header || !content) {
    header = document.getElementById("header1");
    content = document.getElementById("content");
  }

  content.innerHTML = '<div class="row" id ="items"></div>';
  let items = document.getElementById("items");
  const data = jsondata[item];
  console.log(header);
  header.innerHTML = data.name;
  const products = data.products;
  items.innerHTML = "";
  i = 0;
  products.forEach((product) => {
    let div = document.createElement("div");
    div.className =
      "col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 d-flex align-items-stretch";
    div.style.paddingBottom = "2em";
    div.innerHTML = generateHtml(product, item, i);
    items.appendChild(div);
    i++;
  });
}

function generateHtml(product, number, i) {
  let html = '<div class="card">';
  html =
    html +
    '<div class ="embed-responsive embed-responsive-16by9"> <img class="card-img-top embed-responsive-item" src="' +
    product.image +
    '"alt="Card image cap"> </div>';
  html = html + '<div class="card-body" s>';
  html = html + '<h5 class="card-title">' + product.name + "</h5>";
  html = html + '<p class="card-text">' + product.description + "</p>";
  html = html + '<p class="card-text"><b>$' + product.price + "</b></p> </div>";
  html =
    html +
    '<div class ="card-footer"> <a onclick="addToCar(' +
    number +
    "," +
    i +
    ')" class="btn btn-dark">Add to car</a></div></div>';
  return html;
}

function addToCar(number, i) {
  let prod = jsondata[number].products[i];

  let indexExist = comprados.findIndex((obj) => obj.number == number + "-" + i);

  if (indexExist != -1) {
    comprados[indexExist].quantity = comprados[indexExist].quantity + 1;
  } else {
    let obj = { product: prod, number: number + "-" + i, quantity: 1 };
    comprados.push(obj);
  }

  let x = document.getElementById("number");
  let num = parseInt(x.innerHTML) + 1;
  x.innerHTML = num;
}

function deployCart() {
  document.getElementById("header1").innerHTML = "Order Detail";
  let cont = document.getElementById("content");
  cont.innerHTML = generateCartHtml();
}

function generateCartHtml() {
  let html =
    '<div> <div> <table class="table table-striped"><thead><tr><th>Item</th><th>Qty</th><th>Description</th><th>Unit Price</th><th>Amount</th><tr></thead><tbody>';
  i = 1;
  let total = 0;

  comprados.forEach((obj) => {
    let amount = obj.quantity * parseFloat(obj.product.price);
    let confObj = {
      item: i,
      quantity: obj.quantity,
      description: obj.product.name,
      unitPrice: parseFloat(obj.product.price),
    };
    confirmados.push(confObj);
    html =
      html +
      "<tr><td>" +
      i +
      "</td>" +
      "<td>" +
      obj.quantity +
      "</td>" +
      "<td>" +
      obj.product.name +
      "</td>" +
      "<td>" +
      obj.product.price +
      "</td>" +
      "<td>" +
      amount +
      "</td></tr>";
    i++;
    total += amount;
  });
  html =
    html +
    "</tbody></table></div> <div> <b>Total: $" +
    total +
    '</b><div class="customButtons"><a data-toggle="modal" data-target="#exampleModal" class="btn cancel btn-danger">Cancel</a><a class="btn confirm btn-dark" style="margin-left: 5px;" onclick="confirmOrder()">Confirm Order</a></div></div> </div>';
  return html;
}

function cancelOrder() {
  comprados = [];
  confirmados = [];
  deployCart();
  let x = document.getElementById("number");
  x.innerHTML = 0;
}

function confirmOrder() {
  console.log(confirmados);
  comprados = [];
  confirmados = [];
  deployCart();
  let x = document.getElementById("number");
  x.innerHTML = 0;
}
