import WeatherCard from "../components/WeatherCard.jsx"
import CommentsSection from "../components/CommentsSection.jsx"


function HomePage() {
    return (
        <main className="flex justify-center items-center h-screen primary-color">
            <div className="flex flex-col w-[60vw] h-[80vh] rounded-xl shadow-xl">
                <div className="overflow-x-auto flex flex-2 justify-center items-center card-light rounded-tl-xl rounded-tr-xl p-4">
                    <WeatherCard />
                </div>
                <div className="overflow-auto flex-3 card-lighter text-sm rounded-bl-xl rounded-br-xl p-4">
                    <CommentsSection />
                </div>
            </div>
        </main>
    )
}

export default HomePage