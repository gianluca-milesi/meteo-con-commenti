import WeatherCard from "../components/WeatherCard.jsx"
import CommentsSection from "../components/CommentsSection.jsx"


function HomePage() {
    return (
        <main className="flex justify-center items-center h-screen primary-color">
            <div className="flex flex-col max-w-[80vw] h-[80vh] rounded-xl shadow-xl">
                <div className="flex-1 card-light rounded-tl-xl rounded-tr-xl p-4">
                    <WeatherCard />
                </div>
                <div className="flex-2 overflow-auto card-lighter rounded-bl-xl rounded-br-xl p-4">
                    <CommentsSection />
                </div>
            </div>
        </main>
    )
}

export default HomePage