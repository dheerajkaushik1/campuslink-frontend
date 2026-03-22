import { useEffect, useState } from "react";
import API from "../api/api";
import CardImg from '../assets/card-img.png';
import Loader from "../components/Loader";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [query, setQuery] = useState("");
    const [loadingNotes, setLoadingNotes] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoadingNotes(true);
            const res = await API.get('/notes/all');
            setNotes(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingNotes(false);
        }
    }

    const handleOpen = (url) => {
        window.open(url, '_blank');
    }

    const handleDownload = (url) => {
        window.open(url, "_blank");
    };

    const handleSearch = async (query) => {
        try {
            setLoadingSearch(true);
            const res = await API.get(`/notes/search?query=${query}`);
            setNotes(res.data);
            setQuery("");
        } catch (err) {
            console.log(err);
        }finally {
            setLoadingSearch(false);
        }
    }

    if (loadingNotes || loadingSearch) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen w-full bg-(--primary) flex md:justify-center items-center flex-col gap-10 py-10">
            <h1 className="text-4xl text-(--text) font-bold">
                Notes Page
            </h1>

            <div className="search-bar w-full flex items-start justify-center gap-5 ">
                <input type="text" placeholder="Search notes..." className="border border-white bg-transparent text-white placeholder:text-white p-3 rounded-2xl shadow-xl/50 shadow-white transition-all duration-400 mb-2 md:w-2/5" onChange={(e) => setQuery(e.target.value)} />
                <button onClick={() => handleSearch(query)} className="ml-2 py-3 px-5 bg-(--btn-primary) hover:bg-green-900 text-(--text) font-semibold transition-all duration-300 rounded-lg active:scale-75 hover:shadow-xl/50 shadow-white">
                    Search
                </button>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap gap-7 justify-center px-5 w-full overflow-hidden py-10 items-center">
                {(notes.length <= 0) ? (
                    <p className="text-(--text)">No notes available.</p>
                ) : (
                    notes.map((note) => (
                        <div key={note._id} className="card rounded-lg md:w-[30%] w-[70%] h-auto bg-(--text) flex flex-col items-center justify-between pt-5 relative hover:shadow-xl/70 shadow-white transition-all duration-400">
                            <img src={CardImg} alt="" className='h-30 w-60 object-cover' />
                            <div className='flex flex-col gap-1 pb-10'>
                                <h2 className='text-2xl mt-5 self-start font-semibold'>{note.title}</h2>
                                <h3 className='self-start'>{note.subject}</h3>
                                <h3 className='self-start'>Last Updated On - {new Date(note.updatedAt).toDateString()}</h3>
                                <h3 className='self-start'>{note.description}</h3>
                                <h3 className='self-start font-semibold'>Provided By - {note.uploadedBy}</h3>
                            </div>
                            <div className="flex gap-2 w-full ">
                                <button
                                    onClick={() => handleOpen(note.previewUrl)}
                                    className="w-1/2 h-15 bg-blue-600 hover:bg-blue-800 text-white font-semibold transition-all duration-300 rounded-tr-lg rounded-bl-lg active:scale-75"
                                >
                                    Open
                                </button>

                                <button
                                    onClick={() => handleDownload(note.downloadUrl)}
                                    className="w-1/2 h-15 bg-(--btn-primary) hover:bg-green-900 text-(--text) font-semibold transition-all duration-300 rounded-br-lg rounded-tl-lg active:scale-75"
                                >
                                    Download
                                </button>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )

}