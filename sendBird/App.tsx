//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet,Pressable} from 'react-native';
import {SendbirdUIKitContainer} from '@sendbird/uikit-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createNativeClipboardService,
  createNativeFileService,
  createNativeMediaService,
  createNativeNotificationService,
} from '@sendbird/uikit-react-native';
import { App1 } from './firebase';

import { useGroupChannel } from '@sendbird/uikit-chat-hooks';

import Clipboard from '@react-native-clipboard/clipboard';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFBMessaging from '@react-native-firebase/messaging';
import Video from 'react-native-video';
import * as DocumentPicker from 'react-native-document-picker';
import * as FileAccess from 'react-native-file-access';
import * as ImagePicker from 'react-native-image-picker';
import * as CreateThumbnail from 'react-native-create-thumbnail';
import * as ImageResizer from '@bam.tech/react-native-image-resizer';
import * as Permissions from 'react-native-permissions';
import { initializeApp } from "firebase/app";

import {useNavigation, useRoute} from '@react-navigation/native';
import {
  createGroupChannelCreateFragment,
  createGroupChannelFragment,
  createGroupChannelListFragment,
} from '@sendbird/uikit-react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useConnection, useSendbirdChat} from '@sendbird/uikit-react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBw9qIsajv2T-KhjZtaN5VOrhIEoxc5pY8",
  authDomain: "sendbirdchat-56317.firebaseapp.com",
  projectId: "sendbirdchat-56317",
  storageBucket: "sendbirdchat-56317.appspot.com",
  messagingSenderId: "343077566046",
  appId: "1:343077566046:web:716ab86b734c800b5466cf",
  measurementId: "G-SRB72MGZXM"
};

const config = {
  name: 'sendBirdChat',
};

if(!initializeApp){
  console.log('error')
}

initializeApp(firebaseConfig,config)

const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelCreateFragment = createGroupChannelCreateFragment();
const GroupChannelFragment = createGroupChannelFragment();

const GroupChannelListScreen = () => {
  const navigation = useNavigation<any>();
  return (
      <GroupChannelListFragment
          onPressCreateChannel={(channelType) => {
              // Navigate to GroupChannelCreate function.
              navigation.navigate('GroupChannelCreate', { channelType });
          }}
          onPressChannel={(channel) => {
              // Navigate to GroupChannel function.
              navigation.navigate('GroupChannel', { channelUrl: channel.url });
          }}
      />
  );
};

const GroupChannelCreateScreen = () => {
  const navigation = useNavigation<any>();

  return (
      <GroupChannelCreateFragment
          onCreateChannel={async (channel) => {
              // Navigate to GroupChannel function.
              navigation.replace('GroupChannel', { channelUrl: channel.url });
          }}
          onPressHeaderLeft={() => {
              // Go back to the previous screen.
              navigation.goBack();
          }}
      />
  );
};

const GroupChannelScreen = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();

  const { sdk } = useSendbirdChat();
  const { channel } = useGroupChannel(sdk, params.channelUrl);
  if (!channel) return null;

  return (
      <GroupChannelFragment
          channel={channel}
          onChannelDeleted={() => {
              // Navigate to GroupChannelList function.
              navigation.navigate('GroupChannelList');
          }}
          onPressHeaderLeft={() => {
              // Go back to the previous screen.
              navigation.goBack();
          }}
          onPressHeaderRight={() => {
              // Navigate to GroupChannelSettings function.
              navigation.navigate('GroupChannelSettings', { channelUrl: params.channelUrl });
          }}
      />
  );
};

const RootStack = createNativeStackNavigator();
const SignInScreen = () => {
  const {connect} = useConnection();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable
        style={{
          width: 120,
          height: 30,
          backgroundColor: '#742DDD',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => connect('USER_ID', {nickname: 'NICKNAME'})}>
        <Text>{'Sign in'}</Text>
      </Pressable>
    </View>
  );
};

const Navigation = () => {
  const {currentUser} = useSendbirdChat();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {!currentUser ? (
          <RootStack.Screen name={'SignIn'} component={SignInScreen} />
        ) : (
          <>
            <RootStack.Screen
              name={'GroupChannelList'}
              component={GroupChannelListScreen}
            />
            <RootStack.Screen
              name={'GroupChannelCreate'}
              component={GroupChannelCreateScreen}
            />
            <RootStack.Screen
              name={'GroupChannel'}
              component={GroupChannelScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const ClipboardService = createNativeClipboardService(Clipboard);

const NotificationService = createNativeNotificationService({
  messagingModule: RNFBMessaging,
  permissionModule: Permissions,
});

const FileService = createNativeFileService({
  fsModule: FileAccess,
  permissionModule: Permissions,
  imagePickerModule: ImagePicker,
  mediaLibraryModule: CameraRoll,
  documentPickerModule: DocumentPicker,
});

const MediaService = createNativeMediaService({
  VideoComponent: Video,
  thumbnailModule: CreateThumbnail,
  imageResizerModule: ImageResizer,
});

// create a component
const App = () => {
  
  return (
    <SendbirdUIKitContainer
      appId={'C80BBBEA-B015-4AF9-B610-D175B2218149'}
      chatOptions={{localCacheStorage: AsyncStorage}}
      platformServices={{
        file: FileService,
        notification: NotificationService,
        clipboard: ClipboardService,
        media: MediaService,
      }}>
      <Navigation />
    </SendbirdUIKitContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
