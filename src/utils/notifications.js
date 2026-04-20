export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('Ta przeglądarka nie wspiera powiadomień');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title, body) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.svg'
    });
  }
};

export const subscribeToPush = async (subscription) => {
  console.log('Push subscription:', subscription);
};
