import React from 'react'
import { render } from 'react-dom'
import Styles from './styles'
import { Form, Field } from 'react-final-form'
import Card from './card'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils'
import axios from 'axios'
import TransactionSuccess from './transactionSuccess'
import Loading from './Loading'



const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function Checkout() {
  const [error, setError] = React.useState('');
  const [transactionSuccess, setTransactionState] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  // const [displayerror, setDisplayError] = React.useState(false);
  let errorColor = 'white';



  const onSubmit = async (values) => {
    let str = JSON.stringify(values.number);
    str.replace(/\s/g, '');
    setLoading(true);
    //let sendercard = str ;
    let senderCard = values.number.toString().replace(/\s/g, '');
    console.log(senderCard);
    let intse = parseInt(senderCard);
    axios.post('http://localhost:8000/api/send/payment/card',
      {
        "receiver_card": "5743353750246362",
        "sender_card":intse,
        "amount":200,
        "email": "otikojairus@gmail.com",
        "merchant_type": "shopping"
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.error !== null) {
          setError(res.data.error);
          errorColor = "red";

          setTimeout(() => {
            setLoading(false);
          },3000);
          
          // error = res.data.error;
          // setDisplayError(true);
        } else {
          setError(res.data.response);
          errorColor = "green";
          setLoading(false);
          
        }
        

      })
      .catch((err) => console.log(err))

  }
  if (transactionSuccess) {
    return (
      <TransactionSuccess/>
    );
  } else if (loading) {
    return (<Loading/>);
    
}
  return (

    <Styles>
      <h1>Checkout with KADIFY PAY</h1>
      <p>We dont store your Kadify card details. Kadify will send you a transaction receipt via your email</p>
      <div style={{ backgroundColor: 'white', borderRadius: 10, color: 'red' }}>
                <p>{error}</p>
              </div>

      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          active
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Card
                number={values.number || ''}
                name={values.name || ''}
                expiry={values.expiry || ''}
                cvc={values.cvc || ''}
                focused={active}
              />
              <div>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              {/* <h2>Values</h2>
            <pre>{JSON.stringify(values.number)}</pre> */}


     


            </form>
          )
        }}
      />
    </Styles>
  );

}

export default Checkout;
