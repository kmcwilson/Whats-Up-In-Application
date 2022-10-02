//imagine we get an arr fro localStorage :
var arr = ["denver", "dallas", "houston"];

function saveToLocal(cityToSave) {
    if(arr.includes(cityToSave.toLowerCase())) {
        console.log("city already in history")
    }else {
        arr.push(cityToSave)
    }

    console.log(arr)
}

saveToLocal("Beaumont")