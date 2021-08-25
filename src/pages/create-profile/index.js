/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */

const createPage = () => {
  const photoURL = firebase.auth().currentUser.photoURL;
  const rootElement = document.createElement('div');
  const contentnewElement = `
  <header>
              <nav class="feed-navbar">
                  <img class="feed-logo" src="./img/Amitié2.png" alt="">
                  <div class="hamburger" id="hamburger">
                      <div class="hamburger-line"></div>
                      <div class="hamburger-line"></div>
                      <div class="hamburger-line"></div>
                  </div>

                  <ul class="navbar-links" id="navbar-links">
                      <li class="li-items" id="navigate-profile"><a href="#">Perfil</a></li>
                      <li class="li-items" id="navigate-feed"><a href="#">Feed</a></li>
                      <li class="li-items feed-logout"></li>
                  </ul>
              </nav>
          </header>
  <section class='profile-area'>
    <div class='profile-area-theme'>
    <img class='theme-image' src="../../img/profile/coder.png">
    </div>
    <figure class='profile-area-photo-box'>
      <div class="image-upload">
        <label for="file-input">
          <img src='${photoURL}' id='user-photo' class='user-photo'/>
        </label>
        <input id="file-input" type="file" />
      </div>
    </figure>
    <div class='name-profile-area'>
      <p id='name-user'></p>
    </div>
  </section>  
  <section class='profile-area-interests'>
  
  </section>
    <button id="botao-check" type="button" class="btn">Salvar </button>
    <div class="resultadoCheckbox"> </div>
  `;
  // registerListener
  rootElement.innerHTML = contentnewElement;

  const hamburger = rootElement.querySelector('#hamburger');
  const navLinks = rootElement.querySelector('.navbar-links');
  const links = rootElement.querySelectorAll('.navbar-links li');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    links.forEach((link) => {
      link.classList.toggle('fade');
    });
  });

  const inputImg = rootElement.querySelector('#file-input');
  const userPhoto = rootElement.querySelector('#user-photo');
  const userName = rootElement.querySelector('#name-user');

  
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      userPhoto.src = user.photoURL
        || 'https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868-1024x909.jpg';
      userName.innerHTML = user.displayName;
    }
  });

  const sendImg = () => {
    const ref = firebase.storage().ref('User-images');
    inputImg.onchange = (event) => {
      const photo = event.target.files[0];
      const reader = new FileReader();
      const uid = firebase.database().ref().push().key;

      reader.readAsDataURL(photo);
      reader.onload = function () {
        const base64 = reader.result.split('base64,')[1];

        ref
          .child(uid)
          .putString(base64, 'base64', { contentType: 'image/png' })
          .then((snapshot) => {
            console.log('snapshot', snapshot);
            ref
              .child(uid)
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                userPhoto.src = url;
                firebase.auth().currentUser.updateProfile({
                  photoURL: url,
                });
              });
          });
      };
    };
  };

  sendImg();

  return rootElement;
};

export default createPage;
