
//initializing variables
paramsCounter = 1;

// utility functions 

const getElementFromString = (string) => {
    let div = document.createElement('div');
    div.innerHTML = string
    return div.firstElementChild
}
// hiding custom parameter box by defalut 
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = 'none';

// toggling between content types boxes 
document.getElementById('contentParams').addEventListener('click', () => {
    document.getElementById('jsonBox').style.display = 'none'
    document.getElementById('parametersBox').style.display = 'block'
});

document.getElementById('contentJson').addEventListener('click', () => {
    document.getElementById('jsonBox').style.display = 'block'
    document.getElementById('parametersBox').style.display = 'none'
});

// adding functionality to add more custom parameters  

let addparams = document.getElementById('addparams');
addparams.addEventListener("click", () => {
    let string = `<div class="mb-3 row parent" >
    <label for="" class="col-sm-2 col-form-label">Parameter ${paramsCounter + 1}</label>
    <div class="col-sm-10">
      <div class="row g-3">
        <div class="col-md-4">
          <input type="text" class="form-control" id="parameterKey${ paramsCounter + 1}" placeholder="Enter parameter ${paramsCounter + 1} Key" aria-label="First name">
        </div>
        <div class="col-md-4">
          <input type="text" class="form-control" id="parameterValue${ paramsCounter + 1}" placeholder="Enter Parameter ${paramsCounter + 1} value" aria-label="Last name">
        </div>
        <div class="col">
          <button class="btn btn-primary removeparam">-</button>
        </div>
      </div>
    </div>
  </div>`

    element = getElementFromString(string)
    document.getElementById("moreparams").append(element)

    let removeparam = document.getElementsByClassName('removeparam')
    for (item of removeparam) {
        item.addEventListener('click', (e) => {
            // TODO: do a confirmation for deleting element 
            e.target.closest('.parent').remove()
        })
    }
    paramsCounter++
});

let submit = document.getElementById("submit");
submit.addEventListener('click', () =>{
    let url = document.getElementById('url').value
    let requestType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value
    let data;
   if (contentType === 'params'){
        data = {}
        for (let i=0; i < paramsCounter; i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){ 
                let key = document.getElementById('parameterKey' + (i+1)).value;
                let value = document.getElementById('parameterValue' + (i+1)).value;
                data[key] = value
            }
        }
        data = JSON.stringify(data)
   }
   else{
    data = document.getElementById('requestJson').value
   }

   if (requestType === "GET"){
        fetch(url, {method: 'GET',}).then(res=>res.text()).then((text)=>{
            document.getElementById('responseJson').value = text
        })
   }
   else{
    console.log
    fetch(url, {
        method: 'POST',
        body:data,
        headers: {
            'content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(res=>res.text()).then((text)=>{
        document.getElementById('responseJson').value = text
   })
}
})