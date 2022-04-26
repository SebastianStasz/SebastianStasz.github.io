const readExpenses = async () => {
    const user = firebase.auth().currentUser.email;
    const category = document.getElementById("category-filter").value;
    const startDateValue = document.getElementById("start-date").value;
    const endDateValue = document.getElementById("end-date").value;
    let content = '<div id="expenseslist">'

    var startDate = null
    var endDate = null

    if (startDateValue != "") { 
        startDate = new Date(Date.parse(startDateValue));
        startDate.setHours(0,0,0,0);
    }
    if (endDateValue != "") {
        endDate = new Date(Date.parse(endDateValue));
        endDate.setHours(0,0,0,0);
    }
    
    await db.collection("expenses").where("user", "==", user).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            var expenseDate = new Date(Date.parse(data["date"]));
            let expenseCategory = data["category"]
            expenseDate.setHours(0,0,0,0);

            if (category != "none" && category != expenseCategory) { return }
            if (startDate != null && startDate > expenseDate) { return }
            if (endDate != null && endDate < expenseDate) { return }
            
            content += `<div class="${expenseCategory} pb-3 pt-1 mb-3 rounded"><div class="d-flex justify-content-between">`
            content += `<span class="font-weight-bold col">${data["name"]}</span>`
            content += `<span class="col text-right font-weight-bold">${data["price"]} zł</span></div><div class="mt-1">`
            content += `<span class="col">${expenseDate.toLocaleDateString("en-US")}</span>`
            content += `<input type='button' value='Delete' class='delete float-right btn btn-danger mr-3' onclick='delete_expense("${doc.id}")'>`

            if (data["fileName"] != "") {
                content += `<button class="photo float-right btn btn-primary mr-3" id="${data["fileName"]}">Photo</button>`
            }

            content += `</div></div>`
        });
        content += `</div>`
    });
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

function delete_expense(id) { 
    db.collection('expenses').doc(id).delete();
    readExpenses();
}
