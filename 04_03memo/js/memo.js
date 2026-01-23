"use strict";
window.addEventListener("DOMContentLoaded",
    function () {
        //1.locaStrorageが使えるか確認
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
        selectTable();
        }
    }
);
//2.localStroge への保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            //値の入力チェック
            if (key == "" || value == "") {
                window.alert("Key,Memoはいずれも必須です。");
                return;
            } else {
                localStorage.setItem(key,value);
                viewStorage();
                let w_msg = "LocalStorage に " + key + "  " + value + "を保存しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};
//dataselect
function selectTable() {
    const select=document.getElementById("select");
    select.addEventListener("click",
    function(e){
        e.preventDefault();
        selectRadioBtn();
    },false
    );
};
//テーブルからデータ選択
function selectRadioBtn(){
    let w_sel="0";
    const radio1 =document.getElementsByName("radio1");
    const table1 =document.getElementById("table1");
    for(let i=0;i< radio1.length;i++){
     if(radio1[i].checked){
        document.getElementById("textKey").value=table1.rows[i+1].cells[1].firstChild.data;
        document.getElementById("textMemo").value=table1.rows[i+1].cells[2].firstChild.data;
        return w_sel="1";
     }
    }
window.alert("1つ選択してください。")
};
//locaStorage からのデータの取得とテーブル表示
function viewStorage(){
    const list=document.getElementById("list");
//htmlのテーブル初期化    
while(list.rows[0])list.deleteRow(0);
//localStorageすべての情報の取得
for(let i=0;i<localStorage.length;i++){
    let w_key=localStorage.key(i);
    //localStogeのキーと値を表示
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    td1.innerHTML="<input name='radio1' type='radio'>";
    td2.innerHTML=w_key;
    td3.innerHTML=localStorage.getItem(w_key);
}
};