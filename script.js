const D = document;

const memoryItem = D.querySelectorAll('.memory-item')
const memoryGame = D.querySelector('.memory-game')
const memoryBtn = D.querySelector('.memory-btn')
const memoryTest = D.querySelector('.memory-show')
const memoryTestD = D.querySelector('.memory-del')
const memoryTimer = D.querySelector('.memory__timer')



if(window.localStorage.getItem('result') == null) {
    window.localStorage.setItem('result', JSON.stringify([]))
} 
let saveR = JSON.parse(window.localStorage.getItem('result'))
let memoryResult = D.querySelector('.memory-result')

function paintScore() {
    let template = ''
    saveR.forEach((e, i) => {
        template = template + `<li>${i + 1}-ую игру та завершил за ${e} ходов</li>`
    })
    memoryResult.innerHTML = template
}
paintScore()

function localStor(result) {
    if(saveR.length == 10) {
        saveR.pop()
        saveR.unshift(result)
    } else {
        saveR.push(result)
    }
    window.localStorage.setItem('result', JSON.stringify(saveR))
}


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

let ad = ["😀","🥰","😍","😘","😜","😋","🧐","😎","🤩","🥳"]
// let number = [1,2,3,4,5,6,7,8,9,10]
// let burger = ["🍕","🍔","🍟","🌭","🍿","🧂","🥐","🥪","🌮","🧀"]



let shufflArr = [...ad, ...ad]
let timer = 6;

memoryTest.addEventListener('click', () => {
    memoryItem.forEach((e) => {
        e.classList.add('memory-item--show-test')
    })
})
memoryTestD.addEventListener('click', () => {
    memoryItem.forEach((e) => {
        e.classList.remove('memory-item--show-test')
    })
})
memoryBtn.addEventListener('click', () => {
    startPlay()
    setTimeout(() => {
        hideAll()
    },6000)
})

function startPlay() {
    let equ = 0;
    let winResult = 0;
    let step = 0;
    shuffle(shufflArr)
    startTimer()
    blockClick(6000)
    memoryItem.forEach((e) => {
        e.classList.add('memory-item--show')
        e.classList.remove('clicked')
    })



    memoryItem.forEach((item, index) => {
        item.dataset.match = shufflArr[index]
        item.innerHTML = shufflArr[index]
            item.addEventListener('click', (e) => {
                if(e.target.dataset.match != undefined) {
                    step++
                    if(equ == 0) {
                    equ = getNumber(e)
                    e.target.classList.add('clicked')
                    show(e.target, false)
                    } else {
                        if(equ == e.target.dataset.match && e.target.classList[1] != 'clicked') {
                            blockClick(1000);
                            equ = 0;
                            showResult(e.target)
                            removeDataset(e.target)
                            winResult++
                            if(winResult == 10) {
                                memoryTimer.innerHTML = `Поздравляю! Ты победил за - ${counterPoints(step)} ходов!`
                                localStor(counterPoints(step));
                                paintScore()
                            }
                        } else {
                            blockClick(1000);
                            equ = 0;
                            show(e.target, true)
                        }
                    }
                }
            })
    })
}
function counterPoints(step) {
    // if(step > 120) return 0
    // else return 120 - step;
    return step
}

function startTimer() {
    memoryTimer.visibility = 'hidden'
    let interval = setInterval(() => {
        timer--
        memoryTimer.innerHTML = timer
        
        if(timer == 0) {
            memoryTimer.innerHTML = "Найди все карточки!"
            clearTimeout(interval)
            timer = 6
        }
    },1000)
}

function hideAll() {
    memoryItem.forEach((e) => {
        e.classList.remove('memory-item--show')
    })
}

function getNumber(e) {
    let clickNumber = e.target.dataset.match;
    return clickNumber 
}
function removeDataset(e) {
    memoryItem.forEach((elem) => {
        if(elem.dataset.match == e.dataset.match) {
            delete elem.dataset.match
        }
    })
  
}
function showResult(e) {
    memoryItem.forEach((elem) => {
        for(let i = 0; i < 2; i++) {
            if(elem.dataset.match == e.dataset.match) {
                elem.classList.add('memory-item--show')
            }
        }
    })
}
function show(elem, anw) {
    elem.classList.add('clicked')
    if(anw == true) {
        setTimeout(() => {
            memoryItem.forEach((elem) => {
                elem.classList.remove('clicked')
            })
        },1000)
    }
}
function removeShow(e) {
    memoryItem.forEach((elem) => {
        for(let i = 0; i < 2; i++) {
            if(elem.dataset.match == e.dataset.match) {
                elem.classList.remove('memory-item--show')
            } 
        }
    })
}
function blockClick(time) {
    memoryGame.classList.add('blockedClick')
    setTimeout(() => {
        memoryGame.classList.remove('blockedClick')
    },time)
}

