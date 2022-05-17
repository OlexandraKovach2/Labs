let id = 0;

class MusicAlbum {
  constructor(author, name, cover, songs, year, streams) {
    this.id = id++;
    this.author = author;
    this.name = name;
    this.cover = cover;
    this.songs = songs;
    this.year = year;
    this.streams = streams;
  }
}

class StringifyMusicAlbum extends MusicAlbum {
  ToString() {
    return `
            author: ${this.author}
            name: ${this.name}
            year: ${this.year}
            `;
  }
}

class MusicAlbums {
  constructor() {
    this.albums = [];
  }

  add(elem) {
    this.albums.push(elem);
  }

  delete(id) {
    let index = this.albums.findIndex((elem) => elem.id == id);
    if (index == -1) throw "Not found";
    this.albums.splice(index, 1);
  }

  edit(id, newObj) {
    let oldObj = this.albums.findIndex((elem) => elem.id == id);
    this.albums[oldObj] = newObj;
    this.albums[oldObj].id = id;
    id--;
  }

  getById(id) {
    return this.albums.find((elem) => elem.id == id);
  }

  streamsPlusOne(id) {
    this.getById(id).streams++;
  }

  getAll() {
    return [...this.albums];
  }

  getMostStreams() {
    let max = this.albums[0];
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i].streams >= max) {
        max = this.albums[i].streams;
      }
    }
    return this.albums.find((elem) => elem.streams == max);
  }
}

class MusicAlbumsWithDOM extends MusicAlbums {
  albumsToHTML(album) {
    return `
          <tr>
          <td>
              ${album.id}
          </td>
          <td>
              ${album.author}
          </td>
          <td>
              ${album.name}
          </td>
          <td> 
              <button onclick="DeleteUser(${album.id})">
                  Delete
              </button>
          </td>
          <td> 
              <button onclick="StartEditUser(${album.id})">
                  Edit
              </button>
          </td>
          </tr>
        `;
  }

  albumsTableToHTML() {
    let rows = "";
    for (let album of this.getAll()) {
      rows += this.albumsToHTML(album);
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
                    Name
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
                <input name="name" placeholder="name"> 
                <input name="cover" placeholder="cover">
                <input name="songs" placeholder="songs">
                <input name="year" placeholder="year">
                <input name="streams" placeholder="streams">
                <button type="button" onclick="AddNewUser()">
                    Save
                </button>
            </form>
        </div>
    `;
  }

  editFormToHTML() {
    return ` 
        <div id="add">
            <form name="addForm" method="post" action="#">
                <h3> Add User </h3>
                <input name="author" placeholder="author">
                <input name="name" placeholder="name"> 
                <input name="cover" placeholder="cover">
                <input name="songs" placeholder="songs">
                <input name="year" placeholder="year">
                <input name="streams" placeholder="streams">
                <button type="button" onclick="EditUser()">
                    Save
                </button>
            </form>
        </div>
    `;
  }
  MostHtml() {
    let most = this.getMostStreams();
    return `
                <p>
                ${most.id}
                </p>
                <p>
                ${most.author}
                </p>
                <p>
                ${most.name}
                </p>
  `;
  }

  toHTML() {
    return (
      this.albumsTableToHTML() +
      this.MostHtml() +
      this.addFormToHTML() +
      this.editFormToHTML()
    );
  }

  addEventListners() {
    document.addEventListener("deleteUser", (event) => {
      super.delete(event.detail.id);
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
  const name = document.getElementsByName("name")[0].value;
  const cover = document.getElementsByName("cover")[0].value;
  const songs = document.getElementsByName("songs")[0].value;
  const year = document.getElementsByName("year")[0].value;
  const streams = document.getElementsByName("streams")[0].value;
  let addUserEvent = new CustomEvent("addUser", {
    detail: {
      name,
      author,
      cover,
      songs,
      year,
      streams,
    },
  });
  document.dispatchEvent(addUserEvent);
}

function ShowAddUser() {
  document.getElementById("add").style.display = "block";
  document.getElementById("edit").style.display = "none";
}

let albums = new MusicAlbumsWithDOM();

let Album1 = new StringifyMusicAlbum(1, 2, 3, 4, 5, 6);
let Album2 = new StringifyMusicAlbum(7, 8, 9, 1, 2, 3);

albums.add(Album1);
albums.add(Album2);

document.getElementById("root").innerHTML = albums.toHTML();
albums.addEventListners();
