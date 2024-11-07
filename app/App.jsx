import React, {useState, useEffect} from 'react';
import Wallet from "@utils/Wallet";
import BottomTabNavigator from '../app/components/BottomTabNavigator';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Onboarding from '@screens/Onboarding';
import Login from '@screens/Login'
import Join1 from '@screens/Join1';
import Join2 from '@screens/Join2';
import Join3 from '@screens/Join3';
import Join4 from '@screens/Join4';
import Start from '@screens/Start';
import JoinGroup from '@screens/JoinGroup';
import CreateGroup from '@screens/CreateGroup';
import {Alert, StatusBar} from 'react-native';


import {NavigationContainer, useNavigation} from '@react-navigation/native';
import StackNavigator from '@components/StackNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {theme} from '@assets/Theme';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {call} from "@utils/ApiService";


const Stack = createStackNavigator();

function MainStackNavigator() {

    const navigation = new useNavigation()

    useEffect(() => {
        // FCM Permission 요청
        async function requestUserPermission() {
            const authStatus = await messaging().requestPermission();
            const settings = await notifee.requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL ||
                settings.authorizationStatus === 1;

            if (enabled) console.log('Authorization status:', settings.authorizationStatus);
        }

        requestUserPermission();

        // 알림 채널 생성 (안드로이드)
        async function createNotificationChannel() {
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
                importance: AndroidImportance.HIGH,
            });

            console.log('Notification channel created with ID:', channelId);
        }
        createNotificationChannel();

        // Foreground FCM 알림 리스너
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            //Alert.alert('New FCM message!', JSON.stringify(remoteMessage));
            console.log('Foreground FCM message received:', remoteMessage);
            await notifee.displayNotification({
                title: remoteMessage.notification?.title,
                body: remoteMessage.notification?.body,
                data: remoteMessage.data,
                android: {
                    channelId: 'default',
                    importance: AndroidImportance.HIGH,
                    smallIcon: 'ic_notification',
                    color: '#6378EB'
                },
            });
        });

        // FCM Token 요청 및 refresh 리스너
        messaging().getToken().then(token => {
            console.log('FCM Token:', token);
            call('/user/fcm', true, "PATCH", { token: token })
                .then(response => {
                    console.log(response)
                }).catch(err => {
                    console.log(err)
            })
        });

        const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(token => {
            console.log('FCM Token refreshed:', token);
            call('/user/fcm', true, "PATCH", { token: token })
                .then(response => {
                    console.log(response)
                })
        });

        notifee.onForegroundEvent(({ type, detail }) => {
            if (type === EventType.PRESS) {
                const data = detail.notification.data
                if (data.type === 'notice') {
                    navigation.navigate('NoticeDetail', {noticeId: Number(data.id)})
                } else if (data.type === 'receipt') {
                    navigation.navigate('Ledger2')
                }
            }
        });

        return () => {
            unsubscribeOnMessage();
            unsubscribeOnTokenRefresh();
        };
    }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Join1" component={Join1} options={{headerShown: false}}/>
            <Stack.Screen name="Join2" component={Join2} options={{headerShown: false}}/>
            <Stack.Screen name="Join3" component={Join3} options={{headerShown: false}}/>
            <Stack.Screen name="Join4" component={Join4} options={{headerShown: false}}/>
            <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
            <Stack.Screen name="JoinGroup" component={JoinGroup} options={{headerShown: false}}/>
            <Stack.Screen name="CreateGroup" component={CreateGroup} options={{headerShown: false}}/>
            <Stack.Screen name="GoHome" component={BottomTabNavigator} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

function AppContent() {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={{ backgroundColor: theme.color.main, paddingTop: 0, flex: 1 }}>
            <StatusBar
                //hidden={true}
                barStyle="light-content"
                translucent={true}
                backgroundColor="transparent"
            />
            <NavigationContainer>
                <MainStackNavigator/>
            </NavigationContainer>
            {/* <BottomTabNavigator /> */}
        </SafeAreaView>

    );
}

function App() {
    return (
        <SafeAreaProvider>
            <AppContent/>
        </SafeAreaProvider>
    )
}

export default App;
