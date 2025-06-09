import { useState, useEffect, useContext } from "react"
import GlobalContext from "../contexts/GlobalContext"

function CommentsSection() {

    const { city } = useContext(GlobalContext)
    const [comments, setComments] = useState(null)
    const [username, setUsername] = useState("")
    const [text, setText] = useState("")

    async function fetchComments() {
        try {
            const response = await fetch(`http://localhost:3000/api/comments?city=${city}`)
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
    }, [city])

    async function handleSubmit(e) {
        e.preventDefault()

        const newComment = {
            username,
            text,
            city,
            date: new Date().toISOString().split("T")[0]
        }

        try {
            const response = await fetch("http://localhost:3000/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newComment),
            })

            if (!response.ok) throw new Error("Errore nell'invio del commento")

            fetchComments()
            setUsername("")
            setText("")
        } catch (err) {
            console.error(err)
        }
    }

    if (!comments) return null


    return (
        <section>
            <h3 className="text-center text-light font-semibold mb-2">Comments</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <button type="submit">Enter</button>
            </form>
            <ul>
                {comments.map(c => (
                    <li key={c.id} className="mb-2">
                        <div className="flex flex-col secondary-color p-2 rounded-xl shadow-md">
                            <div className="flex justify-between">
                                <h3 className="text-light font-semibold">{c.username}</h3>
                                <span className="text-lighter text-xs">{new Date(c.date).toLocaleDateString("it-IT")}</span>
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