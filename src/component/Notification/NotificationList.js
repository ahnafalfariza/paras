import React, { PureComponent, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, StyleSheet, Text, TouchableOpacityComponent } from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import Colors from '../../utils/color';
import RoutesName from '../../utils/RoutesName';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class Notification extends PureComponent {
  render() {
    const { notification, navigateTo } = this.props;

    const { message, createdAt, payload } = notification;
    return (
      <>
        <TouchableWithoutFeedback onPress={() => navigateTo(payload)}>
          <View style={_styles.notifContainer}>
            <Text style={_styles.msgText}>{message}</Text>
            <Text style={_styles.dateText}>{timeAgo.format(new Date(createdAt))}</Text>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

const NotificationList = ({ list, onLoadMore = () => { }, header, onRefresh = () => { }, hasMore }) => {
  const navigation = useNavigation()

  const [refreshing, setRefresh] = useState(false);
  const ref = React.useRef(null);

  const navigateTo = (payload) => {
    if (payload.screen === 'user') {
      navigation.navigate(RoutesName.UserProfile, {
        user: {
          id: payload.id
        }
      })
    }
    if (payload.screen === 'walletHistory') {
      navigation.navigate(RoutesName.WalletTab)
    }
  }

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const refreshFlatlist = async () => {
    setRefresh(true);
    await wait(2000).then(() => onRefresh());
    setRefresh(false);
  };

  const renderItem = ({ item }) => <Notification navigateTo={navigateTo} notification={item} refreshTimeline={refreshFlatlist} />;

  useScrollToTop(ref);

  return (
    <FlatList
      ref={ref}
      data={list}
      refreshControl={
        <RefreshControl refreshing={refreshing} tintColor={'#ffffff'} onRefresh={refreshFlatlist} />
      }
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ marginVertical: 8, marginHorizontal: 16, paddingBottom: 16 }}
      ListHeaderComponent={header}
      ListFooterComponent={() => {
        return hasMore ? (
          <ActivityIndicator color={Colors['white-1']} style={{ marginBottom: 16 }} />
        ) : null;
      }}
      onEndReachedThreshold={0.9}
      onEndReached={hasMore ? onLoadMore : null}
    />
  );
};

export default NotificationList;

const _styles = StyleSheet.create({
  notifContainer: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: Colors['dark-8'],
    overflow: 'hidden',
  },
  msgText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(15),
  },
  dateText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-2'],
    fontSize: ResponsiveFont(12),
    marginTop: 4,
  },
});