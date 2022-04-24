const getExpenses = async () => {
    const user = firebase.auth().currentUser.email;
    let content = '<div id="monthlyTotal"><p class="lead mt-4">Suma wydatków w tym miesiącu:</p><p class="h2">'

    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDayOfMonth = new Date(y, m, 1);
    let lastDayOfMonth = new Date(y, m + 1, 0);
    firstDayOfMonth.setHours(0,0,0,0);
    lastDayOfMonth.setHours(0,0,0,0);

    var total = 0;

    await db.collection("expenses")
        .where("user", "==", user)
        .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let date = Date.parse(doc.data()["date"])
            date.setHours(0,0,0,0);
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
const homeBtn = document.getElementById("home");
refreshBtn.addEventListener("click", getExpenses, false)
homeBtn.addEventListener("click", getExpenses, false)
