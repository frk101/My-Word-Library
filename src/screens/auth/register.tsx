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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamsList} from '../../navigation/types';
import {register} from '../../actions/auth';
const {width} = Dimensions.get('window');
type Props = NativeStackScreenProps<AuthStackParamsList, 'Login'>;

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState(__DEV__ ? 'frkalbayrak101@gmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? 'frk123' : '');
  const [loading, setloading] = useState(false);
  const handleRegister = async () => {
    setloading(true);
    try {
      const user = await register(email, password);
      if (user) {
        navigation.navigate('Login');
      }
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
              source={require('../../../assets/images/user.png')}
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
              title={'Kayıt Yap'}
              onPress={handleRegister}
              style={styles.btn}
              disabled={!email || !password}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.text}>
                <Text>Zaten hesabım var </Text>Giriş Yap
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
