import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';
import { prettyBalance } from '../../utils/utils';
import assetSvg from '../../assets/svg/svg';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const Transaction = ({ data }) => {
  const userId = useSelector((state) => state.user.profile.id);
  const isTransactionOut = data.from === userId;

  return (
    <View style={_styles.containerView}>
      <View style={_styles.profileContainerView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 4 }}>
              {data.fromUser !== null && (
                <FastImage
                  source={{ uri: getImageUrl(data.fromUser.imgAvatar) }}
                  style={{ height: 24, width: 24, marginRight: 8 }}
                />
              )}
              <Text
                style={{
                  fontFamily: 'Inconsolata-Regular',
                  color: Colors['white-1'],
                  fontSize: ResponsiveFont(14),
                }}
                numberOfLines={1}
              >
                {data.from}
              </Text>
            </View>
            {data.msg !== '' && (
              <Text style={[_styles.userText, { marginBottom: 4 }]} numberOfLines={1}>
                {data.msg}
              </Text>
            )}
            <Text style={_styles.dateText}>
              {timeAgo.format(new Date(data.createdAt / 10 ** 6))}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={_styles.userText} numberOfLines={1}>
              {isTransactionOut ? '-' : '+'}
              {prettyBalance(data.value, 18, 4)}
            </Text>
            <SvgXml xml={assetSvg.wallet.pac} width="18" height="18" style={{ marginLeft: 4 }} />
          </View>
        </View>
      </View>
    </View>
  );
};

const TransactionList = ({
  transactionList,
  headerComponent = null,
  footerComponent = null,
  onRefresh = () => {},
  onLoadMore = () => {},
}) => {
  const [refreshing, setRefresh] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const refreshWallet = async () => {
    setRefresh(true);
    await wait(2000).then(() => onRefresh());
    setRefresh(false);
  };

  return (
    <FlatList
      data={transactionList}
      ListHeaderComponent={headerComponent}
      ListHeaderComponentStyle={{ marginBottom: 12 }}
      ListFooterComponent={footerComponent}
      refreshControl={
        <RefreshControl refreshing={refreshing} tintColor={'#ffffff'} onRefresh={refreshWallet} />
      }
      onEndReachedThreshold={0.5}
      onEndReached={onLoadMore}
      contentContainerStyle={{ margin: 16, paddingBottom: 32 }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Transaction data={item} />}
    />
  );
};

export default TransactionList;

const _styles = StyleSheet.create({
  containerView: {
    padding: 12,
    backgroundColor: Colors['dark-4'],
    borderRadius: 6,
    marginBottom: 12,
  },
  profileContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(15),
  },
  dateText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-2'],
    fontSize: ResponsiveFont(12),
  },
});
