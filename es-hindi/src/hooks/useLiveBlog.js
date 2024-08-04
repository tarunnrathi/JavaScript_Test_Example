import { useState, useEffect, useRef } from "react";
import { getLiveBlog } from "api/individual/Article";

const useLiveBlog = (postsData, id, isLiveNow) => {
  const [posts, setPosts] = useState(postsData?.posts);
  const [totoalPosts, setTotalPosts] = useState(postsData?.total)
  const [load, setLoad] = useState(true);
  const [latestPosts, setlatestPosts] = useState([]);
  const [lp, setLp] = useState([]);
  const [latestCount, setLatestCount] = useState(0);
  const [prevPage, setPrevPage] = useState(postsData?.posts[postsData?.posts.length - 1]?.created_at);
  const [nextPage, setNextPage] = useState(postsData?.posts[0]?.created_at);
  const [checked, setChecked] = useState(true);
  // const { publicRuntimeConfig } = getConfig();

  const loadPrev = async (date) => {
    if(date){
      getLiveBlog({
        count: 10,
        storyId: id,
        date: date,
        dir: "prev",
        fields:
          "story_id,id,is_highlight,is_sticky,status,created_by,updated_by,created_at,updated_at,blog_title,blog_content,date_timestamp",
      }, true).then(res=>{      
        if(!res?.posts?.length) {
          return setLoad(false);
        }
        setTotalPosts(res?.total)
        setPrevPage((_) => res.posts[res.posts.length - 1].created_at);
        setPosts((posts) => [...posts, ...res.posts]);
        setLoad((_) => res.next);
      }).catch(error=>{
        console.log(error);
      })

    }
    return setLoad(false);
    
  };

  const loadPosts = async () => {    
    nextPage?
    getLiveBlog({
      count: 10,
      storyId: id,
      date: nextPage,
      dir: "next",
      fields:
        "story_id,id,is_highlight,is_sticky,status,created_by,updated_by,created_at,updated_at,blog_title,blog_content,date_timestamp",
    },true).then(res=>{      
      if(res && res.posts && res.posts.length) {
        setNextPage(res.posts[0].created_at);
        setLatestCount((p) => p + res.posts.length);
        setlatestPosts((p) => [...res.posts, ...p]);
      }
    }).catch(error=>{
      console.log(error);
    })
    :getLiveBlog({
      count: 10,
      storyId: id,
      date: nextPage,
      dir: "prev",
      fields:
        "story_id,id,is_highlight,is_sticky,status,created_by,updated_by,created_at,updated_at,blog_title,blog_content,date_timestamp",
    },true).then(res=>{      
      if(res && res.posts && res.posts.length) {
        setNextPage(res.posts[0].created_at);
        setLatestCount((p) => p + res.posts.length);
        setlatestPosts((p) => [...res.posts, ...p]);
      }
    }).catch(error=>{
      console.log(error);
    })
  };

  const updatePosts = () => {    
    setLatestCount(0);
    setLp((posts) => [...(latestPosts||[]), ...(posts||[])]);
    setlatestPosts([]);
  };

  const toggle = () => {
    setChecked((p) => !p);
  };

  // Auto loadposts
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = () => loadPosts();
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id;

    if (checked && !id && isLiveNow) {
      id = setInterval(tick, 5000);
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [checked]);

  return [posts, load, latestCount, updatePosts, loadPrev, lp, checked, toggle, totoalPosts];
};

export default useLiveBlog;
