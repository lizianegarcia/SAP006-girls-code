import { changePage } from '../../routes/changePage.js';

const createPage = () => {
  const rootElement = document.createElement('div');
  const contentnewElement = `
  <section class="not-found-container">
      <div class="not-found-page">
        <img src="../../img/code-girls.svg" alt="" class="logo">
        <img class="img-error-404" src="../../img/404 PAGE NOT FOUND.svg" alt="">
        <h1 class="not-found-title">Ops! Página não encontrada</h1>
        <p class="not-found-text">Desculpe, não encontramos a página que você buscou! Clique <a class="not-found-link-home" id="go-back">AQUI</a> para retornar.</p>
        <button class="back-to"></button>
      GI</div>
  </section>
  `;
  // registerListener
  rootElement.innerHTML = contentnewElement;

  const goBackLink = rootElement.querySelector('#go-back');
  goBackLink.addEventListener('click', () => {
    changePage('/');
  });

  return rootElement;
};

export default createPage;
