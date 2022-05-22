let id = 1;

class Project {
  constructor(author, price, prizes = []) {
    this.author = author;
    this.price = price;
    this.prizes = prizes;
    this.id = id++;
  }
}

class StringifyProject extends Project {
  ToString() {
    return `
            author: ${this.author}
            price: ${this.price}
            prizes: ${this.prizes}
            `;
  }
}

class AllProjects {
  constructor() {
    this.projects = [];
  }

  addOne(elem) {
    this.projects.push(elem);
  }

  addMany(elems) {
    elems.forEach((elem) => {
      this.projects.push(elem);
    });
  }

  delete(id) {
    let index = this.projects.findIndex((elem) => elem.id == id);
    if (index == -1) throw "Not found";
    this.projects.splice(index, 1);
  }

  edit(someId, newObj) {
    let oldObj = this.projects.findIndex((elem) => elem.id == someId);
    this.projects[oldObj] = newObj;
    this.projects[oldObj].id = someId;
    id--;
  }

  getById(id) {
    return this.projects.find((elem) => elem.id == id);
  }

  getByPrice(x) {
    return this.projects.filter(
      (elem) => elem.prizes.reduce((partialSum, a) => partialSum + a, 0) >= x
    );
  }

  getInfo(id) {
    return this.getById(id).ToString();
  }

  getAll() {
    return [...this.projects];
  }
}

class ProjectsHTML extends AllProjects {
  projectsToHTML(project) {
    return `
          <tr>
          <td>
              ${project.id}
          </td>
          <td>
              ${project.author}
          </td>
          <td>
              ${project.price}
          </td>
          <td>
              ${project.prizes}
          </td>
          <td> 
              <button onclick="DeleteUser(${project.id})">
                  Delete
              </button>
          </td>
          <td> 
              <button onclick="StartEditUser(${project.id})">
                  Edit
              </button>
          </td>
          </tr>
        `;
  }

  projectsTableToHTML() {
    let rows = "";
    for (let project of this.getAll()) {
      rows += this.projectsToHTML(project);
    }
    return `
        <table>
            <tr>
                <th>
                    Id
                </th>
                <th>
                    Author
                </th>
                <th>
                    Price
                </th>
                <th>
                    Prizes
                </th>
                <th colspan="2">
                    Actions
                </th>
            </tr>
            ${rows}
        </table>
        <br>
        <button type="button" onclick="ShowAddUser()">
            Add user
        </button>
    `;
  }

  addFormToHTML() {
    return ` 
        <div id="add">
            <form name="addForm" method="post" action="#">
                <h3> Add User </h3>
                <input name="author" placeholder="author"> 
                <input name="price" placeholder="price">
                <input name="prizes" placeholder="prizes">
                <button type="button" onclick="AddNewUser()">
                    Save
                </button>
            </form>
        </div>
    `;
  }

  editFormToHTML() {
    return ` 
        <div id="edit">
            <form name="editForm" method="post" action="#">
                <h3> Edit User </h3>
                <input name="id" type="hidden">
                <input name="author" placeholder="author"> 
                <input name="price" placeholder="price">
                <input name="prizes" placeholder="prizes">
                <button type="button" onclick="EditUser()">
                    Save
                </button>
            </form>
        </div>
    `;
  }

  toHTML() {
    return (
      this.projectsTableToHTML() + this.addFormToHTML() + this.editFormToHTML()
    );
  }

  addEventListners() {
    document.addEventListener("deleteUser", (event) => {
      super.delete(event.detail.id);
      document.getElementById("root").innerHTML = this.toHTML();
    });

    document.addEventListener("addUser", (event) => {
      super.addOne(
        new StringifyProject(
          event.detail.author,
          event.detail.price,
          event.detail.prizes
        )
      );
      document.getElementById("root").innerHTML = this.toHTML();
    });

    document.addEventListener("editUser", (event) => {
      super.edit(
        event.detail.id,
        new StringifyProject(
          event.detail.author,
          event.detail.price,
          event.detail.prizes
        )
      );
      document.getElementById("root").innerHTML = this.toHTML();
    });
  }
}

function DeleteUser(id) {
  let deleteUserEvent = new CustomEvent("deleteUser", { detail: { id } });
  document.dispatchEvent(deleteUserEvent);
}

function AddNewUser() {
  const author = document.getElementsByName("author")[0].value;
  const price = document.getElementsByName("price")[0].value;
  const prizes = document.getElementsByName("prizes")[0].value;
  let addUserEvent = new CustomEvent("addUser", {
    detail: {
      author,
      price,
      prizes,
    },
  });
  document.dispatchEvent(addUserEvent);
}

function ShowAddUser() {
  document.getElementById("add").style.display = "block";
  document.getElementById("edit").style.display = "none";
}

function EditUser() {
  const author = document.getElementsByName("author")[1].value;
  const price = document.getElementsByName("price")[1].value;
  const prizes = document.getElementsByName("prizes")[1].value;
  const id = document.getElementsByName("id").value;
  let addUserEvent = new CustomEvent("editUser", {
    detail: {
      id,
      author,
      price,
      prizes,
    },
  });
  document.dispatchEvent(addUserEvent);
}

function StartEditUser(id) {
  document.getElementById("edit").style.display = "block";
  document.getElementById("add").style.display = "none";

  let project = projects.getById(id);

  document.getElementsByName("author")[1].value = project.author;
  document.getElementsByName("price")[1].value = project.price;
  document.getElementsByName("prizes")[1].value = project.prizes;

  document.getElementsByName("id").value = id;
}

let Project1 = new StringifyProject("Bob", 100, [1, 2, 3]);
let Project2 = new StringifyProject("Jack", 120, [4, 5, 6]);
let Project3 = new StringifyProject("Mark", 130, [7, 8, 9]);
let Project4 = new StringifyProject("Kyle", 110, [1, 4, 7]);

let projects = new ProjectsHTML();

projects.addOne(Project1);
projects.addOne(Project2);
projects.addOne(Project3);
projects.addOne(Project4);

document.getElementById("root").innerHTML = projects.toHTML();
projects.addEventListners();
