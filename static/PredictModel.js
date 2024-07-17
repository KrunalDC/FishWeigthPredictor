$(document).on("click","#PredictButton", async function(event){
    event.preventDefault();
    const length1 = document.getElementById('length1').value;
    const length2 = document.getElementById('length2').value;
    const length3 = document.getElementById('length3').value;
    const height = document.getElementById('height').value;
    const width = document.getElementById('width').value;
    if(length1 == ""  ||length2 == "" ||length3 == "" ||height == ""  || width == "")
    {
        $("#ErrorMessage").text("Please enter value for all the fields.")
        return false
    }
    else
    {
        $("#ErrorMessage").text("")
    }
    const response = await fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            length1: length1,
            length2: length2,
            length3: length3,
            height: height,
            width: width,
        }),
    });
    console.log("response",response)
    const result = await response.json();
    document.getElementById('result').innerText = `Predicted Weight: ${result.weight.toFixed(2)}g`;
});
