import React,{useEffect,useState} from 'react'
import appwriteService from '../appwrite/config'
import {Container, PostCard} from '../components';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state)=>state.auth.status)
    
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
    
    if(!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <h1 className='text-3xl text-center text-gray-500 font-bold'>
                            Login to read posts...
                        </h1>
                    </div>
                </Container>
            </div>
        )
    }
    if(posts.length === 0 ){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <h1 className='text-3xl text-center text-gray-500 font-bold'>
                            Loading recent posts...
                        </h1>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <h2 className='text-3xl p-4 font-bold text-teal-900'>Recent Posts</h2>
                <div className="flex flex-wrap box-border gap-6">
                    {posts.map((post)=>
                        <div key={post.$id} className="p-4 md:w-5/12 lg:w-3/12 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-lg group hover:scale-105 duration-200 shadow-teal-600 shadow-lg">
                            <PostCard {...post} />
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Home