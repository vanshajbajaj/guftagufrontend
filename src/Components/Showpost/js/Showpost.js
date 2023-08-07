import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./../css/Showpost.css";
import ReactLoading from 'react-loading';

const Showpost = ({ match }) => {

    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserLiked, setCurrentUserLiked] = useState(false);
    const [currentUserFollows, setCurrentUserFollows] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showLikes, setShowLikes] = useState(false);
    const [comment, setComment] = useState("");

    const navigate = useNavigate();

    const toggleComments = () => {

        setShowComments(!showComments);

    }

    const toggleLikes = () => {

        setShowLikes(!showLikes);

    }

    const fetchPost = async () => {

        axios
            .get(`/api/postdetails/${id}`, {
                withCredentials: true,
                credentials: 'include',
            })
            .then((response) => {
                console.log('User posts fetched successfully', response.data);
                if (response.status === 200) {
                    const { post, currentUserLiked, currentUserFollows } = response.data;
                    setPost(post);
                    setCurrentUserLiked(currentUserLiked);
                    setCurrentUserFollows(currentUserFollows);
                    setLikes(post.likes);
                    setComments(post.comments);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch post', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
                setIsLoading(false);
            });

    };

    const displayComments = () => {
        if (!comments || comments.length === 0) {
            return <div>No Comments</div>;
        }

        return comments.map((comm) => (
            <div className="spcomm" key={comm._id}>
                <div className="commhead">@{comm.username}</div>
                <div className="commcontent">{comm.content}</div>
            </div>
        ));
    };

    const displayLikes = () => {
        if (!likes || likes.length === 0) {
            return <div>No Likes</div>;
        }

        return likes.map((lik) => (
            <div className='spsinglelike' key={lik._id}>
                @{lik.username}
            </div>
        ));
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(
                '/api/addcomment',
                {
                    postId: id,
                    comment: comment,
                },
                {
                    withCredentials: true,
                    credentials: 'include',
                }
            );
            if (response.status === 200) {
                console.log('Comment added successfully');
                // fetchPost();
                const newComment = {
                    userId: response.data.userId,
                    username: response.data.username,
                    content: comment,
                };
                setComments((prevComments) => [...prevComments, newComment]);
                setComment("");
            }
        } catch (error) {
            console.error('Failed to add comment', error);
        }
    };

    const handleLikePost = () => {
        axios
            .post('/api/likepost', { id })
            .then((response) => {
                console.log('Post liked successfully');
                setCurrentUserLiked(true);
                setLikes((prevLikes) => [...prevLikes, response.data.likedPost]);
            })
            .catch((error) => {
                console.error('Failed to like post', error);
            });
    };

    const followUser = async () => {
        try {
            const response = await axios.post(
                `/api/follow/${post.userId}`,
                {},
                {
                    withCredentials: true,
                    credentials: 'include',
                }
            );

            console.log('User followed successfully', response.data);
            setCurrentUserFollows(true);
        } catch (error) {
            console.error('Failed to follow user', error);
        }
    };

    useEffect(
        () => {
            fetchPost();
        }
        , [id]
    );

    if (isLoading) {
        return <div>Loading post...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <>

            <div id='showpostmain'>

                <div id='showpostmid'>

                    <div id='spimgdiv'>

                        <img src={post.image} id='spimg' alt='post image'></img>

                    </div>

                    <div id='sphead'>

                        {post.head}

                    </div>

                    <div id='spreact'>

                        <div id='spactions'>

                            <div className='spactgrp'>

                                <span className='spactgrpno' onClick={toggleLikes}>
                                    {likes.length}
                                </span>

                                {currentUserLiked ? <i class="spliked zmdi zmdi-thumb-up"></i> : <i class="spact zmdi zmdi-thumb-up" onClick={handleLikePost}></i>}

                            </div>

                            <div className='spactgrp'>

                                <span className='spactgrpno' onClick={toggleComments}>
                                    {comments.length}
                                </span>

                                <i class="spact zmdi zmdi-comment-text-alt" onClick={toggleComments}></i>

                            </div>

                        </div>

                        <div id='spfollow'>

                            <span className='spfollowun'>
                                @{post.username}
                            </span>

                            {currentUserFollows ?
                                // <i class="spfollowing zmdi zmdi-check-circle-u"></i>
                                <button className='spfollowbt' disabled>
                                    Following <i class="zmdi zmdi-check"></i>
                                </button>
                                :
                                <button className='spfollowbt spfollowbth' onClick={followUser}>
                                    Follow
                                </button>
                            }

                        </div>

                    </div>

                    <div id='spcontent'>

                        {post.content}

                    </div>

                </div>

                {showComments &&

                    <div id='spcomments'>

                        <div id='spclosecomments'>

                            <span className='spopenhead' style={{ 'margin-left': '40%' }}>Comments</span>
                            <i class="spclose zmdi zmdi-close" onClick={() => setShowComments(false)}></i>

                        </div>

                        <div id='spallcomments'>

                            {displayComments()}

                        </div>

                        <div id='spmakecomment'>

                            <div id='spsearchbar'>

                                <i className="zmdi zmdi-comment-alt-text"></i>

                                <input id='spsearchinp' type='text' value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder='Share Your Thoughts' />

                            </div>

                            <i class="mkcomm zmdi zmdi-mail-send" onClick={handleCommentSubmit}></i>

                        </div>

                    </div>

                }

                {showLikes &&

                    <div id='splikes'>

                        <div id='spcloselikes'>

                            <span className='spopenhead'>Likes</span>
                            <i class="spclose zmdi zmdi-close" onClick={() => setShowLikes(false)}></i>

                        </div>

                        <div id='spalllikes'>

                            {displayLikes()}
                            {/* <div className='spsinglelike'>
                            @vanshajbajaj
                        </div> */}

                        </div>

                    </div>

                }

            </div>

        </>
    )
}

export default Showpost