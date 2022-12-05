import './App.css';
import { useState } from 'react';


const FAQ = [
  {
    question: "How many bones does a cat have?",
    answer: "A cat has 230 bones - 6 more than a human",
  },
  {
    question: "How much do cats sleep?",
    answer: "The average cat sleeps 12-16 hours per day",
  },
  {
    question: "How long do cats live",
    answer: "Outdoor cats live 5 years on average. Indoor cats live 15 years on average.",
  },
];

const AccordionItem = ({question, answer}) => {
    const [isOpen, setIsOpen] = useState(false);
    const s = isOpen ? '-' : '+'
  return (
      <div onClick={() => setIsOpen(!isOpen)}>
        <h1><span>{s}</span>{question}</h1>
        {isOpen && <h2>{answer}</h2>}
      </div>
    )

}

const Accordion = ({questions}) => {

  return questions.map(({question, answer}, index) =>  (
     <AccordionItem question={question} answer={answer} key={index} />
  ))
}

function App() {

  const [ info, setInfo ] = useState({
    username: '',
    email: '',
    password: '',
    over21: false,
    faveColor: '',
    passwordError: false 
  })
  const [ formSubmitted, setFormSubmitted ] = useState(false);
  const ageText = info.over21 ? 'You can participate!' : 'You cannot participate. But you still get an email.'



  const handleSubmit = (event) => {
    event.preventDefault();
    if(info.password.length >= 6) {
      setInfo({...info, passwordError: false})
      setFormSubmitted(true)
    } else {
      setInfo({...info, passwordError: true, password: ''})
      setFormSubmitted(false)
    }
  };

  const handleChange = (event) => {
    const target = event.target; 
    const val = target.type === 'checkbox' ? target.checked : target.value;  
    setInfo({...info, [event.target.name]: val
    });
  };


  return (
    <>
    <div className="App">
      <header className="App-header">Extended Form</header>
      <Accordion questions={FAQ} />
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
          <input  
          name='username'
          type='text'
          value={info.username}
          required
          onChange={handleChange}
          />
        <label htmlFor='email'>Email:</label>
        <input 
        type='email' 
        name='email' 
        value={info.email} 
        required 
        onChange={handleChange}
        />
        <label htmlFor='password'>Password:</label>
        <input name='password' 
        type='password' 
        value={info.password} 
        required 
        onChange={handleChange}
        />
        <label htmlFor='over21'>Over 21?:</label>
        <input 
        name='over21'
        type='checkbox'
        value={info.over21}
        onChange={handleChange}
        />
        <label htmlFor='faveColor'>What is your favorite color?</label>
        <select name='faveColor' value={info.faveColor} required onChange={handleChange}>
          <option value='red'>red</option>
          <option value='yellow'>yellow</option>
          <option value='orange'>orange</option>
        </select>
        <button type='submit'>Submit!</button>
      </form>
      {formSubmitted && <h2>{`Thank you, ${info.username}! ${ageText} We have sent an email to ${info.email}. And your favorite color is ${info.faveColor}`}</h2>}
      {info.passwordError && <p>Password needs to be at least 6 characters</p>}
    </div>
  </>
  );
}

export default App;
