//Api
import { fetchComments, postComment } from "../api/comments.js"
//Hooks
import { useState, useEffect } from "react"


export function useComments(city) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function getComments() {
        setLoading(true)
        setError(null)
        try {
            const data = await fetchComments(city)
            setComments(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function addComment(newComment) {
        setLoading(true)
        setError(null)
        try {
            await postComment(newComment)
            const updated = await fetchComments(city)
            setComments(updated)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getComments()
    }, [city])


    return { comments, loading, error, addComment }
}