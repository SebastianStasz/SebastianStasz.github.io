const readExpenses = async () => {
    const user = firebase.auth().currentUser.email;
    const category = document.getElementById("category-filter").value;
    let content = '<ul class="list-group" id="expenseslist">'
    
    await db.collection("expenses")
        .where("user", "==", user)
        .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            if (category == "none") {
                content += `<li class="row m-1 p-2 rounded ${data["category"]}"><span class="font-weight-bold col">${data["name"]}</span>`
                content += `<span class="col text-right font-weight-bold">${data["price"]} zł</span>`
                content += `<span hidden>${data["date"]}</span>`
                if(data["fileName"] != "")content += `<span class="col"><button class="photo float-right btn btn-light" id="${data["fileName"]}">PHOTO</button></span>`; else content += "<span class='col'></span>"
                content += `</li>`
            } else if (category == doc.data["category"]) {
                content += `<li class="row m-1 p-2 rounded ${data["category"]}"><span class="font-weight-bold col">${data["name"]}</span>`
                content += `<span class="col text-right font-weight-bold">${data["price"]} zł</span>`
                content += `<span hidden>${data["date"]}</span>`
                if(data["fileName"] != "")content += `<span class="col"><button class="photo float-right btn btn-light" id="${data["fileName"]}">PHOTO</button></span>`; else content += "<span class='col'></span>"
                content += `</li>`
            }
        });
    });
    content +='</ul>'
    $("#expenseslist").replaceWith(content)
}

const casflowsBtn = document.getElementById("cashFlows");
const applyFiltersBtn = document.getElementById("applyFilters-btn");
casflowsBtn.addEventListener("click", readExpenses, false)
applyFiltersBtn.addEventListener("click", readExpenses, false)

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

