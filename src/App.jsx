import React, { useState } from 'react'

import bmiImageSrc from "./assets/bmi.jpg"

const App = () => {
  const [height,setHeight]=useState("")
  const [weight,setWeight]=useState("")
  const [bmi,setBmi]=useState(null)
  const [bmiStatus,setBmiStatus]=useState("")
  const [errorMessage,setErrorMessage]=useState("")

  const handleHeight=(e)=>{
    setHeight(e.target.value)
  }
  const handleWeight=(e)=>{
    setWeight(e.target.value)
  }
  const calculateBmi=()=>{
    const isValidHeight=/^\d+$/.test(height)
    const isValidWeight=/^\d+$/.test(weight)
    if(isValidHeight && isValidWeight){
      const heightInMeters=(height/100)
      const bmiValue=weight/(heightInMeters*heightInMeters)
      setBmi(bmiValue.toFixed(2))
      if(bmiValue < 18.5){
        setBmiStatus("Underweight")
      }
      else if(bmiValue >18.5 && bmiValue < 24.9){
        setBmiStatus("Normal weight")
      }
      else if(bmiValue>24.9 && bmiValue <29.9){
        setBmiStatus("Overweight")
      }
      else{
        setBmiStatus("Obese")
      }
      setErrorMessage("")
    }
    else{
      setBmi(null)
      setBmiStatus("")
      setErrorMessage("Please enter valid numeric value for height & weight")
    }
  }
  const handleEnter=(e)=>{
    if(e.key=="Enter"){
      calculateBmi()
    }
  }
  const clear=()=>{
    setBmi(null)
    setBmiStatus("")
    setHeight("")
    setWeight("")
  }
  return (
    <div className='bmimain'>
     <div className='main'>
      <div className="main-1">
        <img src={bmiImageSrc} alt="bmiimage" width={450} height={350}/>
      </div>
      <div className="main-2">
      <div className="heading">
      <h2>bmi calculator</h2>
      </div>
      <div className="error">
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <div className="textbox">
        <p>Height(cm):</p>
        <input type="text" placeholder='Enter your height' value={height} onChange={handleHeight}/>
        <p>Weigth(kg):</p>
        <input type="text" placeholder='Enter your weight ' value={weight} onChange={handleWeight} onKeyDown={handleEnter}/>
      </div>
      <div className="buttons">
        <button onClick={calculateBmi} className='cal'>Calculate BMI</button>
        <button onClick={clear} className='clr'>Clear</button>
      </div>
      {bmi!==null && (
        <div className="result">
        <p>Your BMI is : {bmi}</p>
        <p>Status : {bmiStatus}</p>
      </div>
      )}
      </div>
    </div>  
    </div>
  )
}

export default App
