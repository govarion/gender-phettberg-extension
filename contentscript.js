(function() {
    var gender = "female",
        debug = false,
        searchRegex = [];

    var search = [
        ["die", "der"],

        ["ihr(?:e|er|en|em)?", "sein(?:e|er|en|em)?"],

        ["[A-ZÄÖÜ]\\S+in(?:nen)?", "[A-ZÄÖÜ]\\S+(?:er)?"],

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
    // and applies all of them to the element. This is not very fast.
    for (var i=0; i<search.length; i++) {
        searchRegex.push(new RegExp('(' + search[i][0] + ')\\/(' + search[i][1] + ')', 'gm'));
    }

    // add special regexes for double-gendered sentences.  e.g.:
    // > ihrer unternehmerischen Kundin/ihres unternehmerischen Kunden,
    // > seiner unternehmerischen Kundin/seines unternehmerischen Kunden
    if (gender === "female") {
        searchRegex.push(/(ihrer(?:\s+\S+){1,2}in),\s(seiner(?:\s+\S+){1,2}in)/gm);
    } else {
        searchRegex.push(/((?:ihres|ihrem|ihren)(?:\s+\S+){1,2}ens?),\s((?:seines|seinem|seinen)(?:\s+\S+){1,2}ens?)/gm);
    }

    // build replacementtext, based on chosen gender.
    // $1 and $2 are backreference for regex matches
    replaceText = gender === "female" ? "$1" : "$2";


    function replace(textNode) {
        if(textNode.parentNode.nodeName in ['STYLE', 'SCRIPT', 'PRE', 'CODE'])
            return;

        replaced = replaceOne(textNode.data, searchRegex, replaceText);

        if(replaced !== textNode.data)
            textNode.data = replaced;
    }

    function replaceOne(val, search, replace) {
        var new_val;

        if (search instanceof Array) {
            new_val = val;
            for (var i=0; i<search.length; i++) {
                new_val = new_val.replace( search[i], replace );
            }
        } else {
            new_val = val.replace( search, replace );
        }

        return new_val;
    }

    function replaceTraverse(node) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if(child.nodeType == 1)
                replaceTraverse(child);
            else if(child.nodeType == 3)
                replace(child);
        }
    }

    function replaceAll() {
        var nodes = document.getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            for(var j = 0; j < el.childNodes.length; j++) {
                var node = el.childNodes[j];
                if(node.nodeType == 3)
                    replace(node);
            }
        }
    }

    replaceAll();

    document.addEventListener("DOMNodeInserted", function(e) {
        replaceTraverse(e.target);
    }, false);

})();
