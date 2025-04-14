
import { Link } from "react-router-dom";

interface GenreCardProps {
  id: string;
  name: string;
  color: string;
}

const GenreCard = ({ id, name, color }: GenreCardProps) => {
  return (
    <Link 
      to={`/genres/${id}`}
      className={`${color} rounded-lg p-6 transition-transform hover:scale-105 hover:shadow-lg`}
    >
      <h3 className="text-white font-bold text-xl">{name}</h3>
    </Link>
  );
};

export default GenreCard;
