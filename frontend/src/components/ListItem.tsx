import React, {useState} from "react";

interface ListItemProps {
    text: string;
}

// function ListItem(props:any) {
//     const [isDone, setIsDone] = useState(false);

const ListItem: React.FC<ListItemProps> = ({ text }) => { //??????
    const [isDone, setIsDone] = useState(false);

    function handleClick() {
        setIsDone(prevValue => !prevValue);
    }
    return (
        <div onClick={handleClick}>
            <li style={{ textDecoration: isDone? "line-through": "none"}}> 
                {text}
            </li>            
        </div>
    )
}
export default ListItem;