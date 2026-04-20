export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolokalizacja nie jest wspierana przez tę przeglądarkę'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let message = 'Nieznany błąd';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Dostęp do lokalizacji został zabroniony';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Lokalizacja jest niedostępna';
            break;
          case error.TIMEOUT:
            message = 'Upłynął czas oczekiwania na lokalizację';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

export const watchPosition = (callback, errorCallback) => {
  if (!navigator.geolocation) {
    errorCallback?.(new Error('Geolokalizacja nie jest wspierana'));
    return null;
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      callback({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    },
    (error) => {
      errorCallback?.(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000
    }
  );
};

export const clearWatch = (watchId) => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
  }
};