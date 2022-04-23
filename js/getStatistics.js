const getExpenses = async () => {
    const user = firebase.auth().currentUser.email;
    let content = '<p class="lead mt-4" id="monthlyTotal">Suma wydatków w tym miesiącu:</p><p class="h2">'

    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDayOfMonth = new Date(y, m, 1);
    let lastDayOfMonth = new Date(y, m + 1, 0);

    var total = 0;

    await db.collection("expenses")
        .where("user", "==", user)
        .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            total += doc.data()["price"]
            console.log(total)
            console.log(doc.data()["price"])
        });
    });
    content += total.toString();
    content +=' zł</p>'
    $("#monthlyTotal").replaceWith(content)
}

const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click", getExpenses, false)


$(document).ready(function(){
    getExpenses();
});
