import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { useNavigate, useLocation , useParams, useSearchParams } from "react-router-dom";
import { useAuthCont } from '../../context/AuthContext';
import styles from "./CarCard.module.css";
import  "./card.css";
import axios from 'axios';

const API_URL = "http://localhost:9000";

const FishCard = ({id, src, name, title, region, info, onCloseModal, dispatchCards}) =>{

    const [searchParams, setSearchParams] = useSearchParams();
    const carIdQueryParam = searchParams.get("id");
    const [isShowing, setIsShowing] = useState(carIdQueryParam === id.toString());
    const [likes, setLikes] = useState(0);
    const { isAuth } = useAuthCont();
    const { id: queryId } = useParams();
    const fishIdQueryParam = searchParams.get("id");
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.includes(id));
      }, [id, fishIdQueryParam, queryId]);
    
      const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorite) {
          const updatedFavorites = favorites.filter((favId) => favId !== id);
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
          favorites.push(id);
          localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
      };
      const handleDelete = async () => {
        
        try {
          setLoading(true);
          await axios.delete(`${API_URL}/fishes/${id}`);
          dispatchCards({ type: "REMOVE_CARD", payload: id });
          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
      };
      const navigate = useNavigate();
    


    const closeModal = () => {
        setIsShowing(false);
        onCloseModal();
        setSearchParams({});
      };
    const showCard = ()=>{
        setIsShowing(true);
        setSearchParams({ id });
    }
    const handleLikesClick = ()=>{
            setLikes(likes+1);
        //  setLikes((likes) => likes+1);     use callback for asynchronous   
    }
    const handleDislikesClick = ()=>{
        
        if(likes>0){
            setLikes(likes-1);
        }
    }
    
    return(
        <>
    
        {(location.pathname.includes('/favorites') && !isFavorite) || <div className={styles.card}  >
            <button className="" onClick={(e) => {e.stopPropagation();toggleFavorite();}}>{isFavorite ? '❤' : '🤍'}</button>
            <img src={src}  />
            <div className="container">
                <h3>{name}</h3>
                <p className="right">{region}</p>
                <h4 className="title">{title}</h4>
                
            </div>
            <div className="card-footer">
                <button className="likebtn" onClick={()=>showCard()}>Details</button>

                {isAuth &&  (<button className="deletebtn" onClick={(e) => {e.stopPropagation();handleDelete();}}>Delete</button>)}

            </div>

        </div>
      } 
        { isShowing && <Modal 
                        Header={name} 
                        onClose={() => closeModal()}
                        >
            {info}
                <div class="modal-footer">
                    <div className="likes">Likes: {likes}</div>
                    <button className="likebtn" onClick={()=>handleLikesClick()}>Like</button>
                    <button className="likebtn" onClick={()=>handleDislikesClick()}>Dislike</button>
                </div>
            </Modal>}
        </>
    );

    
}
export default FishCard;