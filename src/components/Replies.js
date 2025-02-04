import { Card, CardContent, Stack, Typography, Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import Vote from "./Vote";
import ReplyContext from '../context/reply/replyContext'
import Menu from './Menu';
import SortBar from './SortBar';

const Replies = (props) => {
    const replycontext = useContext(ReplyContext)
    const { fetchallreplies, num } = replycontext
    // let replies = []
    const [replies, setReplies] = useState()
    const fetchdata = async () => {
        const reps = await fetchallreplies(props.id);
        // console.log(reps)
        setReplies(reps)
    }
    useEffect(() => {
        fetchdata();
        // console.log(rels)

        // eslint-disable-next-line
    }, [num])
    // const [votes, setVotes] = useState(0)

    // const handleUpvote = () => {
    //     setVotes(votes + 1)
    // }

    const handleHot = async () => {
        setReplies([])
        let hot = replies
        // await hot.sort((a, b) => b.score - a.score)
        setReplies(hot)
    }
    const handleNew = async () => {
        setReplies([])

        let newPosts = replies
        await newPosts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        setReplies(newPosts)

    }

    return (
        <>
            <Stack>

                <SortBar hot={handleHot} new={handleNew} />
                {replies && replies.map((reply) => {
                    return (

                        <Card sx={{ my: 1 }} key={reply._id}>
                            <Grid container sx={{ mb: 2, p: 1 }}>
                                <Grid item>
                                    <Vote metadata={reply} type={'reply'} />
                                </Grid>
                                <Grid item sx={{ width: '92%' }}>
                                    <CardContent>
                                        <Stack >

                                            <Typography variant="overline" sx={{ mt: 1 }}>
                                                {reply.author.name}
                                            </Typography>

                                            <Typography variant="body1" sx={{ my: 1 }}>
                                                {reply.comment}
                                            </Typography>

                                            {/* <Typography variant="caption" sx={{ m: 1 }} onClick={handleUpvote}>
                                    {votes} Votes
                                </Typography> */}
                                        </Stack>

                                    </CardContent>
                                </Grid>
                                <Grid >
                                    <Menu of='reply' reportID={reply._id} />
                                </Grid>

                            </Grid>

                        </Card>

                    )
                })}

            </Stack>
        </>
    )
}

export default Replies