import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// const CustomDrawerContent = (props: any) => {
//   return (
//     <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Aluguel de Carros</Text>
//       </View>
//       <View style={{ flex: 1, paddingTop: 10 }}>
//         <DrawerItemList {...props} />
//       </View>
//     </DrawerContentScrollView>
//   );
// };

const CustomDrawerContent = (props: any) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Aluguel de Carros</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#4B7BE5',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CustomDrawerContent;