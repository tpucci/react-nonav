import React, { Component } from 'react';
import { ProfilePage } from './ProfilePage';
import { PostPage } from './PostPage';
import { PostSneakPeek } from './PostSneakPeek';
import { Screen, Canal } from 'react-gondola';
import { ConvexUp, SlideLeft, SlideUp } from 'react-gondola/transitions';
import { getRandomUser } from './getRandomUser';

interface State {
  selectedPost: any | null;
  selectedUser: any | null;
  isSneakPeeking: boolean;
}

interface Props {
  user?: any;
}

export class Instagram extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.user = props.user || getRandomUser();
  }
  user: any;

  state = {
    isSneakPeeking: false,
    selectedPost: null,
    selectedUser: null,
  };

  render() {
    return (
      <Canal>
        <Screen
          name="profile"
          Component={ProfilePage}
          visible
          props={{
            selectPost: (selectedPost: any) => this.setState({ selectedPost }),
            sneakPeekPost: (selectedPost: any) =>
              this.setState({ selectedPost, isSneakPeeking: true }),
            user: this.user,
          }}
        />
        <Screen
          name="sneakPeek"
          Component={PostSneakPeek}
          Transitioner={ConvexUp}
          visible={this.state.isSneakPeeking && !!this.state.selectedPost}
          onBack={() => {
            this.setState({ selectedPost: null, isSneakPeeking: false });
          }}
          isFullScreen
          props={{
            user: this.user,
            post: this.state.selectedPost,
          }}
        />
        <Screen
          name="post"
          Component={PostPage}
          Transitioner={SlideLeft}
          visible={!this.state.isSneakPeeking && !!this.state.selectedPost}
          onBack={() => {
            this.setState({ selectedPost: null, isSneakPeeking: false });
          }}
          props={{
            user: this.user,
            post: this.state.selectedPost,
            selectUser: (user: any) => {
              this.setState({ selectedUser: user });
            },
          }}
        />
        <Screen
          name="nextProfile"
          Component={Instagram}
          Transitioner={SlideUp}
          visible={!!this.state.selectedUser}
          onBack={() => {
            this.setState({ selectedUser: null });
          }}
          props={{
            user: this.state.selectedUser,
          }}
        />
      </Canal>
    );
  }
}
