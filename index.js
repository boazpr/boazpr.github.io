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
  youtube = await loadPage('pages/youtube.html');
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
    '/youtube': youtube,
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
    $(".sub").slideUp(500);
  };

  /**
 * The Function is invoked when the window.history changes
 */
window.onpopstate = () => {  
    rootDiv.innerHTML = routes[window.location.pathname];
  };

$("#pack").on("click", function(){
  $(".sub_pack").slideToggle();
});

$("#share").on("click", function(){
  $(".sub_share").slideToggle();
});

$("#menu").on("click", function(){
  $("#open").toggle()
  $("#close").toggle()
})

window.onbeforeunload = function() { 
  window.setTimeout(function () { 
      window.location = 'index.html';
  }, 0); 
  window.onbeforeunload = null;
}






// :"https://drive.google.com/file/d/10HDnDY1QyvZ-R9a-vbx6ah503jWMonSF/view?usp=sharing",
// https://drive.google.com/uc?id=1jEMqvhI6_Y7xvRkrKfy_jBgxGzagpBUH