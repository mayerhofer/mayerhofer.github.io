import React, { useEffect } from "react";
import EntityAPI from "../servers/entity";

const BlogPage = () => {
    const [posts, setPosts] = React.useState([]);

    useEffect(() => {
        const postApi = new EntityAPI('post');
        postApi.get().then(fetchedPosts => {
            setPosts(fetchedPosts);
        });
    }, []);

    return (
        <div className="page-body div--scrollable">
            <article className="introduction">
                <p>Welcome to my blog, where I give daily updates about my projects, studies and leisure activities.</p>
            </article>
            <div className="post-container" id="postContainer">
                {posts.map(post => (
                    <article key={post._id} className="post">
                        <div className="post-details">
                            <p className="post-title">{post.title}</p>
                            <p className="post-date">{post.date}</p>
                        </div>
                            <p className="post-author">{post.author}</p>
                            <p className="post-text">{post.text}</p>
                            <img src={post.src} alt={post.alt} />
                    </article>
                ))}
            </div>
        </div>
    );
}

export default BlogPage;
