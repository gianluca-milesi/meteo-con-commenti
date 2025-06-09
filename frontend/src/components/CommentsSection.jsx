import { useState, useEffect } from "react"


function CommentsSection() {

    const [comments, setComments] = useState(null)

    async function fetchComments() {
        try {
            const response = await fetch(`http://localhost:3000/api/comments`)
            if (!response.ok) {
                throw new Error("Errore nel recupero dei commenti")
            }
            const data = await response.json()
            setComments(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    if (!comments) return null


    return (
        <section>
            <h3 className="text-center text-light font-semibold mb-2">Comments</h3>
            <ul>
                {comments.map(c => (
                    <li key={c.id}>
                        <div className="flex flex-col secondary-color p-2 rounded-xl shadow-md">
                            <div className="flex justify-between">
                                <h3 className="text-light font-semibold">{c.username}</h3>
                                <span className="text-lighter text-xs">{c.date}</span>
                            </div>
                            <p className="italic">{c.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default CommentsSection