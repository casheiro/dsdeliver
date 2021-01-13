import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, ScrollView, Alert, Text, View } from 'react-native';
import { fetchOrders } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Order } from '../types';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchData = () => {
    setIsLoading(true);
    fetchOrders()
      .then(response => setOrders(response.data))
      .catch(error => Alert.alert(`Erro ao listar pedidos!\nErro: ${error}`))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);



  const handleOnPress = (order: Order) => {
    navigation.navigate('OrderDetails', {
      order
    });
  }

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        {isLoading ? (
          <>
            <View style={[styles.container2, styles.horizontal]} >
              <ActivityIndicator size="large" color="#DA5C5C" />
            </View>
            <Text style={styles.text}>Buscando lista de pedidos</Text>
          </>
        ) : (
            orders.map(order => (
              <TouchableWithoutFeedback
                key={order.id}
                onPress={() => handleOnPress(order)}
              >
                <OrderCard order={order} />
              </TouchableWithoutFeedback>
            ))
          )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    paddingTop: '70%'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  text: {
    paddingLeft: '25%',
    fontSize: 15
  }
});
