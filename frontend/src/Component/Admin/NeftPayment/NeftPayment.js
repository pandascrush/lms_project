import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function NeftPayment() {
  var { quantity } = useParams();
  var amt = quantity * 20;
  const [amount, setAmount] = useState(amt);
  var { id } = useParams();
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}admin/bussuserdetails/${id}`)
      .then((res) => res.json())
      .then((respon) => {
        console.log(respon);
        setEmail(respon[0].spoc_email_id);
      });
  }, []);

  function handleneftdetails(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var transactionid = document.getElementById("transactionid").value;
    // alert(transactionid);
    var quantity = document.getElementById("quantity").value;
    var amount = document.getElementById("amount").value;

    var key = {
      email: email,
      transactionid: transactionid,
      quantity: quantity,
      amount: amount,
    };
    if (transactionid === "") {
      alert("Kindly fill the Check number");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}admin/nefttransation/${id}`, key)
        .then((res) => {
          if (res.data.status === "inserted") {
            alert("Thank you! your license will update after Admin Approval");
            window.location.assign(`/admindashboard/${id}/purlicense`);
          } else {
            alert("Sorry refill the details");
            window.location.reload();
          }
        });
    }
  }
  return (
    <>
      <div>
        <h3 className="m-4">Transactional details</h3>
        <div class="col-lg-12 login-form">
          <div class="col-lg-12 login-form">
            <form onSubmit={handleneftdetails}>
              <div className="container-fluid mx-auto">
                <div className="col-lg-6 mx-auto">
                  <div class="form-group">
                    <label class="form-control-label ms-5">Email Id</label>
                    <input
                      type="text"
                      class="form-control"
                      name="email"
                      id="email"
                      value={email}
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-control-label ms-5">
                      Transaction Id
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="transactionid"
                      id="transactionid"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label ms-5">Quantity</label>
                    <input
                      type="text"
                      class="form-control"
                      name="quantity"
                      id="quantity"
                      value={quantity}
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-control-label ms-5">Amount</label>
                    <input
                      type="text"
                      class="form-control"
                      name="amount"
                      id="amount"
                      value={amount}
                    />
                  </div>

                  <button type="submit" class="btn btnbgcolor col-lg-6 col-12">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
