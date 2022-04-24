$(document.body).on('click', '.photo', function (event) {
    storageRef.child(event.target.id).getDownloadURL()
        .then((url) => {
            var img = document.getElementById('myimg');
            img.setAttribute('src', url);
            document.getElementById('overlayDiv').style.display = 'block';
            document.getElementById('expenseslist').style.display = 'none';
        })
})

var handleClosePhoto = function() {
    document.getElementById('overlayDiv').style.display = 'none';
    document.getElementById('expenseslist').style.display = 'block';
};