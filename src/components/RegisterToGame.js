import React, {useState} from 'react';
import styles from '../css/RegisterToGame.module.css'


const RegisterToGame = ({onFinish}) => {
    const [username, setUsername] = useState("");
    const [selection, setSelection] = useState("new");
    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = JSON.parse(localStorage.getItem(username));
        if(selection === "new"){
            if(userData){
                alert("username already in use");
            }
            else{
                userData = {
                        online: true,
                        scores: []
                }
                localStorage.setItem(username, JSON.stringify(userData));
                onFinish(username);
            }
        }
        else{
            if(!userData){
                alert("username does not exist");
            }
            else{
                userData.online = true;
                localStorage.setItem(username, JSON.stringify(userData));
                onFinish(username);
            }

        }


    }

    return (
        <form className={styles.register} onSubmit={handleSubmit}>
          <div className={styles.radioGroup}>
            <input 
              type="radio" 
              id="veteran" 
              name="status" 
              value="veteran" 
              onChange={(e) => setSelection(e.target.value)} 
            />
            <label htmlFor="veteran">Veteran Gamer</label>
            <input 
              type="radio" 
              id="new" 
              name="status" 
              value="new" 
              onChange={(e) => setSelection(e.target.value)} 
              defaultChecked 
            />
            <label htmlFor="new">New Gamer</label>
          </div>
          <input 
            type="text" 
            id="username" 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="username" 
          />
          {username && (
            <input type="submit" id="register" value="register" />
          )}
        </form>
      );
};

export default RegisterToGame;