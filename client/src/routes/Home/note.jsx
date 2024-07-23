import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function UpdateNote() {
  const { id } = useParams();

  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }

        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);

        setIsLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
      } else {
        console.log('Failed to submit data.');
      }

      //clear the form fields or redirect after successful submisson
      /*
      setTitle('');
      setDescription('');
      */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/" className="back-button">
        ⬅️Back
      </Link>

      <form onSubmit={updateNote}>
        <div className="single-note">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="title"
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="4"
              cols="50"
              className="description"
            ></textarea>
          </div>
        </div>

        <input
          type="submit"
          value={submitted ? 'Saving note...' : '💾Add note'}
          disabled={submitted}
        />

        <p className="text-center">
          {submitted && (
            <div className="success-message">Note has been updated!</div>
          )}
        </p>
      </form>
    </div>
  );
}

export default UpdateNote;
