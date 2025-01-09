import styles from '../styles/Home.module.css'
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import Image from "next/image";

export default function Blog ( {blogs, blogID} ) {
    const blogPost = blogs.find(blog => blog.id === blogID);

    if (!blogPost) {
        return <div/>;
    }

    return (
        <>
            <a href={blogPost.link} target="_blank" rel="noreferrer" className={styles.blogContainerOuter} style={{ position: 'relative', overflow: 'hidden' }}>
                <div className={styles.blogContainer}>
                    <p className={styles.chatTitle}>Editorials & Interviews</p>
                    <hr className={styles.horizontalRuleLight}/>
                    <div className={styles.blogPost}>
                        <h1 className={styles.blogPostTitle}>{blogPost.title}</h1>
                        <div className={styles.richTextBlog}>
                            {blogPost.blogContent ? documentToReactComponents(blogPost.blogContent.json) : null}
                        </div>
                    </div>
                    <div className={styles.readMoreButton}>
                        <span style={{ fontSize: '1.1rem' }}>Read More</span>
                    </div>
                </div>
                <div className={styles.blogContainerBackgroundOuter} style={{ pointerEvents: 'none' }}>
                    <Image 
                        className={styles.blogContainerBackground}
                        fill={"true"}
                        src={blogPost.coverimage.url}
                        alt="Blog Post Photo"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"        
                    />
                    <div className={styles.gradientOverlay}></div>
                </div>
            </a>
        </>
    )
}
