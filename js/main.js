
// this tow line is store data in localstorge.
let data =(localStorage.getItem('tweets'))?JSON.parse(localStorage.getItem('tweets')):[];
let count =(localStorage.getItem('tweets'))?Number(localStorage.getItem('count')):1;

// this few line is get element .
let newsFeed = document.getElementById('newsfeed');
    form = document.getElementById('form'),
    tweet = document.getElementById('tweet'),
    loginContiner = document.getElementById('loginContiner'),
    main = document.getElementById('main'),
    userName = document.getElementById('userName'),
    userNameLogin = ""; // login user store.

// this is toggle button btween login and main page.
document.getElementById("login").addEventListener('click',()=>{
    if(userName.value !==""){
        loginContiner.style.display="none";
        main.style.display = "flex";
        userNameLogin = userName.value;
    }

})

// this is event function to like button. 
function likein(){
    let parantId = this.parentElement.parentElement.id;
    let findTweeData = data.find(x => x.id ===parantId);

    if(findTweeData &&findTweeData.likeUser.indexOf(userNameLogin) ===-1){
        findTweeData.likeUser.push(userNameLogin);
    }else if(findTweeData &&findTweeData.likeUser.indexOf(userNameLogin) !==-1){
        findTweeData.likeUser.splice(findTweeData.likeUser.findIndex(x => x===userNameLogin),1)
    }
    
    
    
    localStorage.setItem('tweets',JSON.stringify(data))
    createTweets(data);
}
// this is event function to reTweet button. 
function reTweet(){
   
    let parant = this.parentElement.parentElement;
    data.find(x => x.id ===parant.id && x.reTweetUser.indexOf(userNameLogin) ===-1)?data.find(x => x.id ===parant.id).reTweetUser.push(userNameLogin):null;

    createAndAddTweet(parant.innerHTML);
    localStorage.setItem('tweets',JSON.stringify(data))
    createTweets(data);

    
}
// this function wark  create and add Tweet.
function createAndAddTweet(tweet){
    if(tweet){
        let date = new Date();
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dateForm = `${days[date.getDay()]} , ${date.getFullYear()}-${date.getMonth()} -${date.getDate()} , ${(date.getHours()>12)?date.getHours()-12:date.getHours()}:${date.getMinutes()} ${(date.getHours()>12)? "PM":"AM"}`

        let tweetData ={
            id:`${count}`,
            userName:userNameLogin,
            tweet:tweet,
            date:dateForm,
            likeUser:[],
            reTweetUser:[]
        }
        count++;
        localStorage.setItem('count',count)

        data.unshift(tweetData);
        localStorage.setItem('tweets',JSON.stringify(data))
    }
}

function createOnTweet(obj,continer){
    const {id,userName,tweet,date,reTweetUser,likeUser} =obj;
    let userContiner = document.createElement('div');
    userContiner.className = 'user-continer';

    let userImg = document.createElement('div');
    userImg.className ="user-img";
    userImg.innerText = userName.split('')[0];
    
    let userNameContiner = document.createElement('h2');
    userNameContiner.className = "user-name-continer";
    userNameContiner.innerText = userName;

    let tweetDate = document.createElement('p')
    tweetDate.className = 'tweet-date';
    tweetDate.innerText = date;

    userContiner.append(userImg,userNameContiner,tweetDate)

    let tweetDiv = document.createElement('div');
    tweetDiv.className = 'tweet';
    tweetDiv.innerHTML =tweet ;

    let buttonContiner = document.createElement('div');
    buttonContiner.className = 'button-continer';

    let likeBut = document.createElement('i');
    likeBut.className = "far fa-heart";
    (likeUser.indexOf(userNameLogin) !==-1)? likeBut.classList.add('active-like'):null
    likeBut.innerText = `  ${likeUser.length}`;
    likeBut.onclick =likein;

    let reTweetBut = document.createElement('i');
    reTweetBut.className = "fal fa-reply-all";
    
    reTweetBut.innerText = ` ${reTweetUser.length}`;
    reTweetBut.onclick =reTweet;

    buttonContiner.append(likeBut,reTweetBut);

    let tweetContiner = document.createElement('div');
    tweetContiner.className = 'tweet-continer';
    tweetContiner.id =id;
    tweetContiner.append(userContiner,tweetDiv,buttonContiner);

    continer.append(tweetContiner)
    
    
}
function createTweets(arr){
    newsFeed.innerHTML ="";
    arr.forEach(tweet=>{
        createOnTweet(tweet,newsFeed)
    });
}
createTweets(data);

form.addEventListener('submit',function(e){
    e.preventDefault();
    createAndAddTweet(tweet.value);
    createTweets(data);
});

