const readExpenses = async () => {
    const user = firebase.auth().currentUser.email;
    let content = '<ul class="list-group" id="expenseslist">'
    await db.collection("expenses")
        .where("user", "==", user)
        .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            content += `<li class="row m-1 p-2 rounded ${doc.data()["category"]}"><span class="font-weight-bold col">${doc.data()["name"]}</span>`
            content += `<span class="col text-right font-weight-bold">${doc.data()["price"]} zł</span>`
            content += `<span hidden>${doc.data()["date"]}</span>`
            if(doc.data()["fileName"] != "")content += `<span class="col"><button class="photo float-right btn btn-light" id="${doc.data()["fileName"]}">PHOTO</button></span>`; else content += "<span class='col'></span>"
            content += `</li>`
        });
    });
    content +='</ul>'
    //document.getElementById('expenseslist').text = content;
    $("#expenseslist").replaceWith(content)
}
const casflowsBtn = document.getElementById("cashFlows");
if (cashFlows) {
    casflowsBtn.addEventListener(
        "click",
        readExpenses,
        false
    )
}
function filterExpenses() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('category');
    ul = document.getElementById("expenseslist");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        console.log(input.value)
        if (li[i].classList.contains(input.value.split(' ')[0])) {
            console.log("SDds")
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
    }
}

