const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let jsondata;
fetch(url)
  .then((response) => JSON.parse(response))
  .then((json) => (jsondata = json));

function loadData(item) {
  let header = document.getElementById("name");
  let table = document.getElementById("table-content");
  const data = jsondata[item];
  header.innerHTML = data.name;
  const products = data.products;
}
