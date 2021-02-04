let data =[];

let newsFeed = document.getElementById('newsfeed');
    form = document.getElementById('form'),
    tweet = document.getElementById('tweet'),
    userName = document.getElementById('userName'),

function likein(){
    // this.classList.add('active-like');
    console.log('link')

}

function createOnTweet(obj){
    const {userName,tweet,date,userImg} =obj;
    let userCarach = userName.split('')[0];
    createAndAddElement({element:'div',innerElement:[
        createAndAddElement({element:'div',innerElement:(userImg !=="")?userCarach:[createAndAddElement({element:'img',innerElement:'',attribute:{src:''}})],attribute:{classname:"user-img"}}),
        createAndAddElement({element:'h3',innerElement:userName,attribute:{classname:"user-name"}}),
        createAndAddElement({element:'p',innerElement:date,attribute:{classname:"date-of-tweet"}}),
        createAndAddElement({element:'p',innerElement:tweet,attribute:{classname:"tweet"}}),
        createAndAddElement({element:'button',innerElement:'like',attribute:{classname:"like-button",onCLick:'likein'}}),
        createAndAddElement({element:'button',innerElement:'retweet',attribute:{classname:"retweet-button",onCLick:""}})
    ],attribute:{}},newsFeed);
}
function createTweets(arr){
    arr.forEach(tweet=>{
        createOnTweet(tweet)
    })
}
form.addEventListener('submit',function(e){
    e.preventDefault();
    let date = new Date();

    let tweetData ={
        userName:userName.value,
        tweet:tweet.value,
        date
    }
    data.push(tweetData);
    createTweets(data);
})

