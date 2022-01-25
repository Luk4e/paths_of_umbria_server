const express = require('express');
const cors = require('cors');

const app = express();

let paths = [
  {
    id:0,
    title: "Castel Rigone - Torre Fiume",
    description: "Si parte dalla piazza centrale di Castel Rigone e, dirigendosi verso le mura a ovest, attraversando le vie del borgo. Si percorre il belvedere e si scende in direzione di Rigonella. Da lì si scende lungo un sentiero che sfiora pascoli e una macchia costituita per lo più da cerro, roverella, ginepro, corbezzolo e ginestra. Si arriva all’agglomerato del Poggio che si lascia sulla destra proseguendo in discesa fino a incrociare la strada statale Castel Rigone - Lisciano Niccone. La si attraversa e seguendo la segnaletica si prosegue per la stradina che delimita il fianco alberato della collina separandolo dai coltivi e pascoli di Pian di Marte. Si piega a sinistra e da qui inizia la salita per la Torre di Fiume (424 m. s.lm.) che si raggiunge dopo alcuni tornanti. Dopo una breve sosta nei pressi dell’antica torre si prende sulla sinistra il sentiero che sale e si inoltra nel bosco di cerro e carpino bianco. Verso la sommità, intorno alla zona di Torre Civitella, si incontrano pascoli spesso interrotti da arbusteti a ginestra dei carbonai con macchie di eriche e cisti. Si imbocca l’ampia strada bianca di crinale andando verso sinistra, si attraversa la località di Trecine, godendo di ampi panorami verso il lago e i rilievi che lo contornano. Qui si riprende la strada asfaltata ombreggiata da antichi pini che ci riporta a Castel Rigone, con una breve variante in terra che passa a valle, nella zona del Galluzzo. ",
    km: 14.686,
    duration: "6:00",
    differenceAltitude: 595,
    difficult: "Escursionistica",
    date: new Date(),
  },
  {
    id: 1,
    title: "Itinerario del Castelliere",
    description: "Percorso di interesse paesaggistico che offre ampi scorci sugli Altipiani di Colfiorito in particolare sulla palude e sull’antico lago plestino e che permette  di andare alla scoperta dei castellieri, gli antichi insediamenti pre-romani. Dalla Casa del Parco di Colfiorito, si percorre un sentiero sterrato in  salita che conduce a Monte Orve, sede del più importante castelliere della zona. Proseguendo dalla cima ci si trova ad un quadrivio presso il quale,  svoltando a sinistra, si scende per una carrareccia alla Palude di Colfiorito. Si suggerisce una breve deviazione per visitare il Castelliere di Cassicchio, il  cui vallo è ancora perfettamente individuabile. Prendendo poi l’asfaltata verso sinistra, si ritorna a Colfiorito. ",
    km: 3.9,
    duration: "1:30",
    differenceAltitude: 158,
    difficult: "Turistica",
    date: new Date(),
  },
  {
    id: 2,
    title: "Fontignano-Montali - M. Solare",
    description: "Questo itinerario prende l’avvio dalla piazza di Fontignano per dirigersi, salendo, verso Montali. Uscendo dal borgo, sfiorata l’antica torre, si  attraversano oliveti sistemati a gradoni e macchie di roverella fino ad arrivare ad un pianoro panoramico coltivato a ciliegi. Di fronte si ha il colle di Montali con in cima la sua caratteristica fortificazione, sulla sinistra la vallata ricca di oliveti, pascoli e coltivi con Colle San Paolo e Mongiovino vecchio e per finire, sulla destra, una vista sulla vallata di Mugnano e il colle di Agello. Seguendo le indicazioni, in mezzo a esplosioni primaverili del giallo delle ginestre, si arriva a Montali (580 m.). Si aggira il complesso attualmente destinato ad attività turistica dirigendosi verso la chiesa posta a circa 200 metri con di fronte il bosco della Marzolana, il lago Trasimeno, Montalera e la piana agricola prospiciente il lago. Sulla destra i profili di Corciano e Perugia e delle loro colline chiudono l’orizzonte. Da qui si può apprezzare uno dei panorami più interessanti del versante meridionale del Trasimeno. Girando a sinistra si percorre lo stradone che va in direzione di Colle San Paolo per abbandonarlo dopo un po’ nella zona del passo di Porta Materna e entrare nel bosco di roverella e cerro seguendo il sentiero principale. Si sbuca sul fianco NE del Monte Solare in posizione panoramica, sopra la Villa Monte Solare e i suoi oliveti. Il percorso di mezza costa, fiorito e colorato in primavera, ci porta, scendendo poi verso sinistra alla bella Villa che con i suoi annessi ora è una struttura dedicata al turismo. Si riprende la strada che da Montaliporta a Colle San Paolo, per deviare poi ancora a sinistra e scendere lentamente, attraverso un paesaggio dolce e rilassante, verso Fontignano. ",
    km: 14.13,
    duration: "5:00",
    differenceAltitude: 530,
    difficult: "Escursionistica",
    date: new Date(),
  }

];

const generateId = () => {
  const maxId = paths.length > 0 ? Math.max(...paths.map(p => p.id)) : 0;
  return maxId;
};

const unknowEndpoint = (req,res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('<h1> Hello world</h1>')
});

app.get('/api/paths', (request, response) => {
  response.json(paths);
});

app.get('/api/paths/:id', (request, response) => {
  const id = Number(request.params.id);
  const path = paths.find(path => path.id === id);
  
  if(path){
    response.json(path);
  }else{
    response.status(404).end();
  }
  
});

app.delete('/api/paths/:id', (request, response) => {
  const id = Number(request.params.id);
  paths = paths.filter(path => path.id !== id);
  
  response.status(204).end();
  
});

app.post('/api/paths', (request,response) => {
  const body = request.body;

  if(!body.description){
    return response.status(400).json({
      error: 'content missig'
    });
  }

  const path = {
    id: generateId(),
    title: "Magione-Monte Ruffiano",
    description: "Il punto di partenza di questo itinerario è rappresentato dal cimitero di Magione. Si percorre uno stradello di crinale che attraversa aree coltivate a olivo. Lungo la strada si aprono vedute panoramiche sul lago Trasimeno e le sue isole. Il borgo che si intravede sulla sinistra è Montecolognola. Proseguendo il paesaggio si apre sulla valle della Goga con Colpiccione in primo piano, alcuni pini secolari e nuclei sparsi di cipressi. Si passa accanto al podere Petraia, alternando zone di bosco a tratti aperti, si imbocca una strada più ampia che si dirige verso la strada di collegamento tra il Trasimeno e Castel Rigone. Si attraversa la strada e si prende un piccolo sentiero che costeggia un’area archeologica sino ad arrivare a un bivio. Si sale verso Casa Quarantaia (494 metri) e si prende un sentiero molto panoramico che attraversa a mezza costa una zona di recente imboschimento (leccio e querce, cipressi, cedri). In poco tempo, seguendo i segnali, si arriva alla radura sotto il Monte Ruffiano. Si può salire alla cima del poggio dove si trovano i ruderi di una vecchia torre fortificata (423 metri). Dalla radura si torna indietro e si piega a destra prendendo un sentiero panoramico parallelo e più in basso rispetto al precedente. Si gode una bella prospettiva sulla chiesa di San Donato ed alcuni casali tipici. Si ritorna alla strada asfaltata e dopo averla attraversata si percorre lo stesso itinerario dell’andata sino al punto in cui si era usciti dal bosco all’altezza di una grande  proprietà agricola con casale ristrutturato di recente (I Pianelli). Da questo punto si prosegue in salita per la strada che si dirige verso il Colle Castelluccio (478 metri). Da qui seguendo la segnaletica in poco tempo si torna al punto di partenza.",
    km: 12.97,
    duration: "4:30",
    differenceAltitude: 460,
    difficult: "Escursionistica",
    date: new Date(),
  }

  paths = paths.concat(path);

  response.json(path);
});

app.use(unknowEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
