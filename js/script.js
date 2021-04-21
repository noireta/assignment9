// CREATE AN ARRAY OF EMPLOYEES
let form = document.getElementById("addForm");
let empTable = document.getElementById('employees');
var empCount = document.getElementById('empCount');

let arrEmployees = [
    [12345678, 'Pompa Guha',1234, 'pompaguha@yahoo.com','Administrative'],
    [12348756, 'Soma Roy',3456,   'somaroy@yahoo.com','Administrative'  ],
    [87561234, 'Rama Basu',5630,  'ramabasu@yahoo.com','Administrative' ],
    [34001277, 'Maki Biswas',3662, 'makibis@yahoo.com','Administrative' ],
    [12335891, 'Nita Dev',3422,    'nitadev@yahoo.com','Administrative' ]
];


// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS

let  empTableData = JSON.parse(localStorage.getItem('empdetails'));

// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY

if (!empTableData) {
  empTableData = arrEmployees;
};

// GET DOM ELEMENTS
let tbody = document.getElementsByTagName('tbody');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS

buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {

// PREVENT FORM SUBMISSION

    console.log("In form Sub");
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT

    let newEmpDetail = [];
    newEmpDetail[0] = document.getElementById('id').value;
    newEmpDetail[1] = document.getElementById('name').value;
    newEmpDetail[2] = document.getElementById('extension').value;
    newEmpDetail[3] = document.getElementById('email').value;
    newEmpDetail[4] = document.getElementById('department').value

    
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    empTableData[empTableData.length] = newEmpDetail ;
     
    // BUILD THE GRID

     buildGrid();

    // RESET THE FORM
   
    document.querySelector('#addForm').reset();

    // SET FOCUS BACK TO THE ID TEXT BOX


    document.querySelector('#id').focus();

});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE

    if (e.target.classList.contains('delete')) {
      if (confirm('Are you sure you want to delete this employee?')) {

        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
         let deleteRowIndex = e.target.parentElement.parentElement.rowIndex;

        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
     
        console.log(e.target.parentElement.parentElement.parentElement.childNodes.length);

        // REMOVE EMPLOYEE FROM ARRAY
        empTableData.splice(deleteRowIndex-1,1);
        // BUILD THE GRID
        buildGrid();
      }
    }

});

// BUILD THE EMPLOYEES GRID
function buildGrid() {

    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    let tBody = document.getElementsByTagName('tbody');

    let tableElement = tBody[0].parentNode;
    tableElement.removeChild(tBody[0]);

    // REBUILD THE TBODY FROM SCRATCH
    let newTbody = document.createElement('tbody');
    
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    for ( let empDetail of empTableData) {
      newTbody.appendChild(createTableRow(empDetail));
    }
    // REBUILDING THE ROW STRUCTURE
    // BIND THE TBODY TO THE EMPLOYEE TABLE

    tableElement.appendChild(newTbody)

    // UPDATE EMPLOYEE COUNT
    
    empCount.value = empTableData.length ;

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('empdetails',JSON.stringify(empTableData))

};


function createTableRow (rowDetails){
// create row
  let row = document.createElement("tr");

  for(let ele of rowDetails){
     
  
    let cell = document.createElement("td");
    let cellText = document.createTextNode(ele);
    cell.appendChild(cellText);
    row.appendChild(cell);

  }

    var cellDelete = document.createElement("td");
    var delText=document.createTextNode('DELETE')
    var btn = document.createElement("BUTTON");
    btn.type='button';
    btn.className="btn btn-primary delete";
    btn.appendChild(delText);
    cellDelete.appendChild(btn);
    row.appendChild(cellDelete);

  return row;
}

 
