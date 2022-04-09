var hex;
window.onload = function(){
    // window.x = document.myForm.myInput;
    hex = Math.floor(Math.random()*16777215).toString(16);
    $("body").css("background-color",`#${hex}`);
    $("h1").css("color",`#${hex}`);
    

}; 

// enter key pressed
$(document).keyup(function(event) {
    if (event.which === 13) {
        // check if its the last letter if so check and submit
        const row = event.target.name.charAt(1);
        // const col = event.target.name.charAt(3);
        let valid = true;
        let input = "";
        // check each byte to make sure it exists
        for (let i = 1; i <= 6; i++) {
            let name = `r${row}c${i}`
            let val = document.getElementsByName(name)[0].value;
            // console.log("ENTER", name, val ,);
            if ( val === "") {                
                // console.log("val here", val);
                valid = false
                break;
            }
            input = input + val;
        }

        console.log("validating!!", input, valid)
        // make sure value is between 0-9 or A-F
        if (valid) {
            let re = /[0-9A-Fa-f]{6}/g;
            valid = re.test(input);
        }
        
        if (!valid) {
            alert("NOT A VALID HEX");
            return;
        }

        // move to next line and do shiz. 
        if (row != 6) {
            document.getElementsByName(`r${parseInt(row) + 1}c1`)[0].focus();          
            // TODO: shiz
        }

        // color letters
        let greenCount = 0;
        for (let i = 1; i <= 6; i++) {
            let name = `r${row}c${i}`
            console.log('yoyoyoy', input);
            let p = i - 1; // this is ugly get charAt to work later...
            console.log(name, hex.toLowerCase().charAt(i - 1), input.toLowerCase()[p] );
            if (hex.toLowerCase().charAt(i - 1) === input.toLowerCase()[p]) { // green!
                greenCount++;
                document.getElementsByName(name)[0].style.backgroundColor = '#44aa5c';
            } else if (hex.toLowerCase().includes(input.toLowerCase()   .charAt(i-1), 0)) { // yellow!
                document.getElementsByName(name)[0].style.backgroundColor = '#fceea7';
            } else { // RED!!
                document.getElementsByName(name)[0].style.backgroundColor = '#AA4A44';
            }
            //this is for fun.
            // document.getElementsByName(name)[0].style.backgroundColor = '#AA4A44';
            // if (Math.random() >= 0.5) {
            //     document.getElementsByName(name)[0].style.backgroundColor = '#44aa5c';
            // }
            // if (Math.random() >= 0.5) {
            //     document.getElementsByName(name)[0].style.backgroundColor = '#fceea7';
            // }
            
            // elem

            // $(`input[name=${`r${row + 1}c${i}`}]`).attr("disabled", "disabled");
            document.getElementsByName(name).readOnly = true;

        }

        if (greenCount == 6) { // weiner weiner ckn dinnner
            alert("YOU ARE AWESOME! And a Weiner");
            // lockFollowingRows(row);
        }
        console.log(event.target.name);
        // alert('Enter is pressed!');
    }
});

function lockFollowingRows(prevRow) {
    console.log("prev", prevRow);
    if(prevRow === 6) { return; }

    for (let i = 1; i <= 6; i++) {
        let name = `r${prevRow + 1}c${i}`
        $(`input[name=${name}]`).attr("disabled", "disabled");
        // document.getElementsByName(name).attr("disabled", "disabled"); 
    }

    // lockFollowingRows(prevRow + 2);
}

// any key pressed other than backspace and enter
$(document).keyup(function(event) {
    if (event.which != 13 || event.which != 8 || event.which != 46) {
        // check if its the last letter if so check and submit
        const rowStr = event.target.name.substring(0, event.target.name.length - 1);
        const last = event.target.name.charAt(event.target.name.length - 1);

        if (last == 6) {return;}

        // const name = `[name="${rowStr}${parseInt(last) + 1}]`;
        document.getElementsByName(rowStr + (parseInt(last) + 1))[0].focus();

        // $(name).focus();
        // console.log("focused!!!", rowStr, last, name);
        //if not letter change focus to next textbox?
        console.log(event.target.name);
        // alert('Enter is pressed!');
    }
});

//backsapce on empyt text box!
$(document).keyup(function(event) {
    console.log("made it here!", event.keyCode);
    if (event.keyCode == 8 ) {
    console.log("made it here!2 ");        
        const rowStr = event.target.name.substring(0, event.target.name.length - 1);
        const last = event.target.name.charAt(event.target.name.length - 1);

        if (last == 1 || last == 6) {return;} // we include 6 for now :_)

        // const name = `[name="${rowStr}${parseInt(last) + 1}]`;
        console.log(document.getElementsByName(rowStr + ((parseInt(last) - 1)))[0].value = "" ); 
        document.getElementsByName(rowStr + ((parseInt(last) - 1)))[0].focus();

        // $(name).focus();
        // console.log("focused!!!", rowStr, last, name);
        //if not letter change focus to next textbox?
        console.log("backspace!!!", event.target.name, document.getElementsByName(rowStr + (parseInt(last))));
        // alert('Enter is pressed!');
    }
});