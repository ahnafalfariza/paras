import React, { useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
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

  const parseMsg = (msg) => {
    const splitMsg = msg.split('::');
    if (splitMsg[0] === 'System') {
      if (splitMsg[1] === 'RewardDisburse') {
        return 'Daily Reward';
      }
      if (splitMsg[1] === 'PieceSupporter') {
        return 'Piece Supporter Payout';
      }
      if (splitMsg[1] === 'Piece') {
        return 'Piece';
      }
    }

    return msg;
  };

  const parseUser = (txData) => {
    const txUserId = isTransactionOut ? txData.to : txData.from;
    let user = isTransactionOut ? txData.toUser : txData.fromUser;

    const splitUserId = txUserId.split('::');
    if (splitUserId.length > 1 && splitUserId[0] === 'paras') {
      user = {
        imgAvatar: {
          type: 'ipfs',
          url: 'QmbyiNskTRPLHyVGUVoRrxrStevj4RA7Umn1tyH5wywoLA',
        },
      };
    }

    return (
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        {user !== null && (
          <FastImage
            source={{ uri: getImageUrl(user.imgAvatar) }}
            style={{ height: 24, width: 24, marginRight: 8, borderRadius: 12 }}
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
          {txUserId}
        </Text>
      </View>
    );
  };

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
            {parseUser(data)}
            {data.msg !== '' && (
              <Text style={[_styles.userText, { marginBottom: 4 }]} numberOfLines={1}>
                {parseMsg(data.msg)}
              </Text>
            )}
            <Text style={_styles.dateText}>{timeAgo.format(new Date(data.createdAt))}</Text>
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
  headerComponent = null,
  footerComponent = null,
  list,
  hasMore = false,
  onLoadMore = () => {},
  onRefresh = () => {},
}) => {
  const [refreshing, setRefresh] = useState(false);
  const ref = React.useRef(null);

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

  const renderItem = ({ item }) => <Transaction data={item} />;

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
      contentContainerStyle={{ paddingVertical: 6, paddingHorizontal: 12 }}
      ListHeaderComponent={headerComponent}
      ListHeaderComponentStyle={{ marginBottom: 12 }}
      ListFooterComponent={
        hasMore ? (
          <ActivityIndicator color={Colors['white-1']} style={{ marginVertical: 8 }} />
        ) : (
          footerComponent
        )
      }
      onEndReachedThreshold={0.9}
      onEndReached={hasMore ? onLoadMore : null}
    />
  );
};

export default TransactionList;

const _styles = StyleSheet.create({
  containerView: {
    padding: 12,
    backgroundColor: Colors['dark-4'],
    borderRadius: 6,
    marginVertical: 6,
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
