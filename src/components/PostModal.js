import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase/compat/app";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
  const [postContentText, setPostContentText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [shareVideo, setShareVideo] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const [shareFileType, setShareFileType] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`Not a image ${typeof image} `);
      return;
    }
    setShareImage(image);
  };
  const switchShareFileType = (area) => {
    setShareImage("");
    setShareVideo("");
    setShareFileType(area);
  };
  const reset = (e) => {
    setPostContentText("");
    setShareImage("");
    setShareVideo("");
    props.handleClick(e);
  };
  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: shareVideo,
      user: props.user,
      description: postContentText,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    reset(e);
  };
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h4>Create a Post</h4>
              <CloseButton onClick={(event) => reset(event)}>
                <img src="/images/close-icon.png" alt=""></img>
              </CloseButton>
            </Header>
            <PostContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <h5>{props.user.displayName}</h5>
              </UserInfo>
              <Editor>
                <textarea
                  value={postContentText}
                  onChange={(e) => setPostContentText(e.target.value)}
                  placeholder="What to you want to talk about?"
                  autoFocus={true}
                />
                {shareFileType === "image" ? (
                  <>
                    <ImageShare>
                      <input
                        type="file"
                        accept="image/gif, image/png, image/jpeg, image/png"
                        name="image"
                        id="file"
                        onChange={handleChange}
                      />
                      <PreviewImage>
                        {shareImage && (
                          <img src={URL.createObjectURL(shareImage)} alt="" />
                        )}
                      </PreviewImage>
                    </ImageShare>
                  </>
                ) : (
                  shareFileType === "media" && (
                    <PreviewVideo>
                      <input
                        type="text"
                        placeholder="Pleaser procide the video link"
                        value={shareVideo}
                        onChange={(e) => setShareVideo(e.target.value)}
                      />
                      {shareVideo && (
                        <ReactPlayer
                          width="100%"
                          height="100%"
                          url={shareVideo}
                          className="react-player"
                        />
                      )}
                    </PreviewVideo>
                  )
                )}
              </Editor>
            </PostContent>
            <ShareButtons>
              <AttachButtons>
                <AttachButton onClick={() => switchShareFileType("image")}>
                  <img src="/images/share-image.png" alt="" />
                </AttachButton>
                <AttachButton onClick={() => switchShareFileType("media")}>
                  <img src="/images/share-video.png" alt="" />
                </AttachButton>
                <AttachButton>
                  <img src="/images/share-document.png" alt="" />
                </AttachButton>
              </AttachButtons>
              <PostButton
                disabled={
                  !shareImage && !postContentText && !shareVideo ? true : false
                }
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareButtons>
          </Content>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.5s;
`;
const Content = styled.div`
  width: 100%;

  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
  overflow-y: scroll;
  height: fit-content;
  overflow-x: hidden;
`;
const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    border: solid 2px red;
    border-radius: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: lightgrey; */
    height: 40px;
    width: 40px;
    min-height: auto;
    border: none;
    color: rgba(0, 0, 0, 0.15);
    svg,
    img {
      pointer-events: none;
      height: 70%;
      width: 70%;
      border: 0;
    }
  }
  & > div:hover {
    cursor: pointer;
    background-color: light-grey;
  }
`;
const CloseButton = styled.div`
  /* border: solid 2px red; */
  height: 2rem;
  width: 2rem;
  /* width: 10%; */
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: lightgrey;
  }
  & > img {
    height: 70%;
    width: 70%;
  }
`;
const PostContent = styled.div`
  height: 65%;
  width: 100%;
  & > * {
    margin: 0.75rem 0.75rem;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0.5rem;
  }
  & > img {
    height: 10%;
    width: 10%;
    border-radius: 5rem;
  }
`;
const ShareButtons = styled.div`
  /* border: solid 2px black; */
  width: 99%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const AttachButtons = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin-left: 0.5rem;
  padding: 0.5rem;
`;
const AttachButton = styled.div`
  /* border: solid 2px red; */
  border-radius: 5rem;
  height: 100%;
  width: 10%;
  margin-right: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: lightgrey;
  }
  & > img {
    height: 50%;
    width: 50%;
    object-fit: contain;
  }
`;
const PostButton = styled.div`
  /* border: solid 2px red; */
  width: 5rem;
  height: 2.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: medium;

  background: ${(props) => (props.disabled ? "#545252cc" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,0,0.4)" : "White")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }

  /* text-align: center; */
  border-radius: 5rem;
`;
const Editor = styled.div`
  width: 80%;
  height: 800%;
  & > textarea {
    width: 95%;
    height: 50%;
    border: none;
    outline: none;
    resize: none;
    font-size: larger;
    line-height: 26pt;

    /* line-height: 0.5px; */
    input {
    }
  }
`;
const ImageShare = styled.div`
  /* border: solid 2px black; */
  display: flex;
  flex-direction: column;
  & > img {
    align-items: center;
  }
`;

const PreviewImage = styled.div`
  & > img {
    margin: 0.5rem auto;
    height: 100%;
    /* background-color: black; */
    width: 90%;
    margin-top: 0.5rem;
    margin-left: auto;
    /* margin-right: auto; */
    object-fit: contain;
    opacity: 2;
  }
`;
const PreviewVideo = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
