"use strict"

//Gets the id of an element
const $ =(id)=> {return document.getElementById(id)};

//this object will hold the loan information
//we will access this information and display
//the values entered by the user.
const loanInfo = {};

//get the values
const getValues =()=> {

    let loanAmount = parseFloat($("loan-amount").value);
    let term = parseFloat($("term").value);
    let rate = parseFloat($("rate").value);

    //Insert the properties inside the LoanInfo Object
    loanInfo.amount = loanAmount;
    loanInfo.terms = term;
    loanInfo.interest = rate;

    //calculate monthly payment
    let x = Math.pow(1 + (rate/1200), term); //Math.pow 
    let monthlyPayment = (loanAmount*x*(rate/1200))/(x-1);


    //this variable will hold the total amount of Interest paid
    let totalInterest = 0;

    //this variable will hold the remaining balance left
    let balance = 0;

    //Display the original values enterted by the user
    $("desc").innerHTML = `Loan amount: $${loanInfo.amount.toFixed(2)}<br>`;
    $("desc").innerHTML += `Term in months: ${loanInfo.terms}<br>`;
    $("desc").innerHTML += `Rate: ${loanInfo.interest.toFixed(2)}%`;

    let darkRow = $("tBody").insertRow();

    let tableHeading = ['Month', 'Payment', 'Principal', 'Interest', 'Total Interest', 'Balance'];
    for(var i = 0; i < tableHeading.length; i++) {
        let nC = darkRow.insertCell();
        nC.classList.add("bold");
        nC.innerHTML = tableHeading[i];
    }
    //add some style to the table heading
    darkRow.classList.add("table-dark");

    for(var i = 1; i <= loanInfo.terms; i++) {

        //inserts a new row on every iteration
        let nRow = $("tBody").insertRow();
        //all cells that go inside this row
        
        //display months in numbers
        let month = nRow.insertCell();
        month.innerHTML = i;
        
        //monthly payment
        let payment = nRow.insertCell();
        payment.innerHTML = `${monthlyPayment.toFixed(2)}`;

        //what money goes to the principal
        let monthlyPrincipal = nRow.insertCell();
        let principal = monthlyPayment - (loanAmount * (rate/1200));
        monthlyPrincipal.innerHTML = `${principal.toFixed(2)}`;

        //monthly interest that the customer pays
        let monthInterest = nRow.insertCell();
        let interest = loanAmount * (rate /1200);
        monthInterest.innerHTML = `${interest.toFixed(2)}`;
        
        //total interest paid
        let totalInterestPaid = nRow.insertCell();
        totalInterest += interest;
        totalInterestPaid.innerHTML = `${totalInterest.toFixed(2)}`;

        //update the loan amount after iteration
        loanAmount -= principal;

        //display the remaining balance
        let reamingBalance = nRow.insertCell();
        balance = loanAmount;
        reamingBalance.innerHTML =  `${balance.toFixed(2)}`;

    }
    //display monthly payments
    $("monthly-title").innerHTML = `<strong>Your Monthly Payments</strong>`;
    $("monthly-payment").innerHTML = `$${monthlyPayment.toFixed(2)}`;
    $("total-interest").innerHTML = `<strong>Total Interest:</strong> $${totalInterest.toFixed(2)}`;
    $('total-cost').innerHTML = `<strong>Total cost:</strong> $${(totalInterest + loanInfo.amount).toFixed(2)}`;

}

window.onload =()=> {
    $("calculate").onclick =()=> {
        if($("loan-amount").value && $("term").value && $("rate").value && $("rate").value != 0){
            $("tBody").innerHTML = "";
            getValues();
            $("my-form").reset();
        } else {
            alert("Please enter valid numbers!\n rate must be greater than 0.")
        }
    }
}


