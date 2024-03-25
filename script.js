document.addEventListener("DOMContentLoaded", function() {
    const editButton = document.getElementById("editButton");
    const saveButton = document.getElementById("saveButton");
    const sectionElement = document.getElementById("section");
    const nameElement = document.getElementById("name");
    const phoneticElement = document.getElementById("phonetic");
    const name_affiliationElement = document.getElementById("name_affiliation");
    const phoneElement = document.getElementById("phone");
    const emailElement = document.getElementById("email");
    const addressElement = document.getElementById("address"); 

    // 更新ボタンがクリックされたときの処理
    editButton.addEventListener("click", function() {
        // 各要素を編集可能なinput要素に置き換える
        replaceTextWithInput(sectionElement);
        replaceTextWithInput(nameElement);
        replaceTextWithInput(phoneticElement);
        replaceTextWithInput(name_affiliationElement);
        replaceTextWithInput(phoneElement);
        replaceTextWithInput(emailElement);
        replaceTextWithInput(addressElement); 

        // 更新ボタンを非表示にし、変更完了ボタンを表示する
        editButton.style.display = "none";
        saveButton.style.display = "block";
    });

    // 変更完了ボタンがクリックされたときの処理
    saveButton.addEventListener("click", function() {
        // 編集内容を反映する
        sectionElement.textContent = sectionElement.querySelector("input").value;
        nameElement.textContent = nameElement.querySelector("input").value;
        phoneticElement.textContent = phoneticElement.querySelector("input").value;
        name_affiliationElement.textContent = name_affiliationElement.querySelector("input").value;
        phoneElement.textContent = phoneElement.querySelector("input").value;
        emailElement.textContent = emailElement.querySelector("input").value;
        addressElement.textContent = addressElement.querySelector("input").value; 

        // 変更完了ボタンを非表示にし、更新ボタンを表示する
        saveButton.style.display = "none";
        editButton.style.display = "block";
    });

    // テキストをinput要素に置き換える関数
    function replaceTextWithInput(element) {
        // もしelementが既にinput要素を持っていない場合のみ置き換える
        if (element.firstChild.nodeName !== "INPUT") {
            const currentValue = element.textContent.trim();
            element.innerHTML = '<input type="text" value="' + currentValue + '">';
        }
    }
});
