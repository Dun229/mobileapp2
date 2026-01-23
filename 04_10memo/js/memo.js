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
            delLocalStorage();
            allClearLocalStorage();
            deleteEv();
            selectTable();
        }
    }
);
//2.localStroge への保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e){
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
 //値の入力チェック
            if (key == "" || value == "") {
              Swal.fire({
                title:"Memo app",
                html:"Key,Memoはいずれも必須です。",
                type:"error",
                allowOutsideClick:false
              });
                return;
            } else{
                let w_msg ="LocalStorage に\n" + key + "  " + value + "\n を保存(save)しますか?";
                Swal.fire({
                    title:"Memo app",
                    html:w_msg,
                    type:"question",
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    showCancelButton: true,allowOutsideClick: false})
                .then(function(result){
                if (result.value === true) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorage に " + key + "  " + value + " を保存しました。";
                    Swal.fire({
                        title:"Memo app",
                        html:w_msg,
                        type:"success",
                        allowOutsideClick:false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
          });
        }
        }
    );

};
        
//3.localStorageから1件削除->選択される行を削除
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1= document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = "0";
            w_cnt= selectCheckBox("del");
            if (w_cnt >=1) {
                Swal.fire({
                    title: "Memo app",
                    html: "LocalStorage から選択された <b>" + w_cnt + " 件</b> を削除(delete)しますか？",
                    type:"question",
                    showCancelButton: true,
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    allowOutsideClick: false}).then(function(result){
                if (result.value === true) {
                    for(let i = 0; i < chkbox1.length; i++){
                        if(chkbox1[i].checked){
                    localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                        }
                        }
                        viewStorage();
                        Swal.fire({
                            title: "Memo app",
                            html: "LocalStorage から <b>" + w_cnt + " 件</b> を削除しました。",
                            type: "success",
                            allowOutsideClick: false
                        });
                    // window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
        }, false
    );
};
//version up5 add str
function deleteEv() {
    const table1 = document.getElementById("table1");
  
    table1.addEventListener("click", function (e) {
      const trash = e.target.closest(".trash");
      if (!trash) return;
  
      const tr = trash.closest("tr");
      const key = tr.children[1].textContent;
      const value = tr.children[2].textContent;
  
      let w_dl = "LocalStorage から\n" + key + "  " + value + "\nを削除しますか？";
  
      Swal.fire({
        title: "Memo app",
        html: w_dl,
        type: "question",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        allowOutsideClick: false
      }).then(function (result) {
        if (result.value === true) {
          localStorage.removeItem(key);
          tr.remove();
  
          Swal.fire({
            title: "Memo app",
            html: "削除しました。",
            type: "success",
            allowOutsideClick: false
          });
  
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      });
    }, false);
  }
  

//4localStrogeからすべて削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            Swal.fire({
                title: "Memo app",
                html: "LocalStrorage のデータをすべて削除(all clear)します。<br>よろしいですか？",
                type: "question",
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                allowOutsideClick: false
            }).then(function (result) {
                if (result.value === true) {
    
                    localStorage.clear();
                    viewStorage();
                    Swal.fire({
                        title: "Memo app",
                        html: "LocalStorage のデータをすべて削除しました。",
                        type: "success",
                        allowOutsideClick: false
                    });
    
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }, false);
    };
//5.dataselect
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select");
        }, false
    );
};
//テーブルからデータ選択
function selectCheckBox(mode) {
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
   //tu cho nay
    const trashes = table1.getElementsByClassName("trash");
  const trashesArray = Array.from(trashes);
  trashesArray.forEach(function (trash_icon) {
    trash_icon.addEventListener('click', (e) => {  // eはイベントの対象要素…変数なので、名前はなんでもよい。
      let tr = e.target.parentNode.parentNode;
      tr.parentNode.deleteRow(tr.sectionRowIndex); // trのインデックスを取得して行を削除する
    });
  });
    let w_textKey = "";
    let w_textMemo = "";
    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey ;
    document.getElementById("textMemo").value= w_textMemo;
    if(mode==="select"){
    if (w_cnt === 1) {
      return w_cnt;
    } else {
        Swal.fire({
            title: "Memo app",
            html: "1つ選択してください。",
            type: "error",
            allowOutsideClick: false
        });
    }
}

if (mode === "del") {
    if (w_cnt >= 1) {
        return w_cnt;
    } else {
        Swal.fire({
            title: "Memo app",
            html: "1つ以上選択してください。",
            type: "error",
            allowOutsideClick: false
        });
    }
}
}

//locaStorage からのデータの取得とテーブル表示
function viewStorage() {
    const list = document.getElementById("list");
    //htmlのテーブル初期化    
    while (list.rows[0]) list.deleteRow(0);
    //localStorageすべての情報の取得
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);
        //localStogeのキーと値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }

    //jQueryのplugin tablesorterをつかってテーブルのソート
    //sortList 
    $("#table1").tablesorter({//tablesort add
        sortList: [[1, 0]]
    });
    $("#table1").trigger("update");
};