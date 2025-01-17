import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcrypt-react-native';

export const checkAuthentication = (
  password,
  successCallback,
  failCallback,
  errorCallback,
) => {
  AsyncStorage.getItem('password')
    .then(savedPassword => {
      bcrypt
        .compareSync(password, savedPassword)
        .then(res => {
          if (res) {
            successCallback();
          } else {
            failCallback();
          }
        })
        .catch(err => {
          console.log('Auth Utils: ERROR!!!!!!!: ', err);
          errorCallback();
        });
    })
    .catch(err => {
      console.log('Auth Utils: ERROR!!!!!!!: ', err);
      errorCallback();
    });
};

export const checkAuthenticationByPinCode = (
  pinCode,
  successCallback,
  failCallback,
  errorCallback,
) => {
  AsyncStorage.getItem('pinCode')
    .then(savedPinCode => {
      if (JSON.stringify(pinCode) === savedPinCode) {
        successCallback();
      } else {
        failCallback();
      }
    })
    .catch(err => {
      console.log('Auth Utils: ERROR!!!!!!!: ', err);
      errorCallback();
    });
};

export const saveRememberOption = (
  rememberMe,
  successCallback,
  errorCallback,
) => {
  AsyncStorage.setItem('remember_me', rememberMe)
    .then(() => {
      successCallback();
    })
    .catch(err => {
      console.log('Auth Utils: ERROR!!!!!: ', err);
      errorCallback();
    });
};

export const getLoginType = async () => {
  const isFingerPrintUsed = await AsyncStorage.getItem('isFingerPrintUsed');
  return isFingerPrintUsed;
}