"use strict"

//Gets the id of an element
const $ =(id)=> {return document.getElementById(id)};

//this object will hold the loan information
//we will access this information and display
//the values entered by the user.
const loanInfo = {};

//get the values function
const getValues =()=> {

    //user input
    let loanAmount = parseFloat($("loan-amount").value);
    let term = parseFloat($("term").value);
    let rate = parseFloat($("rate").value);

    //Insert properties inside the LoanInfo Object
    loanInfo.amount = loanAmount;
    loanInfo.terms = term;
    loanInfo.interest = rate;

    //calculate monthly payment using pre-made formula
    let x = Math.pow(1 + (rate/1200), term); //Math.pow 
    let monthlyPayment = (loanAmount*x*(rate/1200))/(x-1);


    //this variable will hold the total amount of Interest paid
    let totalInterest = 0;

    //this variable will hold the remaining balance left
    let balance = 0;

    //Display the original values enterted by the user
    //format the numbers to only two decimal places
    $("desc").innerHTML = `<strong>Loan amount:</strong> $${loanInfo.amount.toFixed(2)}<br>`;
    $("desc").innerHTML += `<strong>Term in months:</strong> ${loanInfo.terms}<br>`;
    $("desc").innerHTML += `<strong>Rate:</strong> ${loanInfo.interest.toFixed(2)}%`;

    //Table Heading. Dark row
    let darkRow = $("tBody").insertRow();

    //We use this array to populate the Table Heading Row dynamically
    let tableHeading = ['Month', 'Payment', 'Principal', 'Interest', 'Total Interest', 'Balance'];
    
    //using a for loop we access the tableHeading array and add a new cell
    //at position index. We also add a special class that makes the data cells
    //bold and orange.
    for(var i = 0; i < tableHeading.length; i++) {
        let nC = darkRow.insertCell();
        nC.classList.add("my-bold");
        nC.innerHTML = tableHeading[i];
    }
    //The dark row needs indeed a class that makes the heading
    //dark
    darkRow.classList.add("table-dark");

    //We use a for loop to iterate over the total period of time
    //we access the object with the terms property
    for(var i = 1; i <= loanInfo.terms; i++) {

        //inserts a new row on every iteration
        let nRow = $("tBody").insertRow();

        /*******ALL CELLS THAT GO INSIDE THE ROW*******/

        //This cell holds the months
        let month = nRow.insertCell();
        month.innerHTML = i;
        
        //This cell holds the monthly payments
        let payment = nRow.insertCell();
        payment.innerHTML = `${monthlyPayment.toFixed(2)}`;

        //This cell holds the amount of money that goes to the principal
        let monthlyPrincipal = nRow.insertCell();
        //we find the principal with this formula
        let principal = monthlyPayment - (loanAmount * (rate/1200));
        monthlyPrincipal.innerHTML = `${principal.toFixed(2)}`;

        //This cell holds the monthly interest 
        let monthInterest = nRow.insertCell();
        let interest = loanAmount * (rate /1200);
        monthInterest.innerHTML = `${interest.toFixed(2)}`;
        
        //This cell holds the total interest paid
        let totalInterestPaid = nRow.insertCell();
        //we simply add the interest on every iteration
        //and store the value in a new variable
        totalInterest += interest;
        totalInterestPaid.innerHTML = `${totalInterest.toFixed(2)}`;

        //update the loan amount after every iteration
        loanAmount -= principal;

        //display the remaining balance
        let reamingBalance = nRow.insertCell();
        balance = loanAmount;
        reamingBalance.innerHTML =  `${balance.toFixed(2)}`;

    }

    //display monthly payments
    $("monthly-title").innerHTML = `<strong>Your Monthly Payments</strong>`;
    $("monthly-payment").innerHTML = `$${monthlyPayment.toFixed(2)}`;
    //display the total interest the customer will pay
    $("total-interest").innerHTML = `<strong>Total Interest:</strong> $${totalInterest.toFixed(2)}`;
    //display the total cost of the loan. add total interest and initial loanAmount
    $('total-cost').innerHTML = `<strong>Total cost:</strong> $${(totalInterest + loanInfo.amount).toFixed(2)}`;

}

//We load the script after the DOM loads
window.onload =()=> {
    //Event listener for the onlclick event
    $("calculate").onclick =()=> {
        //We make sure the customer enters valid data
        if($("loan-amount").value && $("term").value && $("rate").value && $("rate").value != 0){
            //we reset the body table first
            $("tBody").innerHTML = "";
            //then we call the getValues function
            getValues();
            //reset the form
            $("my-form").reset();
        } else {
            //added some feedback for the customer
            alert("Please enter valid numbers!\n rate must be greater than 0.")
        }
    }
}


