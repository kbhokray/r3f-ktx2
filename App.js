import React, { useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import Experience from './Experience';

export default function App() {
  const [items] = useState([
    {
      id: '1',
      name: 'Experience 1',
    },
    {
      id: '2',
      name: 'Experience 2',
    },
    {
      id: '3',
      name: 'Experience 3',
    },
    {
      id: '4',
      name: 'Experience 4',
    },
  ]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFF00',
      }}
    >
      <FlatList
        data={items}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0000FF',
        }}
        renderItem={({ item }) => <Experience name={item.name} listKey={item.id} />}
        maxToRenderPerBatch={2}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').height}
      />
    </View>
  );
}
