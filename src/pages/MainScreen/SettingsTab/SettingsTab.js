import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts} from '../../../styles';
import {SvgXml} from 'react-native-svg';
import FontAwesome, {SolidIcons, RegularIcons} from 'react-native-fontawesome';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

//import tabs
import Preferences from './Preferences/Preferences';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backImage = require('../../../assets/images/mainscreen/backimage.png');
const buyIconSvgXml = require('../SVGData').buyIcon;

const SettingsTab = ({navigation}) => {
  const [showStatus, setShowStatus] = useState('default');

  useEffect(() => {
    return () => {};
  });

  onLogOut = () => {
    AsyncStorage.removeItem('remember_me')
      .then(() => navigation.replace('login'))
      .catch();
  };

  const renderSettingsRow = (icon, name, onPress) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          marginVertical: 8,
        }}
        onPress={onPress}>
        <View>{icon}</View>
        <View style={{marginLeft: 16}}>
          <Text style={{...fonts.title2, color: 'white'}}>{name}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <FontAwesome
            style={{
              fontSize: 16,
              color: 'white',
            }}
            icon={SolidIcons.chevronRight}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const MainSettingsTab = () => {
    return (
      <ScrollView>
        <Image
          source={backImage}
          style={{position: 'absolute', right: '-15%', top: '10%'}}
        />
        <View
          style={{paddingTop: 44, paddingHorizontal: 16, paddingBottom: 10}}>
          <Text style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
            Settings
          </Text>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 24,
            height: '100%',
          }}>
          {renderSettingsRow(
            <FontAwesome
              style={{
                fontSize: 32,
                color: 'white',
              }}
              icon={RegularIcons.userCircle}
            />,
            'Account',
            () => {},
          )}
          {renderSettingsRow(
            <AntIcon name="sharealt" size={32} color="white" />,
            'Set My Master Address',
            () => {
              navigation.navigate('masterscreen');
            },
          )}
          {renderSettingsRow(
            <AntIcon name="eyeo" size={32} color="white" />,
            'Sync Metadata',
            () => {
              navigation.navigate('setupscreen');
            },
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.preferenceIconSvgXml} />,
            'Preferences',
            () => {
              setShowStatus('prefereneces');
            },
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.getHelpIconSvgXml} />,
            'Get Help',
            () => {},
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.sendFeedBackIconSvgXml} />,
            'Send Feed back',
            () => {},
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.logoutIconSvgXml} />,
            'Log out',
            () => {
              onLogOut();
            },
          )}
        </View>
      </ScrollView>
    );
  };

  const onGoBack = () => {
    setShowStatus('default');
  };

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.grey24,
          width: '100%',
          height: '100%',
        }}>
        {showStatus === 'default' && <MainSettingsTab />}
        {showStatus === 'prefereneces' && <Preferences onGoBack={onGoBack} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SettingsTab;
