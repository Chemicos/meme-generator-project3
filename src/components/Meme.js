// import data from "../data";
import React, {useState} from "react";

export default function Meme () {
    // const [memeImage, setMemeImage] = useState("")

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage () {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme( prevMeme => ({
                ...prevMeme,
                randomImage: url
            })
        )
        
    }

    function handleChange (event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return ( 
        <main>
            <div className="form">
                <input 
                    name="topText"
                    className="form-input"
                    placeholder="top text" 
                    type="text" 
                    value={meme.topText}
                    onChange={handleChange}                
                />
                <input 
                    name="bottomText" 
                    className="form-input" 
                    placeholder="bottom text" 
                    type="text" 
                    value={meme.bottomText}
                    onChange={handleChange}  
                />
                <button onClick={getMemeImage} className="form-button">Get a new meme image</button>
            </div>
            <div className="meme">
            <img src={meme.randomImage} className="meme-image" alt="" />
            <h2 className="meme-text top">{meme.topText}</h2>
            <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}