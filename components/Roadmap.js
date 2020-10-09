import { DragDropContext } from 'react-beautiful-dnd';
import {useState} from "react";

export default function () {
    const [data, setData] = useState([
        {title: "In Progress", cards: [{id: "72123", content: "Lorem ipsum dolor", tags: [{id: "2312", value: "React"}]}]}
    ])

    return (
        <div>
            {data.map}
        </div>
    )
}