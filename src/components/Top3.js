import React, {useState} from "react";
import styles from '../css/Top3.module.css'

const Top3 = () => {
    const avg = list => parseFloat((list.reduce((a, b) => a + b, 0) / list.length).toFixed(3));
    let gamersData = [];
    for (let i = 0; i < localStorage.length; i++) {
       let data = localStorage.getItem(localStorage.key(i));
       try{
        data = JSON.parse(data);
        if(data?.scores?.length > 0){
            gamersData = [...gamersData,
                 {gamer: localStorage.key(i), gamesNum: data.scores.length, scores: data.scores, scoresAvg: avg(data.scores)}]
           }
      }
      catch(err){
        continue;
      }
    }
    gamersData.sort((a, b) => a.scoresAvg - b.scoresAvg);
    




    return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Gamer</th>
              <th>Number of Games</th>
              <th>Scores List</th>
              <th>Scores Average</th>
            </tr>
          </thead>
          <tbody>
            {gamersData.slice(0, 3).map((data, i) => (
              <tr key={i}>
                <td>{data.gamer}</td>
                <td>{data.gamesNum}</td>
                <td>{data.scores.join(', ')}</td>
                <td>{data.scoresAvg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );

}

export default Top3;