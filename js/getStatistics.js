const getExpenses = async () => {
    const user = firebase.auth().currentUser.email;
    let content = '<div id="monthlyTotal"><p class="lead mt-4">Suma wydatków w tym miesiącu:</p><p class="h2">'

    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDayOfMonth = new Date(y, m, 1);
    let lastDayOfMonth = new Date(y, m + 1, 0);

    var total = 0;

    await db.collection("expenses")
        .where("user", "==", user)
        .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let date = Date.parse(doc.data()["date"])
            if (date >= firstDayOfMonth && date <= lastDayOfMonth) {
                total += parseFloat(doc.data()["price"])
            }
        });
    });
    content += total.toString();
    content +=' zł</p></div>'
    $("#monthlyTotal").replaceWith(content)
}

const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click", getExpenses, false)

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
  
async function loadStats() {
    await delay(1500);
    getExpenses();
}

window.onload = function() {
    loadStats();
};