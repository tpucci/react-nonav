import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { getRandomComments } from './getRandomComment';

const { width: POST_SIZE } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 8,
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    paddingVertical: 8,
    marginLeft: 8,
    flex: 1,
  },
  post: {
    height: POST_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  postEmoji: {
    fontSize: POST_SIZE,
  },
  comment: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentComment: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  commentCommentComment: {
    marginLeft: 8,
  },
});

interface Props {
  user: any;
  post: any;
  selectUser: (user: any) => any;
}

export class PostPage extends Component<Props> {
  render() {
    const { user, post } = this.props;

    const comments = getRandomComments();

    return (
      <SafeAreaView style={styles.container}>
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
        {comments.map(comment => (
          <View style={styles.comment} key={comment.id}>
            <TouchableOpacity
              onPress={() => {
                this.props.selectUser(comment.author);
              }}
            >
              <View style={[styles.avatar, { backgroundColor: comment.author.color }]}>
                <Text style={styles.emoji}>{comment.author.emoji}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.commentComment}>
              <Text style={styles.commentAuthor}>{comment.author.name}</Text>
              <Text style={styles.commentCommentComment}>{comment.comment}</Text>
            </View>
          </View>
        ))}
      </SafeAreaView>
    );
  }
}
