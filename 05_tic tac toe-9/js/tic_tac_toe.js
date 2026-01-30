"use strict";
//flag がpen-flagの時 penguinsのターン、 bear-flagのときbearのターン
let flag= "pen-flag";
//ターン数カウンター
let counter =9;
//class ="square"を取得
const squares = document.getElementsByClassName("squares");
//array 変化
const squaresArray=Array.from(squares);
//squares の要素を取得
const a_1=document.getElementById("a_1");
const a_2=document.getElementById("a_2");
const a_3=document.getElementById("a_3");
const b_1=document.getElementById("b_1");
const b_2=document.getElementById("b_2");
const b_3=document.getElementById("b_3");
const c_1=document.getElementById("c_1");
const c_2=document.getElementById("c_2");
const c_3=document.getElementById("c_3");
//class="level"を取得//
const levels= document.querySelectorAll(".level");
//levelの要素を取得　レベル設定エリア//
const level_1= document.getElementById("level_1");
const level_2= document.getElementById("level_2");
const level_3= document.getElementById("level_3");
//newgame buttanしゅとく
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn= document.getElementById("btn90");
//win or lose judment line
const line1=JudgLine(squaresArray,["a_1","a_2","a_3"]);
const line2=JudgLine(squaresArray,["b_1","b_2","b_3"]);
const line3=JudgLine(squaresArray,["c_1","c_2","c_3"]);
const line4=JudgLine(squaresArray,["a_1","b_1","c_1"]);
const line5=JudgLine(squaresArray,["a_2","b_2","c_2"]);
const line6=JudgLine(squaresArray,["a_3","b_3","c_3"]);
const line7=JudgLine(squaresArray,["a_1","b_2","c_3"]);
const line8=JudgLine(squaresArray,["a_3","b_2","c_1"]);
const lineArray =[line1,line2,line3,line4,line5,line6,line7,line8];
const lineRandom= cornerLine(squaresArray,["a_1","a_3","c_1","c_3"]);
let winningLine = null;
//メッセージ
const msgtxt1='<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!(your turn)</p>';
const msgtxt2='<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">Whitebear Attack!(computer turn)</p>';
const msgtxt3='<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4='<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5='<p class="image"><img src="img/penguins.jpg" width=61px height=61px><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>';
//sound
let gameSound=["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];

//ページ本体が読込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
function(){
    //message(the fist penguins from)
    setMessage("pen-turn");
    //square がクリック可能かを判断するクラスを追加
    squaresArray.forEach(function(square){
        square.classList.add("js-clickable");
    });
    LevelSetting(0);
},false
);
//*********/
//レベル設定
let index;
levels.forEach((level)=> {
    level.addEventListener("click",() => {
        index=[].slice.call(levels).indexOf(level);
        LevelSetting(index);
    });
});
function LevelSetting(index){
    //level button style clear
    level_1.classList.remove("level-selected");
    level_2.classList.remove("level-selected");
    level_3.classList.remove("level-selected");
    level_1.classList.remove("level-non-selected");
    level_2.classList.remove("level-non-selected");
    level_3.classList.remove("level-non-selected");
    //セッションストレージにkey="tic_tac_toe_accessがある場合は初回ではない
    if(sessionStorage.getItem("tic_tac_toe_access")){
        switch(index){
            case 0:
                sessionStorage.setItem("tic_tac_toe_access","1");
                level_1.classList.add("level-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
                break;
            case 1:
                sessionStorage.setItem("tic_tac_toe_access","2");
                level_1.classList.add("level-non-selected");
                level_2.classList.add("level-selected");
                level_3.classList.add("level-non-selected");
                break;
             case 2:
                    sessionStorage.setItem("tic_tac_toe_access","3");
                    level_1.classList.add("level-non-selected");
                    level_2.classList.add("level-non-selected");
                    level_3.classList.add("level-selected");
                    break; 
             default:
                        level_1.classList.add("level-selected");
                        level_2.classList.add("level-non-selected");
                        level_3.classList.add("level-non-selected");
                        break;                            
        }
    }else{
                sessionStorage.setItem("tic_tac_toe_access","1");
                level_1.classList.add("level-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
    }
}
// win or lose judgment line arraytion
//javascript でfilter を使う方法:https:/techacademy.jp/magazine/15575
function JudgLine(targetArray,idArray){
    return targetArray.filter(function(e){
        return (e.id=== idArray[0] || e.id=== idArray[1] || e.id === idArray[2]);
    });
}
//corner line 配列
function cornerLine(targetArray,idArray){
    return targetArray.filter(function(e){
        return(e.id===idArray[0] || e.id === idArray[1] || e.id === idArray[2] || e.id===[3]);
    });
}
//square をクリックしたときインベント発火
//クリックしたsquareにpenguinsかbear表示
squaresArray.forEach(function(square){
    square.addEventListener('click',()=> {
        if (counter===9){
            const levelBox = document.getElementById("levelBox");
            levelBox.classList.add("js-unclickable");
        }
        let gameOverFlg=isSelect(square);
        //GameOver ではない場合、クマのターン(auto)
        if( gameOverFlg ==="0"){
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function(){
                    bearTurn();
                },
                "2000"
            );
        }
    });
});
//クリックしたsquareにpenguinsかbear表示.表示したところはクリックできないようにする。
function isSelect(selectSquare){
    let gameOverFlg="0";
    if (flag==="pen-flag"){
        //click sound
        let music = new Audio(gameSound[0]);
        music.currentTime=0;
        music.play();//reload
        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
        //penguins win
        if(isWinner("penguins")){
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg="1";
        }
        setMessage("bear-turn");
        flag="bear-flag";
    }else{
        //click sound
        let music= new Audio(gameSound[1]);
        music.currentTime=0;
        music.play();
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
        //white bear win
        if(isWinner("bear")){
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg="1";
        }
        setMessage("pen-turn");
        flag="pen-flag";
    }
//ターン数カウンター-1する」
counter--;
//ターン数=0になったらdraw
if(counter===0){
    setMessage("draw");
    gameOver("draw");
    return gameOverFlg="1";
}
return gameOverFlg="0";
}
//classListの使い方 :http//giita.com/tomokichi ruby/items/2460c5902d19b81cace5
function isWinner(symbol){
    const result= lineArray.some(function(line){
        const subResult = line.every(function(square){
       if(symbol==="penguins"){
        return square.classList.contains("js-pen-checked");
       }
       if(symbol=== "bear"){
        return square.classList.contains("js-bear-checked");
       }
        });
        if(subResult){ winningLine=line}
        return subResult;
    });
    return result;
}
//メッセージ切り替え関数
function setMessage(id){
    switch(id){
        case "pen-turn":
        document.getElementById("msgtext").innerHTML=msgtxt1;
        break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;
            break;
            case "pen-win":
                document.getElementById("msgtext").innerHTML=msgtxt3;
                break;
                case "bear-win":
                    document.getElementById("msgtext").innerHTML=msgtxt4;
                    break;
                    case "draw":
                        document.getElementById("msgtext").innerHTML=msgtxt5;
                        break;
            default:
                document.getElementById("msgtext").innerHTML=msgtxt1;
    }
}
//ゲーム完了時の修理
function gameOver(status){
    //game over sound
    let w_sound
    switch(status){
        case"penguins":
        w_sound=gameSound[2];
        break;
        case"bear":
        w_sound= gameSound[3];
        break;
        case"draw":
        w_sound=gameSound[4];
        break;
    }
    let music= new Audio(w_sound);
    music.currentTime=0;
    music.play();
    //all square unclickable
    //squaresArray.forEach(function(square){
    //    square.classList.add("js-unclickable");
   // });
   const squaresBox=document.getElementById("squaresBox");
   squaresBox.classList.add("js-unclickable");
    //display New Game button:display;
    newgamebtn_display.classList.remove("js-hidden");
//wineffect
if(status==="penguins"){
    //winner -line penguins high-light
    if(winningLine){
        winningLine.forEach(function(square){
            square.classList.add("js-pen_highLight");
        });
    }
    //penguins win!! ==> snow color is pink
    $(document).snowfall({
        flakeColor:"rgb(255,240,245)",
        maxSpeed:3,
        minSpeed:1,
        maxSize:20,
        minSize:10,
        round:true
    });
 } else if(status==="bear"){
        //winner-line bear high-light
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-bear_highLight");
            });
        }
        //whitebear win!! ==> snow color is blue
        $(document).snowfall({
            flakeColor:"rgb(175,238,238)",
            maxSpeed:3,
            minSpeed:1,
            maxSize:20,
            minSize:10,
            round:true
        });
}    
}
//new game button click ゲーム初期化
newgamebtn.addEventListener("click",function(){
    //penguinsのターン
    flag="pen-flag";
    //ターン数カウンター
counter=9;
winningLine=null;
squaresArray.forEach(function(square){
square.classList.remove("js-pen-checked");
square.classList.remove("js-bear-checked");
square.classList.remove("js-unclickable");
square.classList.remove("js-pen_highLight");
square.classList.remove("js-bear_highLight");
square.classList.add("js-clickable");
});
const squaresBox = document.getElementById("squaresBox");
squaresBox.classList.remove("js-unclickable");
levelBox.classList.remove("js-unclickable");
setMessage("pen-turn");
newgamebtn_display.classList.add("js-hidden");
//snowfall
$(document).snowfall("clear");
});
/*********************************** */
//クマのターン
function bearTurn(){
    //level を取得
    let level= sessionStorage.getItem("tic_tac_toe_access");
    let bearTurnEnd="0";
    let gameOverFlg="0";
    while(bearTurnEnd ==="0"){
        if(level==="1" || level==="2" || level==="3"){
        //クマのリーチ検査(attack)
        bearTurnEnd = isReach("bear");
        if( bearTurnEnd ==="1"){
            gameOverFlg="1";
            break;
        }
    }
    if(level ==="2" || level==="3"){
        //ペンギンのリーチ検査
        bearTurnEnd= isReach("penguins");
        if( bearTurnEnd==="1"){
            break;
        }
    }
    if(level ==="2" || level ==="3"){
        if (b_2.classList.contains("js-clickable")){
            gameOverFlg= isSelect(b_2);
            bearTurnEnd="1";
            break;
        }
    }
    if(level==="3"){
        for(let square of lineRandom){
            if(square.classList.contains("js-clickable")){
                gameOverFlg= isSelect(square);
                bearTurnEnd="1";
                break;
            }
        }
        if(bearTurnEnd==="1") break;
    }
    //まだマス目を選んでいない場合、クリックできるクマ目をランダムに選ぶ
    const bearSquare = squaresArray.filter(function(square){
        return square.classList.contains("js-clickable");
    });
    let n= Math.floor(Math.random()* bearSquare.length);
    gameOverFlg= isSelect(bearSquare[n]);
    break;
}
    //gameover じゃない場合
    if(gameOverFlg ==="0"){
        const squaresBox = document.getElementById("squaresBox");
        squaresBox.classList.remove("js-unclickable");
    }
}
/**************************** */
// リーチを探す
/**************************** */
function isReach(status){
    let bearTurnEnd="0";
    lineArray.some(function(line){
        let bearCheckCnt=0;
        let penCheckCnt=0;
        line.forEach(function(square){
            if(square.classList.contains("js-bear-checked")){
                bearCheckCnt++;
            }
            if(square.classList.contains("js-pen-checked")){
                penCheckCnt++;
            }
        });
        //クマのリーチ検査とき、クマのリーチあり
        if(status==="bear"&& bearCheckCnt ===2 && penCheckCnt===0){
            bearTurnEnd="1"
        }
        //ペンギンのリーチ検査とき、ペンギンのリーチあり
        if (status==="penguins" && bearCheckCnt===0 && penCheckCnt===2){
            bearTurnEnd="1";
        }
        //クマかペンギンのリーチありの場合、空いているマス目を選択
        if( bearTurnEnd==="1"){
            line.some(function(square){
                if(square.classList.contains("js-clickable")){
                    isSelect(square);
                    return true;
                }
            })
            return true;
        }
    });
    return bearTurnEnd;
}
