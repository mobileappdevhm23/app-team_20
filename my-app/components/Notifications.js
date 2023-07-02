import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const NotificationsComponent = () => {
  useEffect(() => {
    const schedulePushNotification = async () => {
      // Request permission for notifications
      let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        console.log('Permission for push notifications not granted');
        return;
      }

      // Set up the notification schedule
      const trigger = {
        hour: 11,
        minute: 40,
        repeats: true, // Repeats daily at the specified time
      };

      // Create the notification
      const notificationContent = {
        title: 'Komm und spiele ein Quiz',
        body: 'Es ist Zeit, ein Quiz zu spielen!',
      };

      await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger,
      });
    };

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    schedulePushNotification();
  }, []);

  return null; // Since this component doesn't render any UI, return null
};

export default NotificationsComponent;
