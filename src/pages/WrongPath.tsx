import { useNavigate } from 'react-router-dom';

export function WrongPathPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Oopsies!, something went terribly terribly wrong 😩</h1>
      <button onClick={() => navigate('/')}>
        Click here to reload the app
      </button>
    </div>
  );
}