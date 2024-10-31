disableDeck = true;
document.querySelector(".popUpFirst").style.display = "block";
document.querySelector("#close").addEventListener("click",function () {
    document.querySelector(".popUpFirst").style.display = "none";
    disableDeck = false;
    startTimer();
});

function startTimer() {
    document.querySelector(".clock").innerHTML = '00:00';
    var sec = 1;
    var min=0;
    timer = setInterval(()=>{
        
        if (sec<=9){
            if(min <= 9){
                document.querySelector(".clock").innerHTML = '0'+min+':0'+sec;
            }
            else {
                document.querySelector(".clock").innerHTML = min+':0'+sec;
            }

        }
        else if(sec >= 10){
            document.querySelector(".clock").innerHTML = '00:'+sec;
            if(sec >= 60){
                min++;
                sec=0;
                if(min <= 9){
                    document.querySelector(".clock").innerHTML = '0'+min+':0'+sec%60;
                }
                else {
                    document.querySelector(".clock").innerHTML = min+':'+sec%60;
                }
            }
        }
        sec++;
    },1000);
};

const cards = document.querySelectorAll(".card");

var matchedCard = 0;
var cardOne, cardTwo;
var disableDeck = false;
var flips = 0;
 
function flipCard(e) {
    var clickedCard = e.target; //getting li
    if(clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        var cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg,cardTwoImg);

    }
}

function matchCards(img1,img2){
    if(img1 === img2) { //if two cards img matched
        matchedCard++;
        if (matchedCard == 8) { //winning game pop up appears
            setTimeout(() => {
                document.querySelector("span").innerHTML = `${flips}`;
                document.querySelector(".popUp").style.display = "block";
                var audio = new Audio("sounds/success.mp3");
                audio.play();
                pauseTimer();
                document.querySelector("#restart").addEventListener("click",function () {
                    document.querySelector(".popUp").style.display = "none";
                    startTimer();
                    return shuffleDeck();
                })
            }, 1000); //shuffle after 1sec
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        flips++;
        updateFlips(flips);
        var audio = new Audio("sounds/correct.mp3");
        audio.play();
        return disableDeck = false;
    }
    
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
        flips++;
        updateFlips(flips);
    }, 1200);
    
}

function shuffleDeck() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    var arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
    flips=0;
    updateFlips(flips);
}

shuffleDeck();

cards.forEach(card => {

    card.addEventListener("click", flipCard)
});

//ok the cards are f.ed up

function updateFlips(flips) {
    document.querySelector("#flips").innerHTML = `Moves: ${flips}`;
}

function pauseTimer() {
    clearInterval(timer);
}
