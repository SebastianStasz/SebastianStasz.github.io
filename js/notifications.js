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


console.log('firebase:');
console.log(firebase);

// Initialize Firebase
firebase.initializeApp(config);
console.log('firebase initialized');

const messaging = firebase.messaging();
console.log('messaging created');
console.log('key defined');

setTimeout(function()
{
    console.log('timeout running');
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken("BAaU9TbhYDzD9FWtv_PpvlEYXEsdBf7lxNJVGDr3DxC0Odog3Aw9xjARRpVN_X2lkHP0qRGDk2l1d2KdJ2Qz0x4").then((currentToken) => {
        console.log('getToken');
        if (currentToken)
        {
            console.log('getToken success');
            $('#pushLabel').text(currentToken);
        }
        else
        {
            console.log('getToken failure');
            // Show permission request.
            $('#pushLabel').text('No Instance ID token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('getToken error: ' + err);
    });

}, 5000);