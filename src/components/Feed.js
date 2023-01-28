import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import { getArticlesAPI } from "../actions";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

const Feed = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <Main>
      <CreateNewPost>
        <Icon>
          <img src="/images/user.svg" alt="" />
          <button onClick={handleClick} disabled={props.loading ? true : false}>
            Start a post
          </button>
        </Icon>
        <NewPostButtons>
          <button>
            <img src="/images/add-post-photo.png" alt="" /> Photo
          </button>
          <button>
            <img src="/images/add-post-video.png" alt="" /> Video
          </button>
          <button>
            <img src="/images/add-post-event.png" alt="" /> Event
          </button>
          <button>
            <img src="/images/add-post-article.png" alt="" /> Article
          </button>
        </NewPostButtons>
      </CreateNewPost>
      <Loading>
        {props.loading && <img src="./images/loading.png" alt="" />}
      </Loading>

      {props.articles.length > "0" &&
        props.articles.map((article, key) => (
          <FeedPost key={key}>
            <PostHeader>
              <img src={article.actor.image} alt="" />
              <PosterInfo>
                <h6>{article.actor.title}</h6>
                <p>{article.actor.description}</p>
                <p>{article.actor.date.toDate().toLocaleDateString()}</p>
              </PosterInfo>
            </PostHeader>
            <PostDesc>{article.description}</PostDesc>
            <PostImage>
              <a href="*">
                {!article.shareImg && article.video ? (
                  <ReactPlayer width={"100%"} url={article.video} />
                ) : (
                  article.sharedImg && <img src={article.sharedImg} alt="" />
                )}
              </a>
            </PostImage>
            <PostImpressions>
              <PostLikes>
                {" "}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkZVlNtvALrCDCbyVUCZvo2lIFNPaf7_vfXwBdQZ5o7Q&s"
                  alt=""
                />
                18 Likes
              </PostLikes>
              <PostComments>10 comments</PostComments>
            </PostImpressions>
            <PostButtons>
              <button>
                <img src="/images/post-like.png" alt="" />
                <span>Like</span>
              </button>
              <button>
                <img src="/images/post-comment.png" alt="" />

                <span>Comment</span>
              </button>
              <button>
                <img src="/images/post-repost.png" alt="" />

                <span>Repost</span>
              </button>
              <button>
                <img src="/images/post-share.jpeg" alt="" />
                <span>Send</span>
              </button>
            </PostButtons>
          </FeedPost>
        ))}
      <PostModal showModal={showModal} handleClick={handleClick} />
    </Main>
  );
};
const Main = styled.div`
  overflow: visible;
  height: 90vh;
  width: 35%;
  @media (max-width: 820px) {
    width: 98%;
  }
`;
const CreateNewPost = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: solid 2px lightgrey;
  height: 20%;
  @media (max-width: 820px) {
    display: none;
  }
`;
const Icon = styled.div`
  display: flex;

  & > * {
    margin: 0.5rem 0.5rem;
  }
  & > *:hover {
    cursor: pointer;
  }
  & > img {
    height: 3rem;
    border-radius: 5rem;
  }
  & > button {
    width: 80%;
    border-radius: 25px;
    background-color: white;
    text-align: start;
    font-weight: 600;
    color: grey;
    border: solid 2px lightgrey;
  }
`;

const NewPostButtons = styled.div`
  margin-top: 0.5rem;
  height: 30%;
  display: flex;
  justify-content: space-evenly;

  & > button {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 500;
    background-color: white;
    border: none;
    color: grey;
    border-radius: 5px;
  }

  & > button:hover {
    background-color: #e3e0e0;
    cursor: pointer;
  }
  & > button > img {
    height: 25px;
  }
`;
const FeedPost = styled.div`
  margin: 2rem 0rem;
  border: solid 2px lightgrey;
  border-radius: 0.5rem;
  height: 50vh;
  width: 100%;
  background-color: white;
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 1rem;
  & > img {
    height: 3rem;
    width: 3rem;
    border-radius: 5rem;
  }
`;
const PosterInfo = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  & > h6 {
    font-size: smaller;
  }
  & > p {
    font-size: xx-small;
    color: grey;
  }
`;
const PostDesc = styled.div`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  font-size: smaller;
  width: 100%;

  height: fit-content;
`;
const PostImage = styled.div`
  /* position: relative; */
  margin-top: 0.5rem;
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & > a > img {
    /* position: absolute; */
    /* bottom: 0; */
    /* left: 0; */
    width: 100%;
    height: 100%;
  }
`;
const PostButtons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  justify-content: space-evenly;
  height: 10%;
  width: 100%;
  margin: 0.5rem 0rem;
  & > * {
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 500;
    background-color: white;
    border: none;
    color: grey;
    border-radius: 5px;
  }

  & > button:hover {
    background-color: #e3e0e0;
    cursor: pointer;
    & > img {
      mix-blend-mode: color-burn;
    }
  }
  & > button > img {
    height: 2rem;
    /* width: 40%; */
  }

  @media (max-width: 768px) {
    & > button > img {
      height: 80%;
      width: 30%;
    }
  }
`;
const PostImpressions = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  font-size: smaller;
  justify-content: space-between;
  /* margin: 0rem 0.5rem; */
`;
const PostLikes = styled.div`
  color: black;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  & > img {
    height: 1rem;
  }
  /* border: solid 2px black; */
`;
const PostComments = styled.div`
  color: black;
  margin-right: 0.5rem;
  /* border: solid 2px black; */
`;
const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
