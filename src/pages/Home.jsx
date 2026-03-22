import HeroImg from '../assets/hero-img.png'
import CardImg from '../assets/card-img.png'
import API from '../api/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
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
    } finally{
      setLoadingNotes(false);
    }
  }

  const handleOpen = (url) => {
    window.open(url, '_blank');
  }

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="home-container h-auto overflow-hidden bg-(--tertiary) w-full">

      {/* Hero Section */}

      <section className="md:h-[86vh] h-auto w-full flex flex-col-reverse md:flex-row md:items-center md:justify-between md:px-20 px-5 py-10 overflow-hidden">
        <div className="flex flex-col gap-5 text-center md:w-1/2 w-full ">
          <h1 className="md:text-4xl text-2xl text-(--text) ">
            🎓 Find Notes. Study Smart.
          </h1>
          <h3 className="md:text-3xl text-2xl text-(--text) pb-10 shadow-xl/50 shadow-white">
            Your campus knowledge hub.
          </h3>
        </div>
        <div className='flex items-center justify-center md:w-1/2 '>
          <img src={HeroImg} alt="" className="md:h-125 md:w-125 object-cover" />
        </div>
      </section>

      {/* Notes Section */}
      {loadingNotes ? ( <Loader />) : (
      <section className='w-full overflow-hidden h-auto border-t-2 border-(--border) flex flex-col text-center py-15 gap-15 mb-20 border-b-2 '>
        <div className="heading w-full flex items-center justify-center">
          <h1 className='text-4xl text-(--text) shadow-md/50 shadow-yellow-300 w-max p-3'>
            📚 Latest Notes
          </h1>
        </div>

        {/* Cards */}
        <div className="cards-container flex flex-col md:flex-row items-center gap-7 justify-evenly px-5 w-full overflow-hidden py-10">
          { (notes.length > 0) ? notes.slice(0, 3).map((note) => (
            <div key={note._id} className="card rounded-lg md:w-[30%] w-[70%] h-auto bg-(--text) flex flex-col items-center justify-between pt-5 relative hover:shadow-xl/70 shadow-white transition-all duration-400">
              <img src={CardImg} alt="" className='h-30 w-60 object-cover' />
              <div className='flex flex-col gap-1 mb-10'>
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
          )) : (
            <p className="text-(--text) text-xl">No notes available.</p>
          )}
        </div>

        <div>
          <button className='px-5 py-3 bg-(--btn-secondary) border-(--btn-secondary) rounded-lg shadow-xl/40 shadow-white hover:bg-(--btn-primary) active:scale-75 transition-all duration-300' onClick={() => navigate('/notes')}>
            <h3 className='text-2xl font-semibold text-(--text)'>
              View All Notes
            </h3>
          </button>
        </div>
      </section>
      )}


      {/* Feature Section  */}
      <section className='w-full h-auto overflow-hidden flex flex-col py-15 gap-15'>
        <div className="heading w-full flex items-center justify-center">
          <h1 className='text-4xl text-(--text) shadow-md/50 shadow-red-300 w-max p-3'>
            🚀 Why CampusLink?
          </h1>
        </div>

        <div className='feature-container flex flex-col md:flex-row flex-wrap md:px-40 px-10 justify-center items-center gap-10'>
          <div className='bg-(--btn-secondary) md:h-40 md:w-[40%] py-10 rounded-lg flex flex-col justify-center items-center gap-5 px-7  hover:shadow-xl/50 shadow-red-500 transition-all duration-300'>
            <h2 className='text-2xl text-(--text) font-semibold self-start'>
              📥 Easy Downloads
            </h2>
            <h2 className='text-2xl text-(--text) self-end'>
              - Get notes instantly
            </h2>
          </div>

          <div className='bg-(--btn-secondary) md:h-40 md:w-[40%] py-10 rounded-lg flex flex-col justify-center items-center gap-5 px-7  hover:shadow-xl/50 shadow-red-500 transition-all duration-300'>
            <h2 className='text-2xl text-(--text) font-semibold self-start'>
              📥 Easy Downloads
            </h2>
            <h2 className='text-2xl text-(--text) self-end'>
              - Get notes instantly
            </h2>
          </div>

          <div className='bg-(--btn-secondary) md:h-40 md:w-[40%] py-10 rounded-lg flex flex-col justify-center items-center gap-5 px-7  hover:shadow-xl/50 shadow-red-500 transition-all duration-300'>
            <h2 className='text-2xl text-(--text) font-semibold self-start'>
              📥 Easy Downloads
            </h2>
            <h2 className='text-2xl text-(--text) self-end'>
              - Get notes instantly
            </h2>
          </div>

          <div className='bg-(--btn-secondary) md:h-40 md:w-[40%] py-10 rounded-lg flex flex-col justify-center items-center gap-5 px-7  hover:shadow-xl/50 shadow-red-500 transition-all duration-300'>
            <h2 className='text-2xl text-(--text) font-semibold self-start'>
              📥 Easy Downloads
            </h2>
            <h2 className='text-2xl text-(--text) self-end'>
              - Get notes instantly
            </h2>
          </div>
        </div>
      </section>

      {/* CTA Section  */}
      <section className='h-auto w-full overflow-hidden flex bg-(--border) items-center justify-center py-10'>
        <div className='md:w-[70%] flex items-center justify-between md:px-20 py-10 flex-col gap-10'>
          <h1 className='md:text-3xl text-2xl text-(--text) font-semibold self-start'>
            Ready to boost your studies? 📈
          </h1>
          <div className='flex gap-10 self-end'>
            <button className='px-5 py-3 bg-(--btn-secondary) border-(--btn-secondary) rounded-lg shadow-xl/40 shadow-white hover:bg-(--btn-primary) active:scale-75 transition-all duration-300' onClick={() => navigate('/signup')}>
              <h3 className='text-2xl font-semibold text-(--text)' >
                Signup Now
              </h3>
            </button>
            <button className='px-5 py-3 bg-(--btn-secondary) border-(--btn-secondary) rounded-lg shadow-xl/40 shadow-white hover:bg-(--btn-primary) active:scale-75 transition-all duration-300' onClick={() => navigate('/notes')}>
              <h3 className='text-2xl font-semibold text-(--text)'>
                Explore Notes
              </h3>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}