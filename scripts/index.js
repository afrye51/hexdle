var hex; //874f4e // fun color c25f45
var ROWS = 5;
var COLS = 6;

var SHIFT_KEY = 16;
var LEFT_ARROW_KEY = 37;
var RIGHT_ARROW_KEY = 39;
var ENTER_KEY = 13;
var BACKSPACE_KEY = 8;
var DELETE_KEY = 46;
var TAB_KEY = 9;

var shareRef = new Array(ROWS);
window.onload = function(){
    // window.x = document.myForm.myInput;
    hex = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    // hex = 0xc25f45.toString(16).padStart(6, '0');
    $("body").css("background-color",`#${hex}`);
    $("h1").css("color",`#${hex}`);

    // dissable all but first row
    for (let j = 2; j <= 5; j++) {
        for (let i = 0; i <= 6; i++) {
            $(`input[name=r${j}c${i}]`).prop( "disabled", true );
        }
    }
    
    // fill up shareRef arry.
    for (var i = 0; i < ROWS ; i++) {
        shareRef[i] = new Array(COLS); // make each element an array
        for (let j = 0; j < COLS; j++) {
            shareRef[i][j] = "-";
        }
    }
}; 

// By user cem-kalyoncu from https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-specific-index-in-javascript
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

// enter key pressed
$(document).keyup(function(event) {
    if (event.which === ENTER_KEY) {
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

        // if valid then unlock the next row.
        for (let m = 0; m <= 6; m++) {
            $(`input[name=r${parseInt(row) + 1}c${m}]`).prop( "disabled", false );
        }

        // move to next line and do shiz. 
        if (row != 5) {
            document.getElementsByName(`r${parseInt(row) + 1}c1`)[0].focus();          
            // TODO: shiz
        }

        // color letters (first run does not properly handle duplicate yellows)
        let greenCount = 0;
        let letterList = hex;
        for (let i = 1; i <= 6; i++) {
            let name = `r${row}c${i}`
            let usedName = `used${input.toUpperCase().charAt(i-1)}`;
            console.log('yoyoyoy', input);
            let p = i - 1; // this is ugly get charAt to work later...
            console.log(name, hex.toLowerCase().charAt(i - 1), input.toLowerCase()[p] );
            
            // Grey out what charcter was used!
            // document.getElementsByName(usedName)[0].style.backgroundColor = '#717171';
            document.getElementsByName(usedName)[0].style.color = '#545454'; //#707070
            document.getElementsByName(usedName)[0].style.border = "#808080 2px solid";

            if (hex.toLowerCase().charAt(i - 1) === input.toLowerCase()[p]) { // green!
                greenCount++;
                document.getElementsByName(name)[0].style.backgroundColor = '#44aa5c';
                document.getElementsByName(usedName)[0].style.backgroundColor = '#44aa5c52';

                shareRef[row - 1][i - 1] = "G";
                letterList = letterList.replaceAt(p, "Z")
            } else if (hex.toLowerCase().includes(input.toLowerCase().charAt(i-1), 0)) { // yellow!
                document.getElementsByName(name)[0].style.backgroundColor = '#eed052'; //'#fceea7';
                document.getElementsByName(usedName)[0].style.backgroundColor = '#eed05252';

                shareRef[row - 1][i - 1] = "Y";
            } else { // RED!!
                document.getElementsByName(name)[0].style.backgroundColor = '#AA4A44';
                document.getElementsByName(usedName)[0].style.backgroundColor = '#AA4A4452';

                shareRef[row - 1][i - 1] = "R";
            }
        }

        // Fix duplicate yellows
        // Create a list of all letters (letterList) in the answer, then remove green letters. 
        // Step through left to right and leave the correct number of instances of each letter yellow. Mark any additional as red. 
        for (let i = 1; i <= 6; i++) {
            let name = `r${row}c${i}`
            let p = i - 1; // this is ugly get charAt to work later...

            if (shareRef[row - 1][i - 1] == "Y")
            {
                if (!letterList.toLowerCase().includes(input.toLowerCase().charAt(p), 0)) 
                {
                    document.getElementsByName(name)[0].style.backgroundColor = '#AA4A44';

                    shareRef[row - 1][i - 1] = "R";
                }
                else
                {
                    letterList = letterList.replaceAt(letterList.indexOf(input.toLowerCase().charAt(p)), "Z")
                }
            }
            
            // $(`input[name=${`r${row + 1}c${i}`}]`).prop( "disabled", true );
            console.log("yooo", `input[name=r${row+1}c${i}]`);
            $(`input[name=r${parseInt(row)}c${i}]`).prop( "disabled", true );
            
            // $(`input[name=${`r3c1`}]`).prop( "disabled", true );
            document.getElementsByName(name).readOnly = true;
        }

        if (greenCount == 6) { // weiner weiner ckn dinnner
            alert("YOU ARE AWESOME! And a Weiner");
            // lockFollowingRows(row);
        } else if (row == 5) {
            alert(`You lose, Hex value was ${hex}`);
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
    if (event.which != ENTER_KEY && event.which != SHIFT_KEY &&
        event.which != BACKSPACE_KEY && event.which != DELETE_KEY &&
        event.which != LEFT_ARROW_KEY && event.which != RIGHT_ARROW_KEY &&
        event.which != TAB_KEY) {
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


$(document).keyup(function(event) {
    if (event.which === LEFT_ARROW_KEY) {
        const rowStr = event.target.name.substring(0, event.target.name.length - 1);
        const last = event.target.name.charAt(event.target.name.length - 1);

        if (last == 1) {return;}

        document.getElementsByName(rowStr + (parseInt(last) - 1))[0].focus();
    }

    if (event.which === RIGHT_ARROW_KEY) {
        const rowStr = event.target.name.substring(0, event.target.name.length - 1);
        const last = event.target.name.charAt(event.target.name.length - 1);

        if (last == 6) {return;}

        document.getElementsByName(rowStr + (parseInt(last) + 1))[0].focus();
    }
});

//backsapce on empyt text box!
$(document).keydown(function(event) {
    console.log("made it here!", event.keyCode);
    if (event.keyCode == BACKSPACE_KEY) {
    console.log("made it here!2 ");        
        const rowStr = event.target.name.substring(0, event.target.name.length - 1);
        const last = event.target.name.charAt(event.target.name.length - 1);
        
        // console.log("backspace ", event.target.value , "<- val")

        if (last == 1) {return;} // we include 6 for now :_)

        // const name = `[name="${rowStr}${parseInt(last) + 1}]`;
        if (!event.target.value) {  
            console.log(document.getElementsByName(rowStr + ((parseInt(last) - 1)))[0].value = "" ); 
            document.getElementsByName(rowStr + ((parseInt(last) - 1)))[0].focus();
        }

        // $(name).focus();
        // console.log("focused!!!", rowStr, last, name);
        //if not letter change focus to next textbox?
        console.log("backspace!!!", event.target.name, document.getElementsByName(rowStr + (parseInt(last))));
        // alert('Enter is pressed!');
    }
});

// 🟥 🟧 🟨 🟩 ⬜ White Square 
function share() {
    let str = "";
    for (let i = 1; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            if (shareRef[i][j] === "G") {
                console.log("green");
                str += "&#129001";
            } else if (shareRef[i][j] === "Y") {
                console.log("yellow");

                str += "🟨";
            } else if (shareRef[i][j] === "R") {
                console.log("red");

                str += "🟥";
            } else if (shareRef[i][j] === "-") {
                console.log("w");

                str += "⬜";
            } 
        }
    }
    copyToClipboard(str);
}

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
