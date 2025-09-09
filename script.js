let contatoreArgomenti = 0;

// -------- Partecipanti --------

// Docenti Presenti
function aggiungiDocente() {
    const input = document.getElementById('nuovoDocente');
    const nome = input.value.trim();
    if (nome) {
        const lista = document.getElementById('docentiList');
        const div = document.createElement('div');
        div.className = 'participant-item';
        div.innerHTML = `
            <span>${nome}</span>
            <button class="btn btn-small" onclick="this.parentElement.remove()" style="margin-left: auto;">Rimuovi</button>
        `;
        lista.appendChild(div);
        input.value = '';
    }
}

// Genitori Presenti
function aggiungiGenitore() {
    const input = document.getElementById('nuovoGenitore');
    const nome = input.value.trim();
    if (nome) {
        const lista = document.getElementById('genitoriList');
        const div = document.createElement('div');
        div.className = 'participant-item';
        div.innerHTML = `
            <span>${nome}</span>
            <button class="btn btn-small" onclick="this.parentElement.remove()" style="margin-left: auto;">Rimuovi</button>
        `;
        lista.appendChild(div);
        input.value = '';
    }
}

// Docenti Assenti
function aggiungiDocenteAssente() {
    const input = document.getElementById('nuovoDocenteAssente');
    const nome = input.value.trim();
    if (nome) {
        const lista = document.getElementById('docentiAssentiList');
        const div = document.createElement('div');
        div.className = 'participant-item';
        div.innerHTML = `
            <span>${nome}</span>
            <button class="btn btn-small" onclick="this.parentElement.remove()" style="margin-left: auto;">Rimuovi</button>
        `;
        lista.appendChild(div);
        input.value = '';
    }
}

// Genitori Assenti
function aggiungiGenitoreAssente() {
    const input = document.getElementById('nuovoGenitoreAssente');
    const nome = input.value.trim();
    if (nome) {
        const lista = document.getElementById('genitoriAssentiList');
        const div = document.createElement('div');
        div.className = 'participant-item';
        div.innerHTML = `
            <span>${nome}</span>
            <button class="btn btn-small" onclick="this.parentElement.remove()" style="margin-left: auto;">Rimuovi</button>
        `;
        lista.appendChild(div);
        input.value = '';
    }
}

// Gestione invio con Enter
['nuovoDocente','nuovoGenitore','nuovoDocenteAssente','nuovoGenitoreAssente'].forEach(id => {
    document.addEventListener('DOMContentLoaded', () => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', e => {
                if (e.key === 'Enter') {
                    if (id === 'nuovoDocente') aggiungiDocente();
                    if (id === 'nuovoGenitore') aggiungiGenitore();
                    if (id === 'nuovoDocenteAssente') aggiungiDocenteAssente();
                    if (id === 'nuovoGenitoreAssente') aggiungiGenitoreAssente();
                }
            });
        }
    });
});

// -------- Ordine del Giorno --------
function aggiungiArgomento() {
    contatoreArgomenti++;
    const container = document.getElementById('agendaContainer');
    const div = document.createElement('div');
    div.className = 'agenda-item';
    div.dataset.id = Date.now() + Math.random(); // 🔑 ID univoco
    div.innerHTML = `
        <div class="agenda-header">
            <div style="display: flex; align-items: center; flex: 1; margin-right: 5px !important;">
                <div class="agenda-number">${contatoreArgomenti}</div>
                <input type="text" placeholder="Titolo argomento..." style="flex: 1;" onchange="aggiornaSezioneSvolgimento()">
            </div>
            <div>
                <button class="btn btn-small" onclick="toggleArgomento(this)">▼</button>
                <button class="btn btn-small" onclick="rimuoviArgomento(this)">Rimuovi</button>
            </div>
        </div>
        <div class="agenda-content">
            <textarea placeholder="Descrizione dettagliata dell'argomento..." style="margin-top: 10px;"></textarea>
        </div>
    `;
    container.appendChild(div);
    aggiornaSezioneSvolgimento();
}

function rimuoviArgomento(button) {
    button.closest('.agenda-item').remove();
    rinumeraArgomenti();
    aggiornaSezioneSvolgimento();
}

function rinumeraArgomenti() {
    const argomenti = document.querySelectorAll('#agendaContainer .agenda-number');
    argomenti.forEach((numero, index) => {
        numero.textContent = index + 1;
    });
    contatoreArgomenti = argomenti.length;
}

function toggleArgomento(button) {
    const content = button.closest('.agenda-item').querySelector('.agenda-content');
    if (content.style.display === 'none') {
        content.style.display = '';
        button.textContent = '▼';
    } else {
        content.style.display = 'none';
        button.textContent = '▶';
    }
    aggiornaSezioneSvolgimento();
}

function aggiornaSezioneSvolgimento() {
    const container = document.getElementById('svolgimentoContainer');
    const argomenti = document.querySelectorAll('#agendaContainer .agenda-item');

    // 1. Salvo i testi attuali usando id
    const testiSalvati = {};
    container.querySelectorAll('.agenda-item').forEach(item => {
        const id = item.dataset.id;
        testiSalvati[id] = {
            sintesi: item.querySelector('textarea.sintesi')?.value || '',
            decisioni: item.querySelector('textarea.decisioni')?.value || ''
        };
    });

    // 2. Ricostruisco
    container.innerHTML = '';

    argomenti.forEach((item, index) => {
        const titolo = item.querySelector('input[type="text"]').value || `Argomento ${index + 1}`;
        const collapsed = item.querySelector('.agenda-content')?.style.display === 'none';
        const id = item.dataset.id;

        const sintesi = testiSalvati[id]?.sintesi || '';
        const decisioni = testiSalvati[id]?.decisioni || '';

        const div = document.createElement('div');
        div.className = 'agenda-item';
        div.dataset.id = id;
        div.innerHTML = `
            <div class="agenda-header" style="display: flex; align-items: center; gap: 10px; justify-content: flex-start;">
                <div class="agenda-number">${index + 1}</div>
                <h4 style="margin: 0; color: #555;">${titolo}</h4>
            </div>
            <div class="agenda-content" style="margin-top: 10px; ${collapsed ? 'display:none;' : ''}">
                <div class="form-row" style="margin-top: 10px;">
                    <div class="form-group">
                        <label>Sintesi Discussione</label>
                        <textarea class="sintesi" placeholder="Riassunto della discussione...">${sintesi}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Decisioni/Delibere</label>
                        <textarea class="decisioni" placeholder="Decisioni assunte o delibere approvate...">${decisioni}</textarea>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// -------- Stampa --------
async function stampaVerbale() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const footerMargin = 25; // spazio dal fondo per linea e footer
    const pageWidth = doc.internal.pageSize.width;

    // --- Intestazione immagine ---
    const imgWidth = pageWidth - 20;          // margine 10px a destra e sinistra
    const imgHeight = imgWidth * 0.2866;      // mantiene proporzioni originali
    doc.addImage(headerBase64, "PNG", 10, 10, imgWidth, imgHeight);

    let y = imgHeight + 20; // spazio dopo intestazione

    // --- Controlla se serve una nuova pagina ---
    function checkPageBreak(nextLineHeight) {
        if (y + nextLineHeight > pageHeight - footerMargin) {
            doc.addPage();
            y = 20; // riparte dall’alto della nuova pagina
        }
    }

    // --- Helper per aggiungere testo con gestione cambio pagina ---
    function addText(text, x = 15, lineHeight = 6, maxWidth = 175) {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach(line => {
            if (y > pageHeight - footerMargin) {
                doc.addPage();
                y = 20;
            }
            doc.text(line, x, y);
            y += lineHeight;
        });
        y += 2; // spazio tra blocchi
    }

    // --- Testo giustificato ---
    function addJustifiedText(text, x = 15, lineHeight = 6, maxWidth = 175) {
        const words = text.split(/\s+/);
        let line = [];

        words.forEach((word) => {
            const testLine = [...line, word].join(" ");
            const testWidth = doc.getTextWidth(testLine);

            if (testWidth > maxWidth && line.length > 0) {
                stampaRiga(line, x, lineHeight, maxWidth);
                line = [word];
            } else {
                line.push(word);
            }
        });

        // Ultima riga (non giustificata)
        if (line.length > 0) {
            checkPageBreak(lineHeight);
            doc.text(line.join(" "), x, y);
            y += lineHeight;
        }

        y += 2; // spazio extra tra paragrafi
    }

    // --- Testo con rispetto degli a capo (solo per Allegati) ---
    function addTextWithNewlines(text, x = 15, lineHeight = 6, maxWidth = 175) {
        text = text == null ? '' : String(text);
        const paragraphs = text.split(/\r\n|\r|\n/);

        paragraphs.forEach((para, idx) => {
            if (!para) {
                // riga vuota
                checkPageBreak(lineHeight);
                y += lineHeight;
            } else {
                const words = para.split(/\s+/);
                let line = [];

                words.forEach((word) => {
                    const testLine = [...line, word].join(" ");
                    const testWidth = doc.getTextWidth(testLine);

                    if (testWidth > maxWidth && line.length > 0) {
                        stampaRiga(line, x, lineHeight, maxWidth);
                        line = [word];
                    } else {
                        line.push(word);
                    }
                });

                // ultima riga del paragrafo
                if (line.length > 0) {
                    checkPageBreak(lineHeight);
                    doc.text(line.join(" "), x, y);
                    y += lineHeight;
                }
            }
            // spazio extra solo tra paragrafi
            if (idx < paragraphs.length - 1) y += 2;
        });
    }


    // --- Stampa una riga giustificata ---
    function stampaRiga(line, x, lineHeight, maxWidth) {
        checkPageBreak(lineHeight);

        const spaceCount = line.length - 1;
        if (spaceCount > 0) {
            const extraSpace = (maxWidth - doc.getTextWidth(line.join(" "))) / spaceCount;
            let cursorX = x;
            line.forEach((w, i) => {
                doc.text(w, cursorX, y);
                if (i < line.length - 1) {
                    cursorX += doc.getTextWidth(w + " ") + extraSpace;
                }
            });
        } else {
            doc.text(line[0], x, y);
        }
        y += lineHeight;
    }


    // --- Recupero dati ---
    const numeroSeduta = document.getElementById('numeroSeduta').value || '';
    const classe = document.getElementById('classe').value || '';
    const rawDate = document.getElementById('dataRiunione').value || '';
    const oraInizio = document.getElementById('oraInizio').value || '';
    const oraFine = document.getElementById('oraFine').value || '';
    const presidente = document.getElementById('presidente').value || '';
    const segretario = document.getElementById('segretario').value || '';

    let dataRiunione = rawDate;
    if (rawDate) {
        const parts = rawDate.split('-');
        dataRiunione = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    const docentiPresenti = [...document.querySelectorAll('#docentiList span')].map(el => el.textContent).join(', ') || '-';
    const genitoriPresenti = [...document.querySelectorAll('#genitoriList span')].map(el => el.textContent).join(', ') || '-';
    const docentiAssenti = [...document.querySelectorAll('#docentiAssentiList span')].map(el => el.textContent).join(', ') || '-';
    const genitoriAssenti = [...document.querySelectorAll('#genitoriAssentiList span')].map(el => el.textContent).join(', ') || '-';

    const argomenti = [...document.querySelectorAll('#agendaContainer .agenda-item')].map((item, i) => ({
        titolo: item.querySelector('input')?.value || `Argomento ${i + 1}`,
        descrizione: item.querySelector('textarea')?.value || ''
    }));

    const svolgimenti = [...document.querySelectorAll('#svolgimentoContainer .agenda-item')].map((item, i) => ({
        titolo: item.querySelector('h4')?.textContent || `Argomento ${i + 1}`,
        sintesi: item.querySelector('textarea.sintesi')?.value || '',
        decisioni: item.querySelector('textarea.decisioni')?.value || ''
    }));

    const varieSintesi = document.getElementById('varieSintesi').value || '';
    const varieDecisioni = document.getElementById('varieDecisioni').value || '';
    const varieAllegati = document.getElementById('varieAllegati').value || '';

    const titoloVerbale = `VERBALE DELLA SEDUTA N. ${numeroSeduta}`;

    // --- Titolo ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(titoloVerbale, pageWidth / 2, y, { align: "center" });
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    addText(`Il giorno ${dataRiunione} alle ore ${oraInizio} si è riunito il consiglio della classe ${classe} per la trattazione dell'ordine del giorno:`);

    argomenti.forEach((a, i) => addText(`${i + 1}) ${a.titolo}`, 20));

    addText(`Sono presenti gli insegnanti: ${docentiPresenti}`);
    addText(`e i genitori: ${genitoriPresenti}`);
    addText(`Sono assenti gli insegnanti: ${docentiAssenti}`);
    addText(`e i genitori: ${genitoriAssenti}`);
    addText(`Presiede la riunione ${presidente}`);
    addText(`Funge da Segretario ${segretario}`);
    y += 6;

    // --- Ordine del Giorno dettagliato ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    addText("Ordine del Giorno:");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    argomenti.forEach((a, i) => {
        addText(`${i + 1}) ${a.titolo}`, 15);
        if (a.descrizione) addJustifiedText(a.descrizione, 20);
    });

    // --- Svolgimento e Decisioni ---
    y += 6;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    addText("Svolgimento e Decisioni:");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    svolgimenti.forEach((s, i) => {
        addText(`${i + 1}) ${s.titolo}`, 15);
        if (s.sintesi) {
            addText("Sintesi:", 20);
            addJustifiedText(s.sintesi, 25);
        }
        if (s.decisioni) {
            addText("Decisioni/Delibere:", 20);
            addJustifiedText(s.decisioni, 25);
        }
    });

    // --- Varie ed Eventuali ---
    y += 6;
    if (varieSintesi || varieDecisioni || varieAllegati) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        addText("Varie ed Eventuali:");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        if (varieSintesi) { addText("Sintesi:", 20); addJustifiedText(varieSintesi, 25); }
        if (varieDecisioni) { addText("Decisioni/Delibere:", 20); addJustifiedText(varieDecisioni, 25); }
        if (varieAllegati) { addText("Allegati:", 20); addTextWithNewlines(varieAllegati, 25); }
    }

    // --- Sezione Conclusione (blocco indivisibile) ---
    y += 6;
    let conclusione1 = `Esauriti i punti all'ordine del giorno viene tolta la seduta alle ore ${oraFine}.`;
    let conclusione2 = `Letto, confermato e sottoscritto.`;
    let blockHeight = 6 * 2 + 4; // 2 righe con lineHeight=6 + un margine extra

    // Controllo se c'è abbastanza spazio nella pagina
    if (y + blockHeight > pageHeight - footerMargin) {
        doc.addPage();
        y = 20; // reset margine top per nuova pagina
    }

    let conclusione1Width = doc.getTextWidth(conclusione1);
    doc.text(conclusione1, (pageWidth - conclusione1Width) / 2, y);
    y += 6;
    let conclusione2Width = doc.getTextWidth(conclusione2);
    doc.text(conclusione2, (pageWidth - conclusione2Width) / 2, y);

    // --- Sezione firme (blocco indivisibile) ---
    y += 20;
    const firmaBlockHeight = 30;
    if (y + firmaBlockHeight > pageHeight - footerMargin) { doc.addPage(); y = 20; }

    doc.setFontSize(12);
    const colSegretarioX = pageWidth / 3;
    const colPresidenteX = (pageWidth / 3) * 2;

    // Segretario
    doc.setFont("helvetica", "bold");
    doc.text("IL SEGRETARIO", colSegretarioX, y, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text(segretario, colSegretarioX, y + 6, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(colSegretarioX - 30, y + 25, colSegretarioX + 30, y + 25);

    // Presidente
    doc.setFont("helvetica", "bold");
    doc.text("IL PRESIDENTE", colPresidenteX, y, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text(presidente, colPresidenteX, y + 6, { align: "center" });
    doc.line(colPresidenteX - 30, y + 25, colPresidenteX + 30, y + 25);

    // --- Numeri pagina e footer ---
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(0);
        doc.setLineWidth(0.3);
        doc.line(10, pageHeight - footerMargin + 5, 200, pageHeight - footerMargin + 5);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(titoloVerbale, pageWidth / 2, pageHeight - 10, { align: "center" });
        doc.setFont("helvetica", "normal");
        doc.text(`Pagina ${i} di ${totalPages}`, 200, pageHeight - 10, { align: "right" });
    }

    doc.save(`Verbale_seduta_${numeroSeduta || 'senza_numero'}.pdf`);
}

// -----------------------------
// Salvataggio su localStorage
// -----------------------------
function salvaDati() {
    try {
        const dati = {
            numeroSeduta: document.getElementById('numeroSeduta').value || '',
            classe: document.getElementById('classe').value || '',
            dataRiunione: document.getElementById('dataRiunione').value || '',
            oraInizio: document.getElementById('oraInizio').value || '',
            oraFine: document.getElementById('oraFine').value || '',
            presidente: document.getElementById('presidente').value || '',
            segretario: document.getElementById('segretario').value || '',

            docentiPresenti: [...document.querySelectorAll('#docentiList span')].map(s => s.textContent),
            genitoriPresenti: [...document.querySelectorAll('#genitoriList span')].map(s => s.textContent),
            docentiAssenti: [...document.querySelectorAll('#docentiAssentiList span')].map(s => s.textContent),
            genitoriAssenti: [...document.querySelectorAll('#genitoriAssentiList span')].map(s => s.textContent),

            // ordine del giorno: titolo, descrizione, id, collapsed
            argomenti: [...document.querySelectorAll('#agendaContainer .agenda-item')].map(item => ({
                id: item.dataset.id || (Date.now() + Math.random()).toString(),
                titolo: item.querySelector('input[type="text"]')?.value || '',
                descrizione: item.querySelector('textarea')?.value || '',
                collapsed: item.querySelector('.agenda-content')?.style.display === 'none'
            })),

            // svolgimenti (collegati tramite lo stesso data-id)
            svolgimenti: [...document.querySelectorAll('#svolgimentoContainer .agenda-item')].map(item => ({
                id: item.dataset.id,
                sintesi: item.querySelector('textarea.sintesi')?.value || '',
                decisioni: item.querySelector('textarea.decisioni')?.value || ''
            })),

            varieSintesi: document.getElementById('varieSintesi').value || '',
            varieDecisioni: document.getElementById('varieDecisioni').value || '',
            varieAllegati: document.getElementById('varieAllegati').value || ''
        };

        localStorage.setItem('verbaleConsiglio_v1', JSON.stringify(dati));
        // console.log('Salvato localStorage', dati);
    } catch (e) {
        console.warn('Errore salvataggio localStorage', e);
    }
}

// debounce minimo per evitare troppi scritti su localStorage
function debounce(fn, wait = 250) {
    let t = null;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}
const debouncedSave = debounce(salvaDati, 300);


// -----------------------------
// Caricamento da localStorage
// -----------------------------
function caricaDati() {
    try {
        const raw = localStorage.getItem('verbaleConsiglio_v1');
        if (!raw) return false;
        const dati = JSON.parse(raw);
        if (!dati || Object.keys(dati).length === 0) return false;

        // campi generali
        document.getElementById('numeroSeduta').value = dati.numeroSeduta || '';
        document.getElementById('classe').value = dati.classe || '';
        document.getElementById('dataRiunione').value = dati.dataRiunione || '';
        document.getElementById('oraInizio').value = dati.oraInizio || '';
        document.getElementById('oraFine').value = dati.oraFine || '';
        document.getElementById('presidente').value = dati.presidente || '';
        document.getElementById('segretario').value = dati.segretario || '';

        // helper per ripristinare liste partecipanti
        function ripristinaLista(idLista, arr) {
            const lista = document.getElementById(idLista);
            lista.innerHTML = '';
            (arr || []).forEach(nome => {
                const div = document.createElement('div');
                div.className = 'participant-item';
                div.innerHTML = `<span>${nome}</span>
                    <button class="btn btn-small" onclick="this.parentElement.remove(); salvaDati()" style="margin-left:auto;">Rimuovi</button>`;
                lista.appendChild(div);
            });
        }
        ripristinaLista('docentiList', dati.docentiPresenti);
        ripristinaLista('genitoriList', dati.genitoriPresenti);
        ripristinaLista('docentiAssentiList', dati.docentiAssenti);
        ripristinaLista('genitoriAssentiList', dati.genitoriAssenti);

        // ripristino ordine del giorno
        const agenda = document.getElementById('agendaContainer');
        agenda.innerHTML = '';
        contatoreArgomenti = 0;
        (dati.argomenti || []).forEach(a => {
            contatoreArgomenti++;
            const div = document.createElement('div');
            div.className = 'agenda-item';
            div.dataset.id = a.id || (Date.now() + Math.random()).toString();
            div.innerHTML = `
                <div class="agenda-header">
                    <div style="display: flex; align-items: center; flex: 1; margin-right: 5px !important;">
                        <div class="agenda-number">${contatoreArgomenti}</div>
                        <input type="text" placeholder="Titolo argomento..." style="flex: 1;" onchange="aggiornaSezioneSvolgimento()" value="${(a.titolo||'').replace(/"/g,'&quot;')}">
                    </div>
                    <div>
                        <button class="btn btn-small" onclick="toggleArgomento(this)">${a.collapsed ? '▶' : '▼'}</button>
                        <button class="btn btn-small" onclick="rimuoviArgomento(this)">Rimuovi</button>
                    </div>
                </div>
                <div class="agenda-content" style="${a.collapsed ? 'display:none;' : ''}">
                    <textarea placeholder="Descrizione dettagliata dell'argomento..." style="margin-top: 10px;">${(a.descrizione||'')}</textarea>
                </div>
            `;
            agenda.appendChild(div);
        });

        // ricostruisci sezione svolgimento (crea gli elementi)
        aggiornaSezioneSvolgimento();

        // ripristina contenuti svolgimento
        (dati.svolgimenti || []).forEach(s => {
            const item = document.querySelector(`#svolgimentoContainer .agenda-item[data-id="${s.id}"]`);
            if (item) {
                const sint = item.querySelector('textarea.sintesi');
                const dec = item.querySelector('textarea.decisioni');
                if (sint) sint.value = s.sintesi || '';
                if (dec) dec.value = s.decisioni || '';
            }
        });

        // varie ed eventuali
        document.getElementById('varieSintesi').value = dati.varieSintesi || '';
        document.getElementById('varieDecisioni').value = dati.varieDecisioni || '';
        document.getElementById('varieAllegati').value = dati.varieAllegati || '';

        // aggiorna numerazione (in caso)
        rinumeraArgomenti?.();
        return true;
    } catch (e) {
        console.warn('Errore caricamento localStorage', e);
        return false;
    }
}


// -------- Inizializzazione --------
document.addEventListener('DOMContentLoaded', function() {
    // carica da localStorage (se presente) PRIMA di aggiungere argomenti di default
    const loaded = caricaDati();

    // mantenere il comportamento che ricostruisce svolgimenti quando si modifica un titolo
    document.addEventListener('input', function(e) {
        if (e.target.closest('.agenda-item') && e.target.type === 'text') {
            aggiornaSezioneSvolgimento();
        }
        // salva debounced su ogni input
        debouncedSave();
    });

    // salva quando si cliccano i pulsanti (aggiungi/rimuovi)
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.btn')) {
            // le tue funzioni di aggiunta/rimozione già eseguiranno le modifiche;
            // qui salviamo (debounced) per sicurezza
            debouncedSave();
        }
    });

    // se non abbiamo nulla nel localStorage, creiamo i 2 argomenti di default (comportamento originale)
    if (!loaded) {
        aggiungiArgomento();
        document.querySelector('.agenda-item input[type="text"]').value = 'Verifica situazione didattica della classe';

        aggiungiArgomento();
        document.querySelector('.agenda-item:last-child input[type="text"]').value = 'Programmazione attività future';

        aggiornaSezioneSvolgimento();
        // salva iniziale
        salvaDati();
    } else {
        // se abbiamo caricato, assicurarsi che la sezione svolgimento sia aggiornata e salvare lo stato caricato (utile per aggiornare eventuali id)
        aggiornaSezioneSvolgimento();
        salvaDati();
    }
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    let clickTimer = null;

    logo.addEventListener('click', () => {
        clickCount++;

        // Resetta il contatore dopo 1 secondo dall'ultimo click
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 1000);

        if (clickCount >= 5) {
            clickCount = 0; // resetta il contatore
            mostraClearBtn();
        }
    });

    function mostraClearBtn() {
        let clearBtn = document.getElementById('clearStorageBtn');
        if (!clearBtn) {
            clearBtn = document.createElement('button');
            clearBtn.id = 'clearStorageBtn';
            clearBtn.textContent = 'Svuota Local Storage';
            clearBtn.style.position = 'fixed';
            clearBtn.style.bottom = '10px';
            clearBtn.style.right = '10px';
            clearBtn.style.zIndex = '1000';
            clearBtn.style.padding = '8px 12px';
            clearBtn.style.backgroundColor = '#7b0f14';
            clearBtn.style.color = 'white';
            clearBtn.style.border = 'none';
            clearBtn.style.borderRadius = '6px';
            clearBtn.style.cursor = 'pointer';
            document.body.appendChild(clearBtn);

            clearBtn.addEventListener('click', () => {
                if (confirm("Sei sicuro di voler svuotare tutto il localStorage?")) {
                    localStorage.clear();
                    location.reload();
                }
            });
        }

        clearBtn.style.display = 'block';
        clearBtn.focus();
    }

});
