import React from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import ReactLoading from 'react-loading';
import "./../css/Home.css";

const Home = () => {

    const [allPosts, setAllPosts] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const [tags, setTags] = useState([]);

    const { isLoggedIn } = useContext(AuthContext);

    const [showPopup, setShowPopup] = useState(true);

    const navigate = useNavigate();

    const fetchAllPosts = () => {
        axios
            .get('/api/getallposts', {
            // .get('/api/getallposts', {
                withCredentials: true,
                credentials: "include",
            })
            .then((response) => {
                console.log('posts fetched successfully', response.data);
                if (response.status === 200) {
                    setAllPosts(response.data.posts);
                    extractTags(response.data.posts);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch posts', error);
                setIsLoading(false);
            });
    };

    const extractTags = (posts) => {
        const uniqueTags = [...new Set(posts.flatMap((post) => post.tags))];
        const limitedTags = uniqueTags.slice(0, 6);
        setTags(limitedTags);
        // setTags(uniqueTags);
    };

    useEffect(() => {
        fetchAllPosts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios
            .get('/api/search', { params: { keyword } })
            .then((response) => {
                setIsLoading(false);
                console.log("searched posts fetched", response.data);
                setAllPosts(response.data.results);
                displayPosts();
            })
            .catch((error) => {
                setIsLoading(false);
                console.error('Failed to perform search', error);
            });
    };

    const fetchFollowedPosts = () => {
        setIsLoading(true);
        axios
            .get('/api/posts/followed', {
                withCredentials: true,
                credentials: "include",
            })
            .then((response) => {
                console.log('posts fetched successfully', response.data);
                if (response.status === 200) {
                    setAllPosts(response.data.posts);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                if (error.response.status == 401) {
                    navigate('/login')
                }
                // console.log(error.response.status);
                console.error('Failed to fetch posts', error);
                setIsLoading(false);
            });
    };

    const displayPosts = () => {

        if (isLoading) {
            // return <div>Loading posts...</div>;
            return (<div className='loader'>
                <ReactLoading type="spinningBubbles" color="black" height="8%" width="8%" />
            </div>);
        }

        if (!allPosts || allPosts.length === 0) {
            return <div className='loader'>No posts found</div>;
        }

        return allPosts.map((userPost) => {
            return (
                <div className="hpostdiv" key={userPost._id} onClick={() => navigate(`/showpost/${userPost._id}`)}>
                    <div className="hpostcontent">
                        <div className="hcontenthead">{userPost.head} <span className='hpostuname'>@{userPost.username}</span></div>
                        <div className="hcontentcontent">{userPost.content.substring(0, 150)}...</div>
                        <div className="hcontenttags">
                            <div className="htagstags">
                                {userPost.tags.map((tag) => (
                                    <div className="htag" key={tag}>
                                        {tag}
                                    </div>
                                ))}
                            </div>
                            <div className='hreactions'>
                                <div className='hreact'>{userPost.likes.length} <i class="zmdi zmdi-thumb-up"></i></div>
                                <div className='hreact'>{userPost.comments.length} <i class="zmdi zmdi-comments"></i></div>
                            </div>
                            {/* <div className="hcontentdelete" onClick={() => deletePost(userPost._id)}>
                                <i className="zmdi zmdi-delete"></i>
                            </div> */}
                        </div>
                    </div>
                    <div className="hpostimgdiv">
                        <img className="himg" src={userPost.image} alt="post image" />
                    </div>
                </div>
            )
        })

    }

    useEffect(() => {
        displayPosts();
    }, [allPosts]);

    const handleTagClick = (e) => {

        e.preventDefault();
        setKeyword(e.target.value);
        const clickedTag = e.target.value;
        setIsLoading(true);
        axios
            .get('/api/search', { params: { keyword: clickedTag } })
            .then((response) => {
                setIsLoading(false);
                console.log("searched posts fetched", response.data);
                setAllPosts(response.data.results);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error('Failed to perform search', error);
            });

    }

    const displayTags = () => {

        if (!tags) {
            return ("No tags to display");
        }

        return tags.map((tag) => {
            return (
                <input className='htagd' value={tag} onClick={handleTagClick} readOnly />
            )
        })

    }

    const homemidRef = useRef(null);

    const navigateMid = () => {
        console.log("hello");
        homemidRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>

            <div id='homemain'>

                <div id="hometop">

                    <div id='htmid'>
                        <div id='hthead'>
                            {/* गुफ्तगू */}
                            GUFTAGU
                        </div>
                        <div id='httext'>
                            Discover the world through diverse perspectives. Embrace the power of sharing,
                            connecting, and inspiring others. Welcome to our blogging community, where every
                            story unfolds and every voice matters. Unleash your creativity, ignite conversations,
                            and make an impact. Together, let's write the future.
                        </div>
                        <div id='htbt' onClick={navigateMid}>
                            Start Reading
                        </div>
                    </div>

                </div>

                <div id="homemid" ref={homemidRef}>

                    <div id='hmleft'>

                        <div id='hallposts'>

                            <div id="hallhead">
                                ALL POSTS
                            </div>

                            <div id="halldiv">

                                {displayPosts()}

                            </div>

                        </div>

                    </div>

                    <div id='hmright'>

                        <div id='hsearchdiv'>

                            <div id='hsearchbar'>

                                <i class="zmdi zmdi-search"></i>

                                <input id='searchinp' type='text' value={keyword} placeholder='Search Posts' onChange={(e) => setKeyword(e.target.value)} />

                            </div>

                            <button id='searchbt' onClick={handleSearch}>Search</button>

                        </div>

                        <div id='htagsdiv'>

                            <div id="htaghead">
                                Suggested Tags
                            </div>

                            <div id="htagsdisp">
                                {displayTags()}
                            </div>

                        </div>

                        <div id='followtagdiv'>

                            <button id='followpostbt' onClick={fetchFollowedPosts}>Followed Users</button>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Home