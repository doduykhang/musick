import React, { useState } from 'react'

const CreatePlaylist = () => {

    const [name, setName] = useState('')

    return (
        <div>
            <form action="">
                <div className="input">
                    <div>Name</div>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
            </form>
        </div>
    )
}

export default CreatePlaylist
