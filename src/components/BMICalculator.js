import { useState } from "react";
import styled from "styled-components";

export function BMICalculator() {
  const [weight, updateWeightValue] = useState("");
  const [height, updateHeightValue] = useState("");
  const [bmiValue, updateBMIValue] = useState(null);
  function calculateBMIValue() {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const roundedOffBMIValue = parseFloat(bmiValue.toFixed(2));
    updateBMIValue(roundedOffBMIValue);

    console.log(typeof heightInMeters, typeof roundedOffBMIValue);
  }
  function handleWeightInputChange(e) {
    updateWeightValue(e.target.value);
  }
  function handleHeightInputChange(e) {
    updateHeightValue(e.target.value);
  }
  function displayBMIValue() {
    if (bmiValue !== null) {
      return <div>Your BMI Value is {bmiValue}</div>;
    }
  }
  function showWeight(lowBMI, highBMI) {
    const heightInMeters = parseFloat(height) / 100;
    const lowestWeight = lowBMI * (heightInMeters * heightInMeters);
    const highestWeight = highBMI * (heightInMeters * heightInMeters);

    return (
      <p>
        The suggested weight for your {height}cm height is in the range of
        <strong>
          {Math.round(lowestWeight)} - {Math.round(highestWeight)} kgs.
        </strong>
      </p>
    );
  }

  function suggestWeight() {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const roundedOffBMIValue = bmiValue.toFixed(2);
    if (roundedOffBMIValue <= 18) {
      return [showWeight(10, 18), <div>UnderWeight</div>];
    } else if (roundedOffBMIValue > 18 && roundedOffBMIValue <= 25) {
      return [
        showWeight(18, 25),
        <div> You are in a healthy weight range</div>
      ];
    } else if (roundedOffBMIValue > 25 && roundedOffBMIValue <= 30) {
      return [showWeight(25, 30), <div> You are OverWeight</div>];
    } else if (roundedOffBMIValue > 30) {
      return [showWeight(30, 40), <div> You are Obese</div>];
    }
  }
  return (
    <Wrapper className="container form-container">
      <div>
        <label className="me-4 mt-5">Weight in kgs:</label>
        <input
          type="text"
          value={weight}
          placeholder="Enter you weight"
          onChange={handleWeightInputChange}
        ></input>
      </div>
      <div>
        <label className="me-4 mt-5">Height in cms:</label>
        <input
          type="text"
          value={height}
          placeholder="Enter your height"
          onChange={handleHeightInputChange}
        ></input>
      </div>
      <button
        type="button"
        className="btn btn-primary mt-4"
        onClick={calculateBMIValue}
      >
        Calculate BMI
      </button>

      {bmiValue !== null && weight !== "" && height !== "" && (
        <div>
          {displayBMIValue()}
          {suggestWeight()}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .form-container {
    width: 500px;
  }
`;
