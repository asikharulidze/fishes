import { useState } from "react";
import Modal from "../Modal/Modal";
import { useSearchParams } from "react-router-dom";
import styles from "./CarCard.module.css";
import  "./card.css";
const FishCard = ({id, src, alt, name, title, region, info, onCloseModal}) =>{
    console.log(id);
    const [searchParams, setSearchParams] = useSearchParams();
  const carIdQueryParam = searchParams.get("id");
  const [isShowing, setIsShowing] = useState(carIdQueryParam === id.toString());
    const [likes, setLikes] = useState(0);


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
        <div className={styles.card}  >
            <img src={src} alt={alt} />
            <div className="container">
                <h3>{name}</h3>
                <p className="right">{region}</p>
                <h4 className="title">{title}</h4>
                
            </div>
            <div className="card-footer">
                <button className="likebtn" onClick={()=>showCard()}>Details</button>
            </div>

        </div>
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