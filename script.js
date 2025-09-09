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

    addText(`Il giorno ${dataRiunione} dalle ore ${oraInizio} alle ore ${oraFine} si è riunito il consiglio della classe ${classe} per la trattazione dell'ordine del giorno:`);

    argomenti.forEach((a, i) => addText(`${i + 1}) ${a.titolo}`, 15));

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
        if (a.descrizione) addText(a.descrizione, 20);
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
            addText(s.sintesi, 25);
        }
        if (s.decisioni) {
            addText("Decisioni/Delibere:", 20);
            addText(s.decisioni, 25);
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
        if (varieSintesi) { addText("Sintesi:", 20); addText(varieSintesi, 25); }
        if (varieDecisioni) { addText("Decisioni/Delibere:", 20); addText(varieDecisioni, 25); }
        if (varieAllegati) { addText("Allegati:", 20); addText(varieAllegati, 25); }
    }

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

// -------- Inizializzazione --------
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('input', function(e) {
        if (e.target.closest('.agenda-item') && e.target.type === 'text') {
            aggiornaSezioneSvolgimento();
        }
    });

    // Aggiungo 2 argomenti di default
    aggiungiArgomento();
    document.querySelector('.agenda-item input[type="text"]').value = 'Verifica situazione didattica della classe';

    aggiungiArgomento();
    document.querySelector('.agenda-item:last-child input[type="text"]').value = 'Programmazione attività future';

    aggiornaSezioneSvolgimento();
});
