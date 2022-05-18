let id = 0;

class Project {
  constructor(author, price, prizes = []) {
    this.author = author;
    this.price = price;
    this.prizes = prizes;
    this.id = ++id;
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
    let index = this.abonents.findIndex((elem) => elem.id == id);
    if (index == -1) throw "Not found";
    this.projects.splice(index, 1);
  }

  edit(id, newObj) {
    this.projects[id] = newObj;
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
}

let Project1 = new StringifyProject("Bob", 100, [1, 2, 3]);
let Project2 = new StringifyProject("Jack", 120, [4, 5, 6]);
let Project3 = new StringifyProject("Mark", 130, [7, 8, 9]);
let Project4 = new StringifyProject("Kyle", 110, [1, 4, 7]);

let projects = new AllProjects();

projects.addOne(Project1);
projects.addOne(Project2);
projects.addOne(Project3);
projects.addOne(Project4);

console.log(projects.getInfo(2));
