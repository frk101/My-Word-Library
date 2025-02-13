import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {Input, CustomButton, AnimatedImage} from '../../components';
import {Colors} from '../../constants';
import {AuthStackParamsList} from '../../navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {login} from '../../actions/auth';

const {width} = Dimensions.get('window');
type Props = NativeStackScreenProps<AuthStackParamsList, 'Login'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState(__DEV__ ? 'frkalbayrak101@gmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? 'frk123' : '');
  const [loading, setloading] = useState(false);

  const handleLogin = async () => {
    setloading(true);
    try {
      await login(email, password);
    } finally {
      setloading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <AnimatedImage
              source={require('../../../assets/images/login.png')}
            />
            <Input
              text={'Email'}
              value={email}
              setValue={setEmail}
              placeholder={'321321'}
            />
            <Input
              text={'Şifre'}
              secureTextEntry
              value={password}
              setValue={setPassword}
              placeholder={'******'}
            />
            <CustomButton
              loading={loading}
              title={'Giriş Yap'}
              onPress={handleLogin}
              style={styles.btn}
              disabled={!email || !password}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text style={styles.text}>
                <Text>Kaydınız mı yok mu? </Text>Kayıt Ol
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  scrollContainer: {
    flex: 1,
  },
  image: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
  },
  btn: {marginVertical: 20},
  content: {paddingHorizontal: 20, paddingTop: 50},
  text: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginHorizontal: 10,
    textDecorationLine: 'underline',
    color: Colors.MIDNIGHT,
  },
});
