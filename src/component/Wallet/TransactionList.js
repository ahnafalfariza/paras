import React, { useRef, useState } from 'react';
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
import { useNavigation, useScrollToTop } from '@react-navigation/native';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const Transaction = ({ data }) => {
  const userId = useSelector((state) => state.user.profile.id);
  const isTransactionOut = data.from === userId;

  const parseMsg = (msg) => {
    const splitMsg = msg.split('::');
    if (splitMsg[0] === 'System') {
      if (splitMsg[1] === 'RewardDisburse') {
        return `Daily Reward`;
      }
      if (splitMsg[1] === 'PieceSupporter') {
        return `Piece Supporter Payout`;
      }
      if (splitMsg[1] === 'Piece') {
        return `Piece`;
      }
    }

    return msg;
  };

  const parseUser = (data) => {
    const userId = isTransactionOut ? data.to : data.from;
    let user = isTransactionOut ? data.toUser : data.fromUser;

    const splitUserId = userId.split('::');
    if (splitUserId.length > 0 && splitUserId[0] === 'paras') {
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
          {userId}
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
  hasMore,
  onLoadMore = () => {},
  onRefresh = () => {},
}) => {
  const navigation = useNavigation();

  const [refreshing, setRefresh] = useState(false);
  const ref = React.useRef(null);

  const navigateTo = (payload) => {
    if (payload.screen === 'comment') {
      navigation.navigate('Comment', { id: payload.id });
    } else if (payload.screen === 'walletHistory') {
      navigation.navigate(RoutesName.WalletTab, { screen: RoutesName.WalletHistory });
    } else if (payload.screen === 'post') {
      navigation.navigate(RoutesName.SinglePost, { postId: payload.id });
    }
  };

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
      contentContainerStyle={{ marginVertical: 8, marginHorizontal: 16, paddingBottom: 16 }}
      ListHeaderComponent={headerComponent}
      ListHeaderComponentStyle={{ marginBottom: 12 }}
      ListFooterComponent={footerComponent}
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
