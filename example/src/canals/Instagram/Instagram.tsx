import React, { Component } from 'react';
import { ProfilePage } from './ProfilePage';
import { PostPage } from './PostPage';
import { PostSneakPeek } from './PostSneakPeek';
import { Screen, Canal } from 'react-gondola';
import { CardSkewUp, SlideLeft } from 'react-gondola/transitions';
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
          Transitioner={CardSkewUp}
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
          Transitioner={CardSkewUp}
          visible={this.state.isSneakPeeking && !!this.state.selectedPost}
          onBack={() => {
            debugger;
            this.setState({ selectedPost: null, isSneakPeeking: false });
          }}
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
            debugger;
            this.setState({ selectedPost: null, isSneakPeeking: false });
          }}
          props={{
            user: this.user,
            post: this.state.selectedPost,
          }}
        />
      </Canal>
    );
  }
}
