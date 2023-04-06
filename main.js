/*
function getDataa() {
  let request = new XMLHttpRequest();
  request.open("Get", "/data.json");
  request.send();

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(this.responseText));
    }
  };
}
*/

// filter by Region
let optionContainer = document.querySelector("#sel-options");
let selectOptions = document.querySelectorAll("select option");
//filter by country
let contryInput = document.querySelector(".c-input");
//
let fetchingContainer = document.querySelector(".countries .container");

getdata();
function getdata() {
  fetch("https://api.jsonbin.io/v3/b/642f3ffcace6f33a22061743")
    .then((data) => {
      return data.json();
    })
    .then((xx) => {
      let result = xx.record;
      console.log(result);
      result.forEach((ele) => {
        orderData(ele);
      });

      let cBoxs = document.querySelectorAll(".c-box");
      //by region
      optionContainer.onchange = function () {
        filtering(selectOptions, cBoxs);
      };
      //by country

      contryInput.oninput = function () {
        filterbyCountry(contryInput, cBoxs);
      };
    });
}

//elements to dom

function orderData(x) {
  let counrtyBox = document.createElement("div");
  counrtyBox.className = "c-box";
  counrtyBox.dataset.region = x.region;
  counrtyBox.dataset.alphacode = x.alpha3Code;
  counrtyBox.dataset.smallalphacode = x.alpha3Code.toLowerCase();

  let counrtyImg = document.createElement("img");
  counrtyImg.src = x.flag;
  //
  let dataBox = document.createElement("div");
  dataBox.className = "data";
  //
  let cName = document.createElement("div");
  cName.className = "name";
  cName.innerHTML = x.name;
  //
  let itData = document.createElement("div");
  itData.className = "it-data";
  //
  let population = document.createElement("div");
  population.className = "pop";
  let popWord = document.createElement("span");
  popWord.innerHTML = "population: ";
  let fetchPop = document.createElement("span");
  fetchPop.className = "f-p";
  fetchPop.innerHTML = x.population;
  //
  population.appendChild(popWord);
  population.appendChild(fetchPop);
  //
  let region = document.createElement("div");
  region.className = "reg";
  let regWord = document.createElement("span");
  regWord.innerHTML = "Region: ";
  let fetchReg = document.createElement("span");
  fetchReg.className = "f-r";
  fetchReg.innerHTML = x.region;
  //
  region.appendChild(regWord);
  region.appendChild(fetchReg);
  //
  let capital = document.createElement("div");
  capital.className = "cap";
  let capWord = document.createElement("span");
  capWord.innerHTML = "Capital: ";
  let fetchCap = document.createElement("span");
  fetchCap.className = "f-c";
  fetchCap.innerHTML = x.capital;
  //
  capital.appendChild(capWord);
  capital.appendChild(fetchCap);
  //
  itData.appendChild(population);
  itData.appendChild(region);
  itData.appendChild(capital);
  //
  dataBox.appendChild(cName);
  dataBox.appendChild(itData);
  //
  counrtyBox.appendChild(counrtyImg);
  counrtyBox.appendChild(dataBox);

  //
  fetchingContainer.appendChild(counrtyBox);
}

// Darkmode

let DarkmodeBtn = document.querySelector(".dark-mode .icon");

DarkmodeBtn.onclick = function () {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.documentElement.style.setProperty("--White", "hsl(0, 0%, 100%)");
    document.documentElement.style.setProperty(
      "--Dark-Gray",
      "hsl(0, 0%, 52%)"
    );
    document.documentElement.style.setProperty(
      "--Very-Dark-Blue",
      "hsl(200, 15%, 8%)"
    );
    document.documentElement.style.setProperty(
      "--Very-Light-Gray",
      "hsl(0, 0%, 98%)"
    );
  } else {
    document.body.classList.add("dark");
    document.documentElement.style.setProperty("--White", "hsl(209, 23%, 22%)");
    document.documentElement.style.setProperty(
      "--Dark-Gray",
      "hsl(0, 0%, 100%)"
    );
    document.documentElement.style.setProperty(
      "--Very-Dark-Blue",
      "hsl(0, 0%, 100%)"
    );
    document.documentElement.style.setProperty(
      "--Very-Light-Gray",
      "hsl(200, 15%, 8%)"
    );
  }
};

//filter function
function filtering(opts, couns) {
  //cun== cboxs
  //opt==selectOptions
  opts.forEach((opt) => {
    if (opt.selected) {
      let neededRegion = opt.innerHTML;
      couns.forEach((c) => {
        if (c.dataset.region !== neededRegion) {
          c.style.display = "none";
        } else {
          c.style.display = "block";
        }
      });
    }
  });
}

//filterbyCountry

function filterbyCountry(e, c) {
  if (e.value.length < 3) {
    c.forEach((e) => {
      e.style.display = "block";
    });
  } else {
    let neededCountry = contryInput.value;
    c.forEach((elem) => {
      if (
        elem.dataset.alphacode == neededCountry ||
        elem.dataset.smallalphacode == neededCountry
      ) {
        elem.style.display = "block";
      } else {
        elem.style.display = "none";
      }
    });
  }
}
