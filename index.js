//Declare the variables for html pages
let home = '';
let about = '';
let contact = '';

/**
 *
 * @param {String} page - Represents the page information that needs to be retrieved
 * @returns {String} resHtml - The Page's HTML is returned from the async invocation
 */

const loadPage = async (page) => {
  const response = await fetch(page);
  const resHtml = await response.text();
  return resHtml;
};

/**
 * The Async function loads all HTML to the variables
 */
const loadAllPages = async () => {
  home = await loadPage('pages/home.html');
  about = await loadPage('pages/about.html');
  tracks = await loadPage('pages/tracks.html');
  packs = await loadPage('pages/packs.html');
};

//Get the Element with the Id 'root'
const rootDiv = document.getElementById('root');

/**
 * The Main Function is an async function that first loads All Page HTML to the variables
 * Once the variables are loaded with the contents, then they are assigned to the 'routes' variable
 */
const main = async () => {
  await loadAllPages();
  rootDiv.innerHTML = home;
  routes = {
    '/': home,
    '/tracks': tracks,
    '/about': about,
    '/packs': packs,
  };
};

// Invoke the Main function
main();

/**
 *
 * @param {String} pathname - Pass the 'pathname' passed from onClick function of the link (index.html)
 * The function is invoked when any link is clicked in the HTML.
 * The onClick event on the HTML invokes the onNavClick & passes the pathname as param
 */
 const onNavClick = (pathname) => {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    rootDiv.innerHTML = routes[pathname];
  };

  /**
 * The Function is invoked when the window.history changes
 */
window.onpopstate = () => {  
    rootDiv.innerHTML = routes[window.location.pathname];
  };
