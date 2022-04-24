const enableNotificationBtn = document.getElementById("enableNotifications-btn");
enableNotificationBtn.addEventListener("click", askNotificationPermission);

function askNotificationPermission() {
    function handlePermission(permission) {
      if(Notification.permission === 'denied' || Notification.permission === 'default') {
        enableNotificationBtn.style.display = 'block';
      } else {
        enableNotificationBtn.style.display = 'none';
      }
    }
  
    if (!('Notification' in window)) {
      console.log("Twoja wyszukiwarka nie wspiera powiadomień.");
    } else {
      if(checkNotificationPromise()) {
        Notification.requestPermission()
        .then((permission) => {
          handlePermission(permission);
        })
      } else {
        Notification.requestPermission(function(permission) {
          handlePermission(permission);
        });
      }
    }
  }

  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }