const readExpenses = async () => {
    const user = firebase.auth().currentUser.email;
    const category = document.getElementById("category-filter").value;
    var startDate = document.getElementById("start-date").value;
    var endDate = document.getElementById("end-date").value;
    let content = '<ul class="list-group" id="expenseslist">'

    if (startDate != null) { startDate.toDate }
    if (endDate != null) { endDate.toDate }
    
    await db.collection("expenses").where("user", "==", user).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            var expenseDate = new Date(data["date"]);
            let expenseCategory = data["category"]
            expenseDate.toDate.setHours(0,0,0,0);

            if (category != "none" && category != expenseCategory) { return }
            if (startDate != null && startDate > expenseDate) { return }
            if (endDate != null && endDate < expenseDate) { return }

            content += `<li class="row m-1 p-2 rounded ${expenseCategory}"><span class="font-weight-bold col">${data["name"]}</span>`
            content += `<span class="col text-right font-weight-bold">${data["price"]} zł</span>`
            content += `<span hidden>${data["date"]}</span>`
            if(data["fileName"] != "")content += `<span class="col"><button class="photo float-right btn btn-light" id="${data["fileName"]}">PHOTO</button></span>`; else content += "<span class='col'></span>"
            content += `</li>`
        });
    });
    content +='</ul>'
    $("#expenseslist").replaceWith(content)
}

function resetExpenseFilters() {
    document.getElementById("category-filter").value = "none";
    document.getElementById("start-date").value = null;
    document.getElementById("end-date").value = null;
    readExpenses();
}

const casflowsBtn = document.getElementById("cashFlows");
const applyFiltersBtn = document.getElementById("applyFilters-btn");
const resetFiltersBtn = document.getElementById("resetFilters-btn");

casflowsBtn.addEventListener("click", readExpenses, false)
applyFiltersBtn.addEventListener("click", readExpenses, false)
resetFiltersBtn.addEventListener("click", resetExpenseFilters, false)
