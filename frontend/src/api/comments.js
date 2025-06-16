export async function fetchComments(city) {
    const response = await fetch(`http://localhost:3000/api/comments?city=${city}`)
    if (!response.ok) throw new Error("Errore nel recupero dei commenti")
    return response.json()
}

export async function postComment(comment) {
    const response = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
    })
    if (!response.ok) throw new Error("Errore nell'invio del commento")
    return response.json()
}