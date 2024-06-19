//Adicionar informação à tabela
/*function Informacao() {
    window.location.href = 'tabelaClientes.html';
  }

  var form = document.getElementById("myForm");
  var userName = document.getElementById("name");
  var brand = document.getElementById("brand");
  var problems = document.getElementById("problems");
  var Inspdate = document.getElementById("Idate");
  var passou = document.getElementById("passou");
  var submitBtn = document.querySelector(".submit");
  var userInfo = document.getElementById("data");
  var modal = document.getElementById("userForm");
  var modalTitle = document.querySelector("#userForm .modal-title");
  var newUserBtn = document.querySelector(".newUser")

  let getData = [];
  let isEdit = false, editId;

  showInfo()

    newUserBtn.addEventListener('click', () => {
        submitBtn.innerText = 'Submit';
        modalTitle.innerText = "Fill the Form";
        isEdit = false;
        form.reset();
    });


function showInfo(){
  document.querySelectorAll('.clienteDetails').forEach(info => info.remove())
  getData.forEach((element, index) => {
      let createElement = `<tr class="clienteDetails">
          <td>${index+1}</td>
          <td>${element.clienteName}</td>
          <td>${element.clienteBrand}</td>
          <td>${element.clienteProblems}</td>
          <td>${element.clienteInspdate}</td>
          <td>${element.clientePassou}</td>

          <td>
              <button class="btn btn-success" onclick="readInfo('${element.clienteName}', '${element.clienteBrand}', '${element.clienteProblems}', '${element.clienteInspdate}', '${element.clientePassou}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

              <button class="btn btn-primary" onclick="editInfo(${index}, '${element.clienteName}', '${element.clienteBrand}', '${element.clienteProblems}', '${element.clienteInspdate}', '${element.clientePassou}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

              <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                          
          </td>
      </tr>`

      userInfo.innerHTML += createElement
  })
}
showInfo()

function readInfo(name, brand, problems, Idate, passou){

  document.querySelector('#showName').value = name;
  document.querySelector("#showBrand").value = brand;
  document.querySelector("#showProblems").value = problems;
  document.querySelector("#showsDate").value = Idate;
  document.querySelector('#showPassou').value = passou;
}

function editInfo(index, name, Brand, Problems, Idate, Passou){
  isEdit = true
  editId = index,
  userName.value = name,
  brand.value = Brand,
  problems.value = Problems,
  Inspdate.value = Idate,
  passou.value = Passou,
  submitBtn.innerText = "Update"
  modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
  if(confirm("Are you sure want to delete?")){
      getData.splice(index, 1)
      localStorage.setItem("userProfile", JSON.stringify(getData))
      showInfo()
  }
}

form.addEventListener('submit', (e)=> {
  e.preventDefault()

  const information = {
      clienteName: userName.value,
      clienteBrand: brand.value,
      clienteProblems: problems.value,
      clienteInspdate: Idate.value,
      clientePassou: passou.value
  }

  if(!isEdit){
      getData.push(information)
  }
  else{
      isEdit = false
      getData[editId] = information
  }

  localStorage.setItem('userProfile', JSON.stringify(getData))

  submitBtn.innerText = "Submit"
  modalTitle.innerHTML = "Fill The Form"

  showInfo()

  form.reset() 

  // modal.style.display = "none"
  // document.querySelector(".modal-backdrop").remove()
}) */
  

  var form = document.getElementById("myForm");
  var userName = document.getElementById("name");
  var brand = document.getElementById("brand");
  var problems = document.getElementById("problems");
  var Inspdate = document.getElementById("date"); // Updated to match the ID in the HTML
  var passou = document.getElementById("passou");
  var submitBtn = document.querySelector(".submit");
  var userInfo = document.getElementById("data");
  var modal = document.getElementById("userForm");
  var modalTitle = document.querySelector("#userForm .modal-title");
  var newUserBtn = document.querySelector(".newUser");
  
  let getData = [];
  let isEdit = false, editId;
  
  // Fetch data from API
  async function fetchData() {
      try {
          const response = await axios.get('http://localhost:4242/api/v2/clients'); // Replace with your API URL
          getData = response.data;
          console.log('Data fetched from API:', getData); // Debugging line
          showInfo();
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  
  newUserBtn.addEventListener('click', () => {
      submitBtn.innerText = 'Submit';
      modalTitle.innerText = "Fill the Form";
      isEdit = false;
      form.reset();
  });
  
  function showInfo() {
      userInfo.innerHTML = ''; // Clear existing data
      getData.forEach((element, index) => {
          let createElement = `<tr class="clienteDetails">
              <td>${index + 1}</td>
              <td>${element.name}</td>
              <td>${element.brand}</td>
              <td>${element.problems}</td>
              <td>${element.date}</td>
              <td>${element.passou}</td>
              <td>
                  <button class="btn btn-success" onclick="readInfo('${element.name}', '${element.brand}', '${element.problems}', '${element.date}', '${element.passou}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                  <button class="btn btn-primary" onclick="editInfo(${index}, '${element.name}', '${element.brand}', '${element.problems}', '${element.date}', '${element.passou}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                  <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
              </td>
          </tr>`;
  
          userInfo.innerHTML += createElement;
      });
  }
  
  function readInfo(name, brand, problems, date, passou) {
      document.querySelector('#showName').value = name;
      document.querySelector("#showBrand").value = brand;
      document.querySelector("#showProblems").value = problems;
      document.querySelector("#showDate").value = date; // Updated to match the ID in the HTML
      document.querySelector('#showPassou').value = passou;
  }
  
  function editInfo(index, name, Brand, Problems, date, Passou) {
      isEdit = true;
      editId = index;
      userName.value = name;
      brand.value = Brand;
      problems.value = Problems;
      Inspdate.value = date;
      passou.value = Passou;
      submitBtn.innerText = "Update";
      modalTitle.innerText = "Update The Form";
  }
  
  async function deleteInfo(index) {
      if (confirm("Are you sure want to delete?")) {
          try {
              console.log('Deleting item at index:', index); // Debugging line
              await axios.delete(`http://localhost:4242/api/v2/clients/${getData[index].id}`); // Replace with your API URL
              getData.splice(index, 1);
              showInfo();
          } catch (error) {
              console.error('Error deleting data:', error);
          }
      }
  }
  
  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Form submit event triggered'); // Debugging line
  
      const information = {
          clienteName: userName.value,
          clienteBrand: brand.value,
          clienteProblems: problems.value,
          clienteInspdate: Inspdate.value, // Corrected to match the ID in the HTML
          clientePassou: passou.value
      };
  
      console.log('Form data to be submitted:', information); // Debugging line
  
      try {
          if (!isEdit) {
              console.log('Submitting new data to API'); // Debugging line
              const response = await axios.post('http://localhost:4242/api/v2/clients', information); // Replace with your API URL
              console.log('Response from API after submitting new data:', response.data); // Debugging line
              getData.push(response.data);
          } else {
              console.log('Updating existing data in API'); // Debugging line
              await axios.put(`http://localhost:4242/api/v2/clients/${getData[editId].id}`, information); // Replace with your API URL
              getData[editId] = information;
              isEdit = false;
          }
  
          submitBtn.innerText = "Submit";
          modalTitle.innerHTML = "Fill The Form";
          showInfo();
          form.reset();
  
          // Hide modal
          const modalElement = bootstrap.Modal.getInstance(modal);
          modalElement.hide();
      } catch (error) {
          console.error('Error submitting form:', error);
      }
  });
  
  // Initial fetch
  fetchData();
  

