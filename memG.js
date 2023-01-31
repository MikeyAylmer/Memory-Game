
const win = document.querySelector('.win');
const tiles = document.querySelectorAll('.card');
const colors = ['navy','pink','red', 'darkcyan', 'dodgerblue', 'indigo', 'limegreen', 'olive', 'goldenrod', 'salmon'];


let clickedCard = null;
let preventClick = false;
let combos = 0;

// function to shuffle colors randomly
const cards = [...document.querySelectorAll('.card')];
for(let color of colors){
    const cardAIndex = parseInt(Math.random() * cards.length);
    const cardA = cards[cardAIndex];
    cards.splice(cardAIndex, 1);
    cardA.className += ` ${color}`;
    cardA.setAttribute('data-color', color);
    
    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = cards[cardBIndex];
    cards.splice(cardBIndex, 1);
    cardB.className += ` ${color}`;
    cardB.setAttribute('data-color', color);
}
// function to start the clock and game
const start = document.querySelector('button');
const timer = document.querySelector('.timer');
const moves = document.querySelector('.moves');
// 
const state = {
    totalTime: 0,
    loop: null

}
// function to start timer with button
start.addEventListener('click', function(e){
    console.log('start')
    state.loop = setInterval(() => {
        state.totalTime++

        
        timer.innerText = `time: ${state.totalTime} sec`
    }, 1000)
})
// function to match colors
tiles.forEach(card => card.addEventListener('click', function(e){
    const target = e.currentTarget;

    if(
        preventClick || 
        target === clickedCard || 
        target.className.includes('done')) 
        {
        return;
    }

   
    target.className = target.className.replace('color-hidden', '').trim();
    target.className += ' done';

    // if we havent clicked a card keep it hidden.
    if(!clickedCard){
        // if we havent clicked card, keep track of the card, display it's color
             clickedCard = target;
        } else if (clickedCard){
            
        // if we've already clicked a card, check to see if the new card matches the previous card.
            if(clickedCard.getAttribute('data-color') !== target.getAttribute('data-color')){
                preventClick = true;
                    setTimeout(() => {
                    clickedCard.className =
                    clickedCard.className.replace('done', '').trim() + " color-hidden";
                    target.className =
                    target.className.replace('done', '').trim() + " color-hidden";
                    clickedCard = null;
                    preventClick = false;
                }, 500);
            } else {
                combos++;
                clickedCard = null;
                if(combos === 10){
                    setTimeout(() => {
                
                        win.innerHTML = `
                            <span class="win-text">
                                You won!<br />
                                with <span class="highlight">${combos}</span> moves<br />
                                under <span class="highlight">${state.totalTime}</span> seconds
                            </span>
                        `
            
                        clearInterval(state.loop)
                    }, 1000)
                }
            }
        }
})
)

    
