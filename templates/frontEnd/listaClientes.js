//Adicionar informação à tabela
function Informacao() {
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

  let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

  let isEdit = false, editId
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
  debugger
  document.querySelector('#showName').value = name;
  document.querySelector("#showBrand").value = brand;
  document.querySelector("#showProblems").value = problems;
  document.querySelector("#showDate").value = Idate;
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
})
  



