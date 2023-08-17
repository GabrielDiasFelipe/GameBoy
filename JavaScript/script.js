//Colors
const colorGrid = '#D0F4B8';
const snakeBody = '#88c070';
const snakeHead = '#67AA4B';
const colorFood = '#52A387';

let command 

const canvas = document.getElementsByClassName('canvas');
console.log(canvas); 
const ctx = canvas[0].getContext('2d');
console.log(ctx);

let minScore = 60 
let vel = 250

const score = document.querySelector('.score-value')
const level = document.querySelector('.level-value')

const finalScore = document.querySelector('.final-score > span')
const menu = document.querySelector('.menu-screen')
const buttonPlay = document.querySelector('.btn-play')

const size = 10

let snake = [{ x:120, y:80}]

const incrementScore = (()=>{
    score.innerText = +score.innerText + 10
})

const levelUp = (()=>{
    if(+score.innerText >= minScore ){
        
        level.innerText = + level.innerText + 1

        minScore = minScore + 60
        if(vel >= 90){
            vel = vel - (vel / 5)
        }else if(vel >= 50){vel = vel - 1}
        
        

    }
})

const randowNumber = (min,max) =>{
    return Math.round( Math.random() * (max - min) + min)
 }
 const rPosition = () => {
    const number = randowNumber(0 , 150)
    return  Math.round(number / 10 ) * 10
 }

 const rColor = () => {
    const red = randowNumber(0 ,255)
    const green = randowNumber(0 ,255)
    const blue = randowNumber(0 ,255)
    return `rgb(${red} , ${green} , ${blue})`
 }
const food ={
    x:rPosition(),
    y:rPosition(),
    color: rColor()
}

let direção 
let loopId

const drawFood = () =>{

    const {x ,y , color} = food
    ctx.lineWidth = 10;
    ctx.border

    ctx.shadowColor = '#08182069'
    ctx.shadowBlur = 
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = colorFood
    ctx.fillRect(x ,y ,12 , 10)
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

const drawSnake = () => {
        ctx.fillStyle = snakeBody     
        if(direção == "left"){
            
            ctx.shadowColor = '#08182069'
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 0
        }else{
            ctx.shadowColor = '#08182069'
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0
        }
        snake.forEach((position ,index)=> {
            if(index == snake.length -1){
                ctx.fillStyle = snakeHead
            }
            ctx.fillRect(position.x , position.y , size ,size)  
        })
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0
}

const moveSnake = () => {
    if(!direção) return
    const head = snake[snake.length -1]
    
    if(direção == 'right'){
        snake.push({x:head.x + size , y: head.y})
    }
    if(direção == 'left'){
        snake.push({x:head.x - size , y: head.y})
    }
    if(direção == 'up'){
        snake.push({x:head.x , y: head.y - size })
    }
    if(direção == 'down'){
        snake.push({x:head.x , y: head.y + size})
    }
    snake.shift()
}
const drawGrid =  () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = colorGrid
    
    for (let i = 10; i < 240 ; i += 10){
        ctx.beginPath()
        ctx.lineTo(i,0)
        ctx.lineTo(i,160)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0,i)
        ctx.lineTo(240,i)
        ctx.stroke()
    }
       
}
const checkEat =() => {
    const head = snake[snake.length -1]

    if (head.x == food.x && head.y == food.y){
        snake.push(head)
        incrementScore()

        let x = rPosition()
        let y = rPosition()

        while(snake.find((position) => position.x ==x && position.y == y)){
             x = rPosition()
             y = rPosition()
        }
        
        food.x= x,
        food.y= y,
        food.color= rColor()
    }
}

const checkCollision = () => {
    const head = snake[snake.length-1]
    const canvasLimit = 230
    const neckIndex = snake.length -2
    const wallCollision =  head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > 150

    const selfCollision = snake.find((position , index) => {return index < neckIndex && position.x ==head.x && position.y == head.y})


    if(wallCollision ||selfCollision){
        gameOver()
    }
    
    
}
const gameOver = (() =>{
    direção = undefined
    menu.style.display = "flex"

    finalScore.innerText = score.innerText
    document.querySelector('.screenBlack').style.display='block'
   
})
const gameLoop= (() => {
    clearInterval(loopId)
    ctx.clearRect(0,0 , 240 ,160)
    moveSnake()

    drawGrid()
    drawFood()
    drawSnake()
    levelUp()
    checkEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, vel);
})

gameLoop()

document.addEventListener('keydown', ({key})=>{
    commandClick(key)
})
 function Reiniciar(){
        score.innerText = "00"
        level.innerText = "00"
        minScore = 60
        vel = 250
        menu.style.display = 'none'
        snake = [{ x:120, y:80}]
        document.querySelector('.screenBlack').style.display='none'
    

        let x = rPosition()
        let y = rPosition()

        food.x= x,
        food.y= y,
        food.color = colorFood   
}

document.addEventListener('keydown', ({key})=>{
    if(menu.style.display == "flex"){
    if(key == "Enter" ){
        Reiniciar()
    }}    
})
document.getElementsByClassName('left')[0].addEventListener('click',({key}) =>{
    command = "ArrowLeft"
    commandClick(command)
})
document.getElementsByClassName('right')[0].addEventListener('click',({key}) =>{
    command = "ArrowRight"
    commandClick(command)
})
document.getElementsByClassName('up')[0].addEventListener('click',({key}) =>{
    command = "ArrowUp"
    commandClick(command)
})
document.getElementsByClassName('down')[0].addEventListener('click',({key}) =>{
    command = "ArrowDown"
    commandClick(command)
})

function commandClick(key){
    if(menu.style.display !== "flex"){
        if(key == "ArrowRight" && direção != 'left'){
         direção = "right"
        }else if(key == "ArrowLeft"  && direção != 'right'){
         direção = "left"
        } else if(key == "ArrowUp"  && direção != 'down'){
         direção = "up"
        } else if(key == "ArrowDown"  && direção != 'up'){
         direção = "down"
        }
    }
}