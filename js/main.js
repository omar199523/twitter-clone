let data =[];

let newsFeed = document.getElementById('newsfeed');
    form = document.getElementById('form'),
    tweet = document.getElementById('tweet'),
    loginContiner = document.getElementById('loginContiner'),
    main = document.getElementById('main'),
    userName = document.getElementById('userName'),
    userNameLogin = "";


document.getElementById("login").addEventListener('click',()=>{
    if(userName.value !==""){
        loginContiner.style.display="none";
        main.style.display = "flex";
        userNameLogin = userName.value;
    }

})
function likein(){
    this.classList.toggle('active-like');
    console.log('like')
    let parantId = this.parentElement.parentElement.id;
    console.log(parantId)

}
function reTweet(){
    console.log('reTweet');
    this.classList.toggle('active-like');
}

function createOnTweet(obj,continer){
    const {id,userName,tweet,date} =obj;
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
    tweetDiv.innerText = tweet;

    let buttonContiner = document.createElement('div');
    buttonContiner.className = 'button-continer';

    let likeBut = document.createElement('button');
    likeBut.className = 'like-but';
    likeBut.innerText = 'like';
    likeBut.onclick =likein;

    let reTweetBut = document.createElement('button');
    reTweetBut.className = 'retweet-but';
    reTweetBut.innerText = 'retweet';
    reTweetBut.onclick =reTweet;

    buttonContiner.append(likeBut,reTweetBut);

    let tweetContiner = document.createElement('div');
    tweetContiner.className = 'tweet-continer';
    tweetContiner.id =id;
    tweetContiner.append(userContiner,tweetDiv,buttonContiner);

    continer.append(tweetContiner)
    
    
}
function createTweets(arr){
    arr.forEach(tweet=>{
        createOnTweet(tweet,newsFeed)
    })
}
form.addEventListener('submit',function(e){
    e.preventDefault();
    
    if(tweet.value !==""){
        let date = new Date();
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dateForm = `${days[date.getDay()]} , ${date.getFullYear()}-${date.getMonth()} -${date.getDate()} , ${(date.getHours()>12)?date.getHours()-12:date.getHours()}:${date.getMinutes()} ${(date.getHours()>12)? "PM":"AM"}`

        let count =1;
        
        let tweetData ={
            id:count,
            userName:userNameLogin,
            tweet:tweet.value,
            date:dateForm,
            likeUser:[],
            reTweetUser:[]
        }
        data.push(tweetData);
        newsFeed.innerHTML ="";
        createTweets(data);
        tweet.value ="";
   
    }
    
})

