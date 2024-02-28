const elList = document.querySelector(".ul__li");
const elTemplete = document.querySelector(".user__template").content;

const elPostList = document.querySelector(".ul__li__post");
const postTempletepage = document.querySelector( ".user--post--template").content;

const elComment = document.querySelector(".ul__li__comment");
const elComentTemplete = document.querySelector(".user--comment--template").content;

let posts = [];
let comments = [];

function randerUsers(arr, node) {

  node.innerHTML = null;

  const usersFragment = document.createDocumentFragment();

  arr.forEach((row) => {
    const userTemplate = elTemplete.cloneNode(true);

    userTemplate.querySelector(".name").textContent = row.name;
    userTemplate.querySelector(".user--email").href = "mailto:" + row.email;

    userTemplate.querySelector(".user--email").textContent = row.email;
    userTemplate.querySelector(".user--adress").textContent =row.address.street;

    userTemplate.querySelector(".user--phone").textContent = row.phone;
    userTemplate.querySelector(".user--website").textContent = row.website;
    userTemplate.querySelector(".company").textContent = row.company.name + "" + row.company.catchPhrase + row.company.bs;
    userTemplate.querySelector(".button-more").dataset.userId = row.id;
    usersFragment.appendChild(userTemplate);
  });

  node.appendChild(usersFragment);
}

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await response.json();
  randerUsers(data, elList);
}
getUsers();

//,dll,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,lllllllllllllllllllllllllllllkksk

function raderUserPost (arr, node) {
    node.innerHTML = null 

    const postFragment = document.createDocumentFragment();
    arr.forEach((post) => {
        const postTemplate = postTempletepage.cloneNode(true);
        postTemplate.querySelector(".post__title").textContent = post.title
        postTemplate.querySelector(".post__body").textContent = post.body;
        postTemplate.querySelector(".commentbtn").dataset.idButtonCom = post.id;
        postFragment.appendChild(postTemplate)
        });
  node.appendChild(postFragment)
}
async function getPosts(userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    const data = await response.json();

    posts = data.filter((post)=> post.userId == userId);
    raderUserPost(posts, elPostList);
}

elList.addEventListener ("click", (evt) => {
    if(evt.target.matches(".button-more")){
        elComment.innerHTML = null;
        const userId = evt.target.dataset.userId;
        getPosts(userId)
    }
});


//ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
function raderComment(arr, node) {
    node.innerHTML = null
    const usersFragment = document.createDocumentFragment()

    arr.forEach((row)=> {
        const commentTemplate = elComentTemplete.cloneNode(true);
    commentTemplate.querySelector(".comment__title").textContent = row.name;
    commentTemplate.querySelector(".commentlink").href = "mailto:" + row.email;
    commentTemplate.querySelector(".commentlink").textContent = row.email;
    commentTemplate.querySelector(".comment-body").textContent = row.body;
    
    usersFragment.appendChild(commentTemplate);
    });
    node.appendChild(usersFragment)
}


async function getComments(postId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments?postId=");
    const data = await response.json();

    raderComment(data, elComment);
}

elPostList.addEventListener("click", (evt)=>{
    const comButton = evt.target.matches(".commentbtn");
    if(comButton){
        const isButton = evt.target.dataset.idButtonCom;

        getComments(isButton)
}});