//Contexts
import GlobalContext from "../contexts/GlobalContext"
//Hooks
import { useState, useContext } from "react"


function CommentsSection() {

    const { city, comments, fetchComments } = useContext(GlobalContext)

    const [username, setUsername] = useState("")
    const [text, setText] = useState("")

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
            <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row items-center mb-2 gap-1 md:gap-0.25">
                <input
                    type="text"
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="md:w-1/4 bg-black py-1 px-2 text-light font-semibold secondary-color rounded-md mr-1 shadow-md"
                />
                <div className="flex w-full md:w-auto flex-row flex-1">
                    <input
                        type="text"
                        placeholder="Comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        className="bg-black py-1 px-2 text-lighter italic secondary-color rounded-l-md w-full shadow-md"
                    />
                    <button
                        type="submit"
                        className="button py-1 px-3 rounded-r-md font-semibold shadow-md text hover:bg-sky-700"
                    >
                        Enter
                    </button>
                </div>
            </form>
            <ul>
                {comments.map(c => (
                    <li key={c.id} className="mb-2">
                        <div className="flex flex-col secondary-color p-2 rounded-xl shadow-md">
                            <div className="flex justify-between">
                                <h3 className="text-light font-semibold">{c.username}</h3>
                                <span className="text-lighter text-xs">{new Date(c.date).toLocaleDateString("it-IT")}</span>
                            </div>
                            <p className="text-lighter italic">{c.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default CommentsSection