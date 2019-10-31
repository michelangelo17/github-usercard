/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const cards = document.querySelector('.cards');
const me = axios.get('https://api.github.com/users/michelangelo17')
  .then(res => {
    cards.appendChild(cardMaker(res.data));
    axios.get('https://api.github.com/users/michelangelo17/following')
    .then(res => {
      const urls = res.data.map(person => person.url);
      urls.forEach(url => {
        axios.get(url)
        .then(res => {
          cards.appendChild(cardMaker(res.data));
        })
      })
    })
  })
  .catch(err => {
    console.log(`${err} FAILED!`);
  });
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/
// tetondan
//   dustinmyers
//   justsml
//   luishrd
//   bigknell
/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [];

function cardMaker(obj) {
  //element creator tool
  const create = el => document.createElement(el);
  const card = create('div');
  const usrImg = create('img');
  const cardInfo = create('div');
  const name = create('h3');
  const username = create('p');
  const location = create('p');
  const profile = create('p');
  const profileLink = create('a');
  const followers = create('p');
  const following = create('p');
  const bio = create('p');
  //class adding tool
  const addClass = (el, aClass) => el.classList.add(aClass);
  addClass(card, 'card');
  addClass(cardInfo, 'card-info');
  addClass(name, 'name');
  addClass(username, 'username');
  //add image
  usrImg.src = obj.avatar_url;
  //add profile link
  profileLink.href = obj.html_url;
  //textContent tool
  const text = (el, textToAdd) => el.textContent = textToAdd;
  text(name, obj.name);
  text(username, obj.login);
  obj.location === null ? text(location, `Location: Top Secret`) : text(location, `Location: ${obj.location}`);
  text(profile, `Profile: `);
  text(profileLink, `${obj.html_url}`);
  text(followers, `Followers: ${obj.followers}`);
  text(following, `Following: ${obj.following}`);
  obj.bio === null ? text(bio, `This user has no bio!`) : text(bio, `Bio: ${obj.bio}`);
  //appendChild tool
  const append = (el, parentEl) => parentEl.appendChild(el);
  append(usrImg, card);
  append(cardInfo, card);
  append(name, cardInfo);
  append(username, cardInfo);
  append(location, cardInfo);
  append(profile, cardInfo);
  append(followers, cardInfo);
  append(following, cardInfo);
  append(bio, cardInfo);
  append(profileLink, profile);
  return card;
}

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
