function save_options() {
    var select = document.getElementById("gender");
    var gender = select.children[select.selectedIndex].value;
    localStorage["gender"] = gender;
}

function restore_options() {
    var gender = localStorage["gender"];
    if (!gender) {
        return;
    }
    var select = document.getElementById("gender");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == gender) {
            child.selected = "true";
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#gender').addEventListener('change', save_options);