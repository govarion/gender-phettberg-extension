(function() {
  $.fn.replaceText = function( search, replace, text_only ) {
    return this.each(function(){
      var node = this.firstChild,
        val,
        new_val,
        remove = [];
      if ( node ) {
        do {
          if ( node.nodeType === 3 ) {
            val = node.nodeValue;
            if (search instanceof Array) {
                new_val = val;
                for (var i=0; i<search.length; i++) {
                    new_val = new_val.replace( search[i], replace );
                }
            } else {
                new_val = val.replace( search, replace );
            }
            if ( new_val !== val ) {
              if ( !text_only && /</.test( new_val ) ) {

                new_node = document.createTextNode(new_val);
                node.parentNode.insertBefore(new_node, node);
                remove.push( node );
              } else {
                node.nodeValue = new_val;
              }
            }
          }
        } while ( node = node.nextSibling );
      }
      remove.length && $(remove).remove();
    });
  };


var gender = "female",
    debug = false,
    searchRegex = [];


var search = [
    ["die", "der"],

    ["ihr(?:e|er|en|em)?", "sein(?:e|er|en|em)?"],

    ["[A-ZÄÖÜ]\\S+in", "[A-ZÄÖÜ]\\S+(?:er)?"],

    ["die\\s+\\S+in", "(?:der|den|dem)\\s+\\S+er"],
    ["die(?:\\s+\\S+){2}in", "(?:der|den|dem)(?:\\s+\\S+){2}er"],

    ["einer?\\s+\\S+in", "ein(?:es|en|em)?\\s+\\S+er"],
    ["einer?(?:\\s+\\S+){2}in", "ein(?:es|en|em)?(?:\\s+\\S+){2}er"],

    ["der\\s+\\S+in", "(?:der|dem|des)\\s+\\S+ers?"],
    ["der(?:\\s+\\S+){1,2}in", "(?:der|dem|des)(?:\\s+\\S+){1,2}ers?"],

    ["ihrer(?:\\s+\\S+){1,2}in", "(?:ihres|ihrem|ihren)(?:\\s+\\S+){1,2}ens?"],

    ["seiner(?:\\s+\\S+){1,2}in", "(?:seines|seinem|seinen)(?:\\s+\\S+){1,2}ens?"]

];

// generate "searchRegex" out of "search". Currently, for every Array in
// "search", there will be one regex in "searchRegex". This means that the
// replaceText function gets an Array of regexes (instead of a single regex)
// and applies all of them to the element.
// It would be optimal to have a single regex as output.
for (var i=0; i<search.length; i++) {
    searchRegex.push(new RegExp('(' + search[i][0] + ')\\/(' + search[i][1] + ')', 'gm'));
}

if (gender == "female") {
    searchRegex.push(/(ihrer(?:\s+\S+){1,2}in),\s(seiner(?:\s+\S+){1,2}in)/gm);
} else {
    searchRegex.push(/((?:ihres|ihrem|ihren)(?:\s+\S+){1,2}ens?),\s((?:seines|seinem|seinen)(?:\s+\S+){1,2}ens?)/gm);
}


// old regexes
// "(?:(ihre)/(seine))|(?:(ihr)/(sein))|(?:(die\s.*)/(der\s.* ))"
// /(ihre|ihr|die(?:\s+\S+){1,2}in|\S+in|der(?:\s+\S+){1,2}in)\/(seine|sein|der\s+.*?er|den(?:\s+\S+){1,2}|den(?:\s+\S+){1,2}|\S+)/gm

// build replacementtext, based on gender. $1 and $2 backreference regex matches
replaceText = gender == "female" ? "$1" : "$2";

// mark found strings in green if debug is active
if (debug === true) {
    replaceText = "<span style='background:#CCFF99; color: black'><strong>" +
                   replaceText +
                   "</strong> ('$1' vs  '$2')</span>";
}


// finally run the text replacement on all elements in the body
$('body *').replaceText(searchRegex, replaceText);

});