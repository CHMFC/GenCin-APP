import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BarraSuperior({onPag}) {
  const handleMenuClick = () => {
    console.log('Menu Clicado!');
  };

  const handleHome = () => {
    onPag(0);
  };

  const handleNotificacacoesClick = () => {
    onPag(6);
  };

  return (
    <>
      <StatusBar barStyle='transparent'/>
      <SafeAreaView style={styles.containerSafe}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.iconContainer} onPress={handleMenuClick}>
            <Ionicons name='menu-outline' size={24} color='#FFFFFF' />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHome} style={styles.logoContainer}>
            <Image
              source={require('../assets/LogoNome.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={handleNotificacacoesClick}>
            <Ionicons name='notifications-outline' size={24} color='#FFFFFF' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#CE1111',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 8,
    height: 50,
    alignItems: 'center',
    zIndex: 1,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
  },
});
