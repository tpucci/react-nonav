import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SCREEN_MARGIN = 16;
const POST_SIZE = SCREEN_WIDTH - SCREEN_MARGIN;

const styles = StyleSheet.create({
  header: {
    padding: 8,
    flexDirection: 'row',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: 'white',
  },
  info: {
    paddingVertical: 8,
    marginLeft: 8,
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  post: {
    height: POST_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  emoji: {
    fontSize: 24,
  },
  postEmoji: {
    fontSize: POST_SIZE,
  },
  container: {
    marginHorizontal: SCREEN_MARGIN,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

interface Props {
  user: any;
  post: any;
}

export class PostSneakPeek extends Component<Props> {
  render() {
    const { user, post } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: user.color }]}>
            <Text style={styles.emoji}>{user.emoji}</Text>
          </View>
          <View style={styles.info}>
            <Text>{user.name}</Text>
          </View>
        </View>
        <View style={[styles.post, { backgroundColor: post.color }]} key={post.id}>
          <Text style={styles.postEmoji}>{post.emoji}</Text>
        </View>
      </View>
    );
  }
}
