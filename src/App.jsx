/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.scss";
import dollar from "./assets/dollar.svg";
import people from "./assets/people.svg";

export default function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("");
  const [person, setPerson] = useState("");

  function resetInputs() {
    setBill("");
    setTip("");
    setPerson("");
  }
  const tipTotal = tip && bill ? ((tip * bill) / 100).toFixed(2) : "0.00";
  let numPeople = person;
  if (!person || person === 0) {
    numPeople = 1;
  } else {
    numPeople = person;
  }
  const total = bill
    ? (((tip * bill) / 100 + bill) / numPeople).toFixed(2)
    : "0.00";
  return (
    <div className="container">
      <div className="container__left">
        <div className="container__top">
          <InputField
            value={bill}
            setValue={setBill}
            padding={"1rem 2rem"}
            label={true}
            title="Bill"
            icon={dollar}
            placeholder={0}
            align={"start"}></InputField>
        </div>
        <div className="container__mid">
          <p>selecte a tip %</p>
          <div className="container__mid-grid">
            <TipButon setTip={setTip} tip={5}>
              {tip}
            </TipButon>
            <TipButon setTip={setTip} tip={10}>
              {tip}
            </TipButon>
            <TipButon setTip={setTip} tip={15}>
              {tip}
            </TipButon>
            <TipButon setTip={setTip} tip={20}>
              {tip}
            </TipButon>
            <TipButon setTip={setTip} tip={50}>
              {tip}
            </TipButon>
            <Input
              value={tip}
              setValue={setTip}
              placeholder={"Custom"}
              label={false}
              align={"center"}
              padding={"1rem 2rem"}></Input>
          </div>
        </div>
        <div className="container__bottom">
          <InputField
            value={person}
            setValue={setPerson}
            padding={"1rem 2rem"}
            label={true}
            title={"Number of People"}
            placeholder={0}
            align={"start"}
            icon={people}></InputField>
        </div>
      </div>
      <div className="right">
        <PriceStat text={"Tip amount"} price={tipTotal}></PriceStat>
        <PriceStat text={"Total"} price={total}></PriceStat>
        <Button
          onReset={resetInputs}
          disabled={!(bill || tip || person)}
          mgTop={"auto"}>
          Reset
        </Button>
      </div>
    </div>
  );
}

function InputField({
  title,
  icon,
  placeholder,
  label,
  align,
  padding,
  value,
  setValue,
}) {
  return (
    <div className="input-field">
      <p>{title}</p>
      <div className="input-label">
        {label && (
          <label htmlFor="price-input">
            <img src={icon} alt={title}></img>
          </label>
        )}
        <input
          value={value}
          onChange={e =>
            setValue(Number(e.target.value) === 0 ? "" : Number(e.target.value))
          }
          required
          type="number"
          min={0}
          placeholder={placeholder}
          className="input-field"
          id="price-input"
          style={{ textAlign: align, padding: padding }}></input>
      </div>
    </div>
  );
}
function Input({
  title,
  icon,
  placeholder,
  label,
  align,
  padding,
  value,
  setValue,
}) {
  const [input, setInput] = useState("");
  return (
    <div className="input-label">
      {label && (
        <label htmlFor="price-input">
          <img src={icon} alt={title}></img>
        </label>
      )}
      <input
        value={value}
        onChange={e =>
          setValue(Number(e.target.value) === 0 ? "" : Number(e.target.value))
        }
        required
        type="number"
        min={0}
        placeholder={placeholder}
        className="input-field"
        id="price-input"
        style={{ textAlign: align, padding: padding }}></input>
    </div>
  );
}

function TipButon({ tip, setTip }) {
  return (
    <button onClick={() => setTip(tip)} className="tip-button">
      {tip}%
    </button>
  );
}

function PriceStat({ price, text }) {
  return (
    <div className="price">
      <div className="price__text">
        <p>{text}</p>
        <span>/ person</span>
      </div>
      <div className="price__amount">
        <h1>${price}</h1>
      </div>
    </div>
  );
}

function Button({ disabled = true, mgTop, onReset, children }) {
  return (
    <button
      onClick={onReset}
      disabled={disabled}
      className="cta"
      style={{ marginTop: mgTop }}>
      {children}{" "}
    </button>
  );
}
