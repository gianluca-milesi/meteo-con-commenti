//Contexts
import GlobalContext from "../contexts/GlobalContext"
//Hooks
import { useState, useContext } from "react"


function CommentsSection() {

    const { comments, commentsLoading, commentsError, addComment, city } = useContext(GlobalContext)

    //Form
    const [username, setUsername] = useState("")
    const [text, setText] = useState("")
    //Loader
    const [submitLoading, setSubmitLoading] = useState(false)
    const [submitError, setSubmitError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitLoading(true)
        setSubmitError(null)

        try {
            await addComment({ username, city, text })
            setUsername("")
            setText("")
        } catch (err) {
            setSubmitError(err.message)
        } finally {
            setSubmitLoading(false)
        }
    }

    { commentsError && <p className="text-red-500">{commentsError}</p> }
    { commentsLoading && <p className="text-light text-sm">Loading comments...</p> }
    { !comments.length && !commentsLoading && <p className="text-light italic">No comments yet.</p> }


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
                                <span className="text-lighter text-xs">
                                    {new Date(c.created_at).toLocaleString("it-IT", {
                                        dateStyle: "short",
                                        timeStyle: "short"
                                    })}
                                </span>
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