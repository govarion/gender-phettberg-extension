(function() {

  chrome.extension.sendRequest({method: "getLocalStorage", key: "gender"}, function(response) {

    const regExBinnenI = /\b([A-ZÄÜÖ][a-zäüö]+)(In(nen)?)\b/g; // zu ersetzen durch "$1*$2"
    const regExPlural = /\b([A-ZÄÜÖa-zäüö]+)(\_|\*|\:|\/-|\/|(\s\/)|(\s\/-)|(\s\/\s-)+)(innen)\b/gi; // zu ersetzen durch "$1ys"
    const regExSingle = /\b([A-ZÄÜÖa-zäüö]+)(\_|\*|\:|\/-|\/|(\s\/)|(\s\/-)|(\s\/\s-)+)(in|e)\b/gi; // zu ersetzen durch "$1y"
    const regExPronomenNominativ = /(der\/die|die\/der)/gi; // zu ersetzen durch 'das'
    const regExPronomenGenitiv = /(des\/der|der\/des)/gi; // zu ersetzen durch 'des'
    const regExPronomenDativ = /(dem\/der|der\/dem)/gi; // zu ersetzen durch 'dem'
    const regExPronomenAkkusativ = /(den\/die|die\/den)/gi; // zu ersetzen durch 'das'
    const regFixGenitiv = /(\bdes\ [a-zäöü]+)(y)\b/gi; // zu ersetzen durch '$1$2s'
    const regexMWD = /(\ [\(]?m\/w\/d[\)]?)/gi; // zu ersetzen durch ''
    const regexMW = /(\ [\(]?m\/w[\)]?)/gi; // zu ersetzen durch ''

    function genderPhettberg(textNode) {
      if(textNode.parentNode.nodeName in ['STYLE', 'SCRIPT', 'PRE', 'CODE'])
      return;

      var replaced = textNode.data
      replaced = replaced.replaceAll(regExBinnenI,'$1*$2');
      replaced = replaced.replaceAll(regExPlural,'$1ys');
      replaced = replaced.replaceAll(regExSingle,'$1y');
      replaced = replaced.replaceAll(regExPronomenNominativ,'das');
      replaced = replaced.replaceAll(regExPronomenGenitiv,'des');
      replaced = replaced.replaceAll(regExPronomenDativ,'dem');
      replaced = replaced.replaceAll(regExPronomenAkkusativ,'das');
      replaced = replaced.replaceAll(regFixGenitiv,'$1$2s');
      replaced = replaced.replaceAll(regexMWD,'');
      replaced = replaced.replaceAll(regexMW,'');
      if(replaced !== textNode.data)
      textNode.data = replaced;
    }

    function replaceTraverse(node) {
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if(child.nodeType == 1)
        replaceTraverse(child);
        else if(child.nodeType == 3)
        genderPhettberg(child);
      }
    }

    function replaceAny() {
      var nodes = document.getElementsByTagName('*');
      for(var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        for(var j = 0; j < el.childNodes.length; j++) {
          var node = el.childNodes[j];
          if(node.nodeType == 3)
          genderPhettberg(node);
        }
      }
    }

    replaceAny();

    document.addEventListener("DOMNodeInserted", function(e) {
      replaceTraverse(e.target);
    }, false);

  });

})();
