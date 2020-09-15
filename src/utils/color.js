import React from 'react';
import { View } from 'react-native';

const Colors = {
  'dark-0': '#121212',
  'dark-1': '#1E1E1E',
  'dark-2': '#232323',
  'dark-3': '#252525',
  'dark-4': '#272727',
  'dark-6': '#2C2C2C',
  'dark-8': '#2E2E2E',
  'dark-12': '#333333',
  'dark-16': '#363636',
  'dark-24': '#383838',
  'primary-1': '#fac8cd',
  'primary-2': '#e69292',
  'primary-3': '#d86868',
  'primary-4': '#df4544',
  'primary-5': '#e13128',
  'primary-6': '#d32728',
  'primary-7': '#c21c23',
  'primary-8': '#b5131c',
  'primary-9': '#a60010',
  'black-1': '#1B1B1B',
  'black-2': '#3F3F3F',
  'black-3': '#616161',
  'black-4': '#8F8F8F',
  'black-5': '#BFBFBF',
  'black-6': '#DFDFDF',
  'white-1': '#E2E2E2',
  'white-2': '#A5A5A5',
  'white-3': '#787878',
  'green-1': '#39C16C',
};

export const Dark = () => (
  <>
    <View style={{ backgroundColor: Colors['dark-0'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['dark-1'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['dark-2'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['dark-3'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['dark-4'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['dark-6'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['dark-8'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['dark-12'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['dark-16'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['dark-24'], width: '100%', height: 40 }} />
  </>
);

export const Primary = () => (
  <>
    <View style={{ backgroundColor: Colors['primary-1'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['primary-2'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['primary-3'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['primary-4'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['primary-5'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['primary-6'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['primary-7'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['primary-8'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['primary-9'], width: '100%', height: 40 }} />
  </>
);

export const WhiteBlack = () => (
  <>
    <View style={{ backgroundColor: Colors['white-1'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['white-2'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['white-3'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['black-5'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['black-4'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['black-3'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['black-2'], width: '100%', height: 40 }} />
    <View style={{ backgroundColor: Colors['black-1'], width: '100%', height: 40 }} />
  </>
);

export default Colors;
