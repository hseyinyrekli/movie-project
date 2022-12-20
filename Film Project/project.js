const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
//UI OBJESİNİ BAŞLATMA
const ui = new UI();
//Storage Objesi Üret
const storage = new Storage();
//Tüm eventleri yükleme

eventListeners();
function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
  });
  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click",clearAllFilms)
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    // Hata
    ui.displayMessages("Tüm Alanları Doldurun...", "danger");
  } else {
    // YeNİ Film
    const newFilm = new Film(title, director, url);

    ui.addFilmToUI(newFilm); // Arayüze Film Ekleme
    storage.addFilmToStorage(newFilm); //storage film ekleme

    ui.displayMessages("Film Başarıyla Eklendi...", "success");
  }
  ui.clearInputs(titleElement, directorElement, urlElement);

  e.preventDefault();
}
function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    ui.deleteFilmFromUI(e.target);
    storage.deleteFilmFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    );
    ui.displayMessages("Silme İşlemi Başarılı...", "success");
  }
}
function clearAllFilms(){
  if(confirm("Emin Misiniz ?")){
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
  }
  
}