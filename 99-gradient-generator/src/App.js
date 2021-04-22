import mix from 'mix-color';
import {useEffect, useState} from 'react';
import {BsArrowLeft, BsArrowRight, BsArrowUp, BsArrowDown, BsArrowUpLeft, BsArrowUpRight, BsArrowDownLeft, BsArrowDownRight, BsArrowCounterclockwise} from 'react-icons/bs'


function App() {
  const [color1, setColor1] = useState("#051937")
  const [color2, setColor2] = useState("#A8EB12")
  const [bckColor, setBckColor] = useState("")
  const [direction, setDirection] = useState("to left");
  const [typeOfGradient, setTypeOfGradient] = useState("linear-gradient");
  const handleOnChangeColor1 = (e) =>{
    setColor1(e.target.value)
  }
  const handleOnChangeColor2 = (e) =>{
    setColor2(e.target.value)
  }


  const colorGenerated = (color1,color2,direction) =>{

    let arrColor = [];
    let background = "";
    let defaultColor1 = "#051937";
    let defaultColor2 = "#A8EB12";
    let arrCoeff = [0, 0.2, 0.5,0.7,1];

    if(mix(color1, color2, 0).includes("NaN") || mix(color1, color2, 0) === undefined || color1 === "" || color2 === ""){
      console.log(mix(color1, color2, 0))
      color1 = defaultColor1;
      color2 = defaultColor2;
    }
    for(let i = 0; i < arrCoeff.length ;i++){
      arrColor.push(mix(color1, color2, arrCoeff[i]));
    }
    background = direction +", " + arrColor.join(",");
    setBckColor(background);
  }

  const handleChooseDirection = (e) =>{
    if(e.target.dataset.cssval === "circle"){
      setTypeOfGradient("radial-gradient")
    }else{
      setTypeOfGradient("linear-gradient")
    }
    setDirection(e.target.dataset.cssval);
  }

  useEffect(()=>{
    colorGenerated(color1,color2, direction)
  },[color1,color2, direction]);

 
    return (
      <div className="App" style={{background: `${typeOfGradient}(${bckColor})` }}>
        <div className="container">
        <h1>Generate CSS Gradient color</h1>
          <div>
            <div className="direction">
              <h3>Choose direction</h3>
              <div className="section-direction">
                <button className="btn-arrow" data-cssval="to left" onClick={handleChooseDirection} ><BsArrowLeft data-cssval="to left"/></button>
                <button className="btn-arrow" data-cssval="to right" onClick={handleChooseDirection} ><BsArrowRight data-cssval="to right"/></button>
                <button className="btn-arrow" data-cssval="to top" onClick={handleChooseDirection} ><BsArrowUp data-cssval="to top"/></button>
                <button className="btn-arrow" data-cssval="to bottom"  onClick={handleChooseDirection} ><BsArrowDown data-cssval="to bottom" /></button>
                <button className="btn-arrow" data-cssval="to left top"  onClick={handleChooseDirection} ><BsArrowUpLeft data-cssval="to left top" /></button>
                <button className="btn-arrow" data-cssval="to right top"  onClick={handleChooseDirection} ><BsArrowUpRight data-cssval="to right top" /></button>
                <button className="btn-arrow" data-cssval="to left bottom"  onClick={handleChooseDirection} ><BsArrowDownLeft data-cssval="to left bottom" /></button>
                <button className="btn-arrow" data-cssval="to right bottom"  onClick={handleChooseDirection} ><BsArrowDownRight data-cssval="to right bottom" /></button>
                <button className="btn-arrow" data-cssval="circle"  onClick={handleChooseDirection} ><BsArrowCounterclockwise data-cssval="circle" /></button>
              </div>
            </div>
            <div className="select-color">
              <input type="color" placeholder="color1" value={color1} onChange={handleOnChangeColor1} />
              <input type="color" placeholder="color2" value={color2} onChange={handleOnChangeColor2} />
            </div>
          </div>
          <p className="result">
          background: {typeOfGradient}({bckColor})
          </p>
        </div>
      </div>
    );

}

export default App;
