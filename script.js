"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const heathyPetBtn = document.querySelector("#healthy-btn");
const calculateBMIBtn = document.querySelector("#CalcBMI-btn");
const BMI = document.querySelector("#BMI");

const tableBodyEl = document.querySelector("#tbody");
const petArr = [];

const d = new Date();
console.log(d);

console.log(d.getDate());
console.log(d.getMonth() + 1);

//Submit Form and get data từ Form
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    color: colorInput.value,
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    BMI: "?",
    date: new Date(),
  };

  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    renderTableData(petArr);
    clearInput();
  }

  //ValidateData
  function validateData(data) {
    const isValidate = true;

    if (data.id.trim() === "") {
      alert("Id cannot be left blank");
      isValidate = false;
    }

    if (data.name.trim() === "") {
      alert("name cannot be left blank");
      isValidate = false;
    }

    if (isNaN(data.age)) {
      alert("Age cannot be left blank");
      isValidate = false;
    }
    if (data.type === "Select Type") {
      alert("Please select Type");
      isValidate = false;
    }

    if (1 > data.age || data.age > 15) {
      alert("Age must be between 1 and 15!");
      isValidate = false;
    }

    if (isNaN(data.weight)) {
      alert("Weight cannot be left blank");
      isValidate = false;
    }
    if (1 > data.weight || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      isValidate = false;
    }
    if (isNaN(data.length)) {
      alert("Length cannot be left blank");
      isValidate = false;
    }
    if (1 > data.length || data.length > 100) {
      alert("Length must be between 1 and 100!");
      isValidate = false;
    }

    if (data.breed === "Select Breed") {
      alert("Please select Breed");
      isValidate = false;
    }

    // Kiểm tra Id có phải duy nhất không
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        alert("ID must be unique!");
        isValidate = false;
        break;
      }
    }

    return isValidate;
  }
});

//clearInput
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  colorInput.value = "";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// renderTableData
function renderTableData(arr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr"); // create thẻ tr
    row.innerHTML = ` 
      <th>${arr[i].id}</th>
      <td>${arr[i].name}</td>
       <td>${arr[i].age}</td>
       <td>${arr[i].type}</td>
       <td>${arr[i].weight} kg</td>
       <td>${arr[i].length} cm</td>
       <td>${arr[i].breed}</td>
       <td><i class="bi-square-fill" style="color: ${arr[i].color};"></i></td>
                  
                  <td><i class="bi ${
                    arr[i].vaccinated
                      ? "bi-check-circle-fill"
                      : "bi-x-circle-fill"
                  }"></i></td>
                  <td><i class="bi ${
                    arr[i].dewormed
                      ? "bi-check-circle-fill"
                      : "bi-x-circle-fill"
                  }"></i></td>
                  <td><i class="bi ${
                    arr[i].sterilized
                      ? "bi-check-circle-fill"
                      : "bi-x-circle-fill"
                  }"></i></td>
                  <td>${arr[i].BMI}</td>
    
       <td>${arr[i].date.getDate()}/${arr[i].date.getMonth() + 1}/${arr[
      i
    ].date.getFullYear()}</td>
       <td>
       <button class="btn btn-danger" onclick="deletePet('${
         arr[i].id
       }')">Delete</button>
     

</td>
  `;
    tableBodyEl.appendChild(row);
  }
}

//DeletePet
function deletePet(petId) {
  for (let i = 0; i < petArr.length; i++) {
    if (petId === petArr[i].id && confirm("Are you sure?")) {
      petArr.splice(i, 1);
      renderTableData(petArr);
    }
  }
}

//Show Healthy Pet
let healthCheck = true;

heathyPetBtn.addEventListener("click", function () {
  if (healthCheck === true) {
    const healthyPetArr = [];
    petArr.filter(function (item) {
      if (item.vaccinated && item.dewormed && item.sterilized) {
        healthyPetArr.push(item);
      }
      return healthyPetArr;
    });

    //Hiển thị thú khỏe mạnh
    renderTableData(healthyPetArr);
    heathyPetBtn.innerText = "Show all Pet";
    healthCheck = false;
  } else {
    renderTableData(petArr);
    heathyPetBtn.innerText = "Show Healthy Pet";
    healthCheck = true;
  }
});

// Tính BMI

let BMICheck = true;

calculateBMIBtn.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    const BMIDog = ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(
      2
    );
    const BMICat = ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(
      2
    );
    // console.log(BMIDog, BMICat);
    if (petArr[i].type === "Dog") {
      petArr[i].BMI = BMIDog;
      renderTableData(petArr);
    }
    if (petArr[i].type === "Cat") {
      petArr[i].BMI = BMICat;
      renderTableData(petArr);
    }
  }
});
