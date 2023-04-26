import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 The puzzle is won when when all of the lights are turned off.
 
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 * - false: light off
 * - true: light on
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    //function to choose randomly true or false
    // function chooseTOrF(){
    //   let trueOrFalse=[true, false];
    //   return trueOrFalse[Math.floor(Math.random()*2)]
    // }
    
    for(let i =0; i<nrows; i++){
      // rows = how many arrays we create =>for loop as many time as rows
      // cols = how many elements in an array
      // push column array into initial board
      // let colArray =Array.from({length: ncols}).map(e =>chooseTOrF())
      let colArray =Array.from({length: ncols}).map(e =>Math.random() < chanceLightStartsOn)

      initialBoard.push(colArray);
    }
   
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // check board if all the element in an array is false
    return board.map(row => row.every(e => e===false)).every(elem=> elem===true);
  }

  function flipCellsAround(coord) {
    // where will this coord comes from?
    setBoard(oldBoard => {
      
      const [y, x] = coord.split("-").map(Number);
      // .map(Number)  // Calls Number on each value in the array (casting it to a number)

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let copyOldBoard = JSON.parse(JSON.stringify(oldBoard))
      // or const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copyOldBoard)
      flipCell(y-1, x, copyOldBoard)
      flipCell(y+1, x, copyOldBoard)
      flipCell(y, x-1, copyOldBoard)
      flipCell(y, x+1, copyOldBoard)

      // TODO: return the copy
      return copyOldBoard;
    });
  }

  if (hasWon()){
    // if the game is won, just show a winning msg & render nothing else
    return(
      <div className="Board-finish">
        <h1>You won!</h1>
      </div>
    )
  
  } else{
  // make table board
    return(
      <div>
      <h1>LIGHTS OUT</h1>
      <p>Turn off All the Lights!</p>
      <table className="Board">
        <tbody>
        {board.map((row, ridx) =>(
          <tr key={ridx}>
            {row.map((col, cidx)=>(
        
                <Cell 
                  isLit={col} 
                  flipCellsAroundMe={()=>flipCellsAround(`${ridx}-${cidx}`)} 
                  key={`${ridx}-${cidx}`}/>

            ))}
          </tr>
        ))}
        </tbody>
  
      </table>
      </div>
    )

    // or springboard solution
      // make table board: rows of Cell components

//   let tblBoard = [];

//   for (let y = 0; y < nrows; y++) {
//     let row = [];
//     for (let x = 0; x < ncols; x++) {
//       let coord = `${y}-${x}`;
//       row.push(
//         <Cell
//           key={coord}
//           isLit={board[y][x]}
//           flipCellsAroundMe={() => flipCellsAround(coord)}
//         />
//       );
//     }
//     tblBoard.push(<tr key={y}>{row}</tr>);
//   }

//   return (
//     <table className="Board">
//       <tbody>{tblBoard}</tbody>
//     </table>
//   );
// }


  }
}

export default Board;
