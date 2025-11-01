// React and React Native imports
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

// Third-party imports
import Button from 'react-native-button';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIconsIcons from 'react-native-vector-icons/EvilIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIconsIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import ZocialIcons from 'react-native-vector-icons/Zocial';
import SimpleLineIconsIcons from 'react-native-vector-icons/SimpleLineIcons';

// --------------------------------------------------------------------
// Supported icon sets
const iconSets = {
  Entypo: EntypoIcons,
  EvilIcons: EvilIconsIcons,
  Feather: FeatherIcons,
  FontAwesome: FontAwesomeIcons,
  Foundation: FoundationIcons,
  Ionicons: IoniconsIcons,
  MaterialIcons: MaterialIconsIcons,
  MaterialCommunityIcons: MaterialCommunityIconsIcons,
  Octicons: OcticonsIcons,
  Zocial: ZocialIcons,
  SimpleLineIcons: SimpleLineIconsIcons,
};

// --------------------------------------------------------------------
// Star Button Component
class StarButton extends Component {
  onButtonPress = (event) => {
    const { halfStarEnabled, starSize, rating, onStarButtonPress } = this.props;
    let addition = 0;
    if (halfStarEnabled) {
      const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
      addition = isHalfSelected ? -0.5 : 0;
    }
    onStarButtonPress(rating + addition);
  };

  iconSetFromProps() {
    const { icoMoonJson, iconSet } = this.props;
    if (icoMoonJson) return createIconSetFromIcoMoon(icoMoonJson);
    return iconSets[iconSet] || FontAwesomeIcons;
  }

  renderIcon() {
    const { reversed, starColor, starIconName, starSize, starStyle } = this.props;
    const Icon = this.iconSetFromProps();

    const newStarStyle = {
      transform: [{ scaleX: reversed ? -1 : 1 }],
      ...StyleSheet.flatten(starStyle),
    };

    if (typeof starIconName === 'string') {
      return (
        <Icon
          name={starIconName}
          size={starSize}
          color={starColor}
          style={newStarStyle}
        />
      );
    }

    const imageStyle = {
      width: starSize,
      height: starSize,
      resizeMode: 'contain',
    };

    return <Image source={starIconName} style={[imageStyle, newStarStyle]} />;
  }

  render() {
    const { activeOpacity, buttonStyle, disabled } = this.props;
    return (
      <Button
        activeOpacity={activeOpacity}
        disabled={disabled}
        containerStyle={buttonStyle}
        onPress={this.onButtonPress}
      >
        {this.renderIcon()}
      </Button>
    );
  }
}

// --------------------------------------------------------------------
// PropTypes & Defaults
StarButton.propTypes = {
  disabled: PropTypes.bool,
  halfStarEnabled: PropTypes.bool,
  icoMoonJson: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  iconSet: PropTypes.string,
  rating: PropTypes.number.isRequired,
  reversed: PropTypes.bool,
  starColor: PropTypes.string,
  starIconName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]).isRequired,
  starSize: PropTypes.number,
  activeOpacity: PropTypes.number,
  onStarButtonPress: PropTypes.func.isRequired,
};

StarButton.defaultProps = {
  buttonStyle: {},
  icoMoonJson: undefined,
  starStyle: {},
  disabled: false,
  halfStarEnabled: false,
  reversed: false,
  starColor: '#FFD700', // Gold default
  starSize: 30,
  activeOpacity: 0.7,
  iconSet: 'FontAwesome',
};

export default StarButton;