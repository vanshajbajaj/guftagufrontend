import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import axios from 'axios';
import './../css/Profile.css';
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {

    const spost={
        head: "",
        content: "",
        tags: "",
        image: ""
    }

    const [post, setPost] = useState({
        head: "",
        content: "",
        tags: "",
        image: ""
    });

    const [userPosts, setUserPosts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setPost((prevPost) => ({ ...prevPost, image: e.target.result }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {

        const { name, value } = event.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));

    }

    const submitPost = (e) => {

        e.preventDefault();
        axios.post(`/api/createpost`,
            post,
            {
                withCredentials: true,
                credentials: "include",
            })
            .then((response) => {
                console.log("User updated successfully", response.data);
                if (response.status === 200) {
                    fetchUserPosts();
                    setPost({
                        head: "",
                        content: "",
                        tags: "",
                        image: ""
                    });
                    // window.alert("Posted Successfully");
                    toast.success('Posted Successfully', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                }
            })
            .catch((error) => {
                console.error("Failed to update user", error);
            });

    }

    const fetchUserPosts = () => {
        axios
            .get('/api/getcurrposts', {
                withCredentials: true,
                credentials: "include",
            })
            .then((response) => {
                console.log('User posts fetched successfully', response.data);
                if (response.status === 200) {
                    setUserPosts(response.data.posts);
                    setIsLoading(false);
                }
                // else if (response.status === 401) {
                //     navigate('/login');
                // }
            })
            .catch((error) => {
                console.error('Failed to fetch user posts', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const deletePost = (postId) => {
        axios
            .delete(`/api/deletepost/${postId}`, {
                withCredentials: true,
                credentials: "include",
            })
            .then((response) => {
                console.log("Post deleted successfully", response.data);
                fetchUserPosts();
                // window.alert("deleted Successfully");
                toast.success('Post Deleted Successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            })
            .catch((error) => {
                console.error("Failed to delete post", error);
            });
    };

    const displayPosts = () => {

        if (isLoading) {
            return (<div className='loader'>
                <ReactLoading type="spinningBubbles" color="black" height="8%" width="8%" />
            </div>);
        }

        if (!userPosts || userPosts.length === 0) {
            return <div className='loader'>No posts found</div>;
        }

        return userPosts.map((userPost) => {
            return (
                <div className="ppostdiv" key={userPost._id}>
                    <div className="ppostcontent">
                        <div className="pcontenthead">{userPost.head} <span className='ppostuname'>@{userPost.username}</span></div>
                        <div className="pcontentcontent" onClick={()=>navigate(`/showpost/${userPost._id}`)}>{userPost.content.substring(0,150)}....</div>
                        <div className="pcontenttags">
                            <div className="tagstags">
                                {userPost.tags.map((tag) => (
                                    <div className="ptag" key={tag}>
                                        {tag}
                                    </div>
                                ))}
                            </div>
                            <div className='preactions'>
                                <div className='preact'>{userPost.likes.length} <i class="zmdi zmdi-thumb-up"></i></div>
                                <div className='preact'>{userPost.comments.length} <i class="zmdi zmdi-comments"></i></div>
                            </div>
                            <div className="pcontentdelete" onClick={() => deletePost(userPost._id)}>
                                <i className="zmdi zmdi-delete"></i>
                            </div>
                        </div>
                    </div>
                    <div className="ppostimgdiv">
                        <img className="pimg" src={userPost.image} alt="post image" />
                    </div>
                </div>
            )
        })

    }

    return (
        <>
            <div id="profilemain">

                <div id='pmleft'>

                    <div id='pallposts'>

                        <div id="pallhead">
                            YOUR POSTS
                        </div>

                        <div id="palldiv">

                            {/* <div className='ppostdiv'>

                                <div className='ppostcontent'>

                                    <div className='pcontenthead'>
                                        My First Post
                                    </div>

                                    <div className='pcontentcontent'>
                                        this is my first post and this is just some sample content of my first post. this post is great.
                                        i dont know what am i writting.
                                    </div>

                                    <div className='pcontenttags'>

                                        <div className="tagstags">

                                            <div className='ptag'>
                                                Nodejs
                                            </div>

                                            <div className='ptag'>
                                                sample
                                            </div>

                                        </div>

                                        <div className="pcontentdelete">

                                            <i class="zmdi zmdi-delete"></i>

                                        </div>

                                    </div>

                                </div>

                                <div className='ppostimgdiv'>

                                    <img className='pimg' src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg" alt="post image"></img>

                                </div>

                            </div> */}

                            {displayPosts()}

                        </div>

                    </div>

                </div>

                <div id='pmright'>

                    <form id='pmrform'>

                        <div id='pmrhead'>
                            CREATE POST
                        </div>

                        <div id='pmrinpdiv'>

                            <div id='pinphead'>

                                <div className='pinplabel'>
                                    HEADING
                                </div>
                                <div className='pinpborder'>

                                </div>
                                <div className='pinpinp'>
                                    <input className="pinptag" type="text" placeholder='Enter heading' value={post.head} name="head" onChange={handleChange} />
                                </div>


                            </div>

                            <div id='pinpcontent'>

                                <div className='pinplabel'>
                                    CONTENT
                                </div>
                                <div className='pinpborder'>

                                </div>
                                <div className='pinpinp'>
                                    <textarea className="pinptag" type="text" placeholder='Enter content' value={post.content} name="content" onChange={handleChange} />
                                </div>

                            </div>

                            <div id='pinptags'>

                                <div className='pinplabel'>
                                    TAGS
                                </div>
                                <div className='pinpborder'>

                                </div>
                                <div className='pinpinp'>
                                    <input className="pinptag" type="text" placeholder='Enter tags' value={post.tags} name="tags" onChange={handleChange} />
                                </div>

                            </div>

                            <div id='pinpimg'>

                                <div className='pinplabel'>
                                    IMAGE
                                </div>
                                <div className='pinpborder'>

                                </div>
                                <div className='pinpinp'>


                                    <div className='pinpinp'>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                        />

                                    </div>

                                </div>

                            </div>

                            <div id="psubmit">
                                <button id='psbt' onClick={submitPost}>Submit</button>
                            </div>

                        </div>
                    </form>

                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Profile