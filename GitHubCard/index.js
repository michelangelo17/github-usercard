//get main container element
const cards = document.querySelector('.cards');
//user variable changed  on click event
let user = '';
//create mini form elements
const getUserDiv = document.createElement('div');
const input = document.createElement('input');
const submit = document.createElement('button');
const reset = document.createElement('button');
//add class to form div
getUserDiv.classList.add('getUserDiv');
//apply attributes to input
input.type = 'text';
input.name = 'Username';
input.placeholder = 'Enter a github username!';
//apply attributes to submit
submit.type = 'submit';
submit.textContent = 'Submit';
//apply attributes to reset
reset.type = 'reset';
reset.textContent = 'Reset';
//add elements to the main form div
getUserDiv.appendChild(input);
getUserDiv.appendChild(submit);
getUserDiv.appendChild(reset);
//add form to the document
cards.appendChild(getUserDiv);
// on click sets user value and adds that value to a get request to get the user profile information, if request successful, feeds data object to cardMaker and produces a card, then does another get request to get the user's following list. If that is successful will map each element to grab their profile URL's and then for each url append a card after feeding the cardMaker the data object for that profile. 
submit.addEventListener('click', () => {
  user = input.value;
  axios.get(`https://api.github.com/users/${user}`)
  .then(res => {
    cards.appendChild(cardMaker(res.data));
    axios.get(`https://api.github.com/users/${user}/following`)
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
    console.log(err);
  });
});
reset.addEventListener('click', () => location.reload());

//creates the html for a card and sets the values and content based on the profile object it recieves. 
function cardMaker(obj) {
  //element creator tool
  const create = el => document.createElement(el),
    card = create('div'),
    usrImg = create('img'),
    cardInfo = create('div'),
    name = create('h3'),
    username = create('p'),
    location = create('p'),
    profile = create('p'),
    profileLink = create('a'),
    followers = create('p'),
    following = create('p'),
    bio = create('p');
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
  obj.name === null ? text(name, `A Very Real Name`) : text(name, obj.name);
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
};