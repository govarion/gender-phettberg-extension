ungender-extension
==================

Eine Google Chrome Extension um unlesbar gegenderte deutsche Webseiten zu raparieren.

## Motivation

[Dieses WKO-Dokument](https://www.usp.gv.at/Portal.Node/usp/public/content/steuern_und_finanzen/umsatzsteuer/umsaetze_innerhalb_eu/grenzueberschreitende_dienstleistungen/40954.html) war für mich unlesbar, daher musste ein Script her um die gegenderten Sätze zu vereinfachen.

aus dem ersten Absatz:

> So wird eine Dienstleistung (sonstige Leistung), wenn **die Empfängerin/der
> Empfänger** **Unternehmerin/Unternehmer** ist, an dem Ort ausgeführt, an dem **die
> Unternehmerin/der Unternehmer** **ihr/sein** Unternehmen betreibt, **ihre/seine**
> Betriebsstätte sich befindet. Ist **die Empfängerin/der Empfänger**
> **Nichtunternehmerin/Nichtunternehmer**, wird die sonstige Leistung an dem Ort
> ausgeführt, an dem **die leistende Unternehmerin/der leistende Unternehmer**
> **ihr/sein** Unternehmen (Betriebsstätte) betreibt.

nach dem Skript (männliche Version):

> So wird eine Dienstleistung (sonstige Leistung), wenn **der Empfänger**
> **Unternehmer** ist, an dem Ort ausgeführt, an dem **der Unternehmer** **sein**
> Unternehmen betreibt, **seine** Betriebsstätte sich befindet. Ist **der Empfänger**
> **Nichtunternehmer**, wird die sonstige Leistung an dem Ort ausgeführt, an dem
> **der leistende Unternehmer** **sein** Unternehmen (Betriebsstätte) betreibt.

oder in der weiblichen Version:


> So wird eine Dienstleistung (sonstige Leistung), wenn **die Empfängerin**
> **Unternehmerin** ist, an dem Ort ausgeführt, an dem **die Unternehmerin** **ihr**
> Unternehmen betreibt, **ihre** Betriebsstätte sich befindet. Ist **die Empfängerin**
> **Nichtunternehmerin** wird die sonstige Leistung an dem Ort ausgeführt, an dem
> **die leistende Unternehmerin** **ihr** Unternehmen (Betriebsstätte) betreibt.

## Thanks

Thanks to [Andreas Jansson](https://github.com/andreasjansson), most of the text replacement code is from his [Ungender Chrome Extension](https://github.com/andreasjansson/the-ungender)