import { useState } from "react"

export default function SearchComponent () {
    
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    return (
        <div>Search Component</div>
    )
}