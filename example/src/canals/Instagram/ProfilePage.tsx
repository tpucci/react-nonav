import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { getRandomPosts } from './getRandomPost';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const POST_SIZE = SCREEN_WIDTH / 3;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  info: {
    paddingVertical: 8,
    marginLeft: 8,
    flex: 1,
  },
  description: {
    marginTop: 8,
    color: 'grey',
  },
  postRow: {
    flexDirection: 'row',
  },
  post: {
    flex: 1,
    height: POST_SIZE,
    maxWidth: POST_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    overflow: 'hidden',
  },
  emoji: {
    fontSize: 48,
  },
  postEmoji: {
    fontSize: POST_SIZE,
  },
});

export class ProfilePage extends Component<{
  selectPost: (post: any) => any;
  sneakPeekPost: (post: any) => any;
  user: any;
}> {
  posts = getRandomPosts();
  render() {
    const { user } = this.props;
    const { posts } = this;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={[styles.avatar, { backgroundColor: user.color }]}>
              <Text style={styles.emoji}>{user.emoji}</Text>
            </View>
            <View style={styles.info}>
              <Text>{user.name}</Text>
              <Text style={styles.description}>{user.description}</Text>
            </View>
          </View>
          {posts.map((row, index) => (
            <View style={styles.postRow} key={index}>
              {row.map(post => (
                <TouchableOpacity
                  onPress={() => this.props.selectPost(post)}
                  key={post.id}
                  onLongPress={() => this.props.sneakPeekPost(post)}
                >
                  <View style={[styles.post, { backgroundColor: post.color }]}>
                    <Text style={styles.postEmoji}>{post.emoji}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
