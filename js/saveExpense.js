
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();
const addExpense = async ({name, price, user, category, date, fileName}) => {
    db.collection("expenses").add({
        name: name, price: price, user: user, category: category, date: date, fileName: fileName
    })
};

const submitForm = async () => {
    const name = document.getElementById("new-expense-name").value;
    const category = document.getElementById("new-expense-category").value;
    const date = document.getElementById("new-expense-date").value;
    const price = document.getElementById("new-expense-price").value;
    const user = firebase.auth().currentUser.email;
    const file = document.getElementById("new-expense-file").files[0];
    const fileName = file != null ? file.name : ""
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const fileRef = storageRef.child(fileName);
    if (file) fileRef.put(file)
    await addExpense({name, price, user, category, date, fileName})
};

const submitBtn = document.getElementById("save-btn");
if (submitBtn) {
    submitBtn.addEventListener(
        "click",
        submitForm,
        false
    );
}