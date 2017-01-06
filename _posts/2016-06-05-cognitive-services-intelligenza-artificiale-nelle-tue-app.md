---
ID: 3101
post_title: 'Cognitive Services: Intelligenza Artificiale nelle tue App'
author: fabiocozzolino
post_date: 2016-06-05 16:23:23
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/cognitive-services-intelligenza-artificiale-nelle-tue-app/
published: true
dsq_thread_id:
  - "5297975330"
---
Durante la BUILD 2016 di Microsoft tenuta a San Francisco lo scorso aprile, sono state annunciate diverse novità in grado di portare all'interno delle nostre applicazioni evoluzioni importanti. Una di queste, probabilmente la più rilevante, è senza dubbio l'Intelligenza Artificiale.

Due gli annunci principali:
<ul>
 	<li>Microsoft BOT Framework</li>
 	<li>Cognitive Services</li>
</ul>
Cosa sono i BOT Frameworks? Immaginate di voler integrare in applicazioni come Facebook Messenger, Skype o Slack un'assistente virtuale in grado di rispondere alle domande ed eseguire azioni come se si trattasse di una persona reale. Ecco, il BOT Framework fornisce tutti gli strumenti necessari per creare applicazioni in grado di fare tutto questo. Mi riprometto di parlarne in uno dei prossimi post.

Parallelamente ai BOT Framework, Microsoft ha presentato al pubblico anche i Cognitive Services, un set di API in grado di fornire alle applicazioni la capacità di vedere, ascoltare, interpretare ed interagire in modi molto simili a come farebbe una comune persone. Una soluzione assolutamente interessante che porta ad un livello superiore le possibilità di sviluppo delle nostre applicazioni. Ma vediamo come funzionano.

I Cognitive Services si dividono in 5 macro aree, ognuna con un set di servizi:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/06/CognitiveServices.jpg"><img class="alignnone size-full wp-image-3161" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/06/CognitiveServices.jpg" alt="CognitiveServices" width="720" height="405" /></a>
<h2>Cose da sapere</h2>
Il punto di partenza è senza dubbio il sito web <a href="https://www.microsoft.com/cognitive-services">https://www.microsoft.com/cognitive-services</a>. Qui potete trovare tutte le informazioni utili per attivare la vostra subscription. Sì, è ovviamente necessaria una sottoscrizione per poter utilizzare i Cognitive Services. Ogni servizio, fortunatamente, ha un limite di utilizzo gratuito. Ad esempio è possibile effettuare fino a 20 invocazioni al minuto per un massimo di 30000 al mese per il servizio di riconoscimento facciale (Face API).

Una volta attivata la sottoscrizione, potete visualizzare l'elenco dei servizi e ottenere le chiavi di autenticazione.

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-04-alle-11.52.51.png"><img class="alignnone size-full wp-image-3151" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-04-alle-11.52.51.png" alt="Schermata 2016-06-04 alle 11.52.51" width="764" height="213" /></a>

Potete utilizzare indifferentemente sia la Key 1 che la Key 2. Le chiavi devono essere poi utilizzate dal nostro client per invocare il servizio richiesto. E' possibile utilizzare i servizi in due diverse modalità:
<ul>
 	<li>REST API</li>
 	<li>Client SDK</li>
</ul>
<h2>Face REST API</h2>
In questo post vedremo come utilizzare una delle funzionalità dei Cognitive Services: le Face API. Il servizio è raggiungibile all'indirizzo <a href="https://api.projectoxford.ai/face/v1.0/detect">https://api.projectoxford.ai/face/v1.0/detect</a>. Il parametro obbligatorio è proprio la chiave che abbiamo visto in precedenza, che deve necessariamente essere indicata nell'header HTTP <span style="color: #000000;"><strong><span style="font-family: Menlo;">Ocp-Apim-Subscription-Key</span></strong></span>.

[code language="csharp"]
public async HttpResponseMessage DetectAsync(Stream stream)
{
	var url = &quot;https://api.projectoxford.ai/face/v1.0/detect&quot;;

	var requestContent = new StreamContent (stream);
	requestContent.Headers.Add (&quot;Ocp-Apim-Subscription-Key&quot;, your-subscription-key);
	requestContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue (&quot;application/octet-stream&quot;);
	var client = new HttpClient ();
	return await client.PostAsync (url, requestContent);
}
[/code]

Con questo codice inviamo un'immagine, contenente volti, al servizio di face detection, impostando la chiave nell'header. La risposta è un json simile a questo:

[code language="javascript"]
[
    {
        &quot;faceId&quot;: &quot;4a97f6af-bc7d-4c0c-be41-dca3eea0937f&quot;,
        &quot;faceRectangle&quot;: {
            &quot;top&quot;: 127,
            &quot;left&quot;: 306,
            &quot;width&quot;: 75,
            &quot;height&quot;: 75
        },
        &quot;faceLandmarks&quot;: {
            &quot;pupilLeft&quot;: {
                &quot;x&quot;: 330.3,
                &quot;y&quot;: 143.7
            },
            &quot;pupilRight&quot;: {
                &quot;x&quot;: 357.8,
                &quot;y&quot;: 149.0
            },
            ...
        },
        &quot;faceAttributes&quot;: {
            &quot;smile&quot;: 0.573,
            &quot;headPose&quot;: {
                &quot;pitch&quot;: 0.0,
                &quot;roll&quot;: 6.0,
                &quot;yaw&quot;: 20.7
            },
            &quot;gender&quot;: &quot;male&quot;,
            &quot;age&quot;: 39.4,
            &quot;facialHair&quot;: {
                &quot;moustache&quot;: 0.7,
                &quot;beard&quot;: 0.8,
                &quot;sideburns&quot;: 0.5
            },
            &quot;glasses&quot;: &quot;ReadingGlasses&quot;
        }
    }
]
[/code]

Il json riporta informazioni sulla posizione e dimensione del viso nell'immagine, la posizione di caratteristiche somatiche come le pupile, il naso, la bocca, etc... Infine, vengono riportate informazioni sul viso rilevato: ha la barba, i baffi o le basette, porta gli occhiali, l'età, il sesso, se sta sorridendo e l'eventuale inclinazione del viso.

Il json può essere trasformato in un set di classi C#. Ne riporto una parte per brevità:

[code language="csharp"]
public class FaceRectangle
{
	public int top { get; set; }
	public int left { get; set; }
	public int width { get; set; }
	public int height { get; set; }
}

public class Face
{
	public string faceId { get; set; }
	public FaceRectangle faceRectangle { get; set; }
}
[/code]

Infine, modifichiamo il nostro metodo DetectAsync per recuperare il JSON dalla risposta HTTP e deserializzarlo in un array di oggetti di tipo Face:

[code language="csharp"]
public async Task&lt;Face[]&gt; DetectAsync(Stream stream)
{
	...
	var client = new HttpClient ();
	var response = await client.PostAsync (url, requestContent);

	var responseContent = response.Content as StreamContent;
	var jsonResponse = await responseContent.ReadAsStringAsync ();

	return JsonConvert.DeserializeObject&lt;Face[]&gt; (jsonResponse);
}
[/code]

E voilà. Ora possiamo utilizzare la classe Face per recuperare le informazioni e tracciare un rettangolo intorno al viso.

[code language="csharp"]
var client = new FaceClient ();
var faces = await client.DetectAsync (inputImage);
foreach (var item in faces) {

	var layout = new StackLayout ();

	var box = new ShapeView ();
	box.ShapeType = ShapeType.Box;
	box.WidthRequest = (item.faceRectangle.width + 20) / 2;
	box.HeightRequest = (item.faceRectangle.height + 20) / 2;
	box.Color = Color.Transparent;
	box.BackgroundColor = Color.Transparent;
	box.StrokeColor = Color.White;
	box.StrokeWidth = 4;
	box.Padding = new Thickness (0);

	layout.Children.Add (box);

	bodyLayout.Children.Add (layout, new Point ((item.faceRectangle.left - 10) / 2, ((item.faceRectangle.top - 10) / 2) - 20));
}
[/code]

Il codice mostra come ciclare nel set di classi Face restituite dal servizio per costruire dei rettangoli intorno ai volti identificati nell'immagine. Il tutto all'interno di un'app sviluppata con Xamarin.Forms.
<h2>Microsoft Face API Client Library</h2>
Alternativamente, e più semplicemente, possiamo utilizzare l'SDK disponibile come pacchetto Nuget per usufruire delle Face API. Come primo passo aggiungiamo al nostro progetto il Microsoft Face API Client Library:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-05-alle-12.29.23.png"><img class="alignnone size-full wp-image-3191" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-05-alle-12.29.23.png" alt="Schermata 2016-06-05 alle 12.29.23" width="822" height="542" /></a>

Ora possiamo sostituire all'invocazione via REST API, l'utilizzo diretto della classe FaceServiceClient.

[code language="csharp"]
var client = new Microsoft.ProjectOxford.Face.FaceServiceClient (your-subscription-key);
var faces = await client.DetectAsync (inputImage);
foreach (var item in faces) {
    ...
}
[/code]

il resto del codice non cambia rispetto a quanto abbiamo fatto con le REST API.
<h2>Informazioni aggiuntive sui volti</h2>
Ma le Face API sono in grado di restituire molte più informazioni rispetto al semplice "rettangolo" che racchiude il volto. Per ottenerle è sufficiente specificare nella querystring i parametri:
<ul>
 	<li><strong>returnFaceId
</strong>restituisce l'identificativo del volto</li>
 	<li><strong>returnFaceLandmarks</strong>
restituisce informazioni sulle caratteristiche del volto, come la posizione degli occhi, della bocca, del naso, ecc...</li>
 	<li><strong>returnFaceAttributes</strong>
restituisce gli attributi del viso, come la barba, i baffi, il sorriso, l'età, il sesso, etc...</li>
</ul>
Utilizzando le Face API possiamo modificare l'URL utilizzato con questo:

[code language="csharp"]
var returnFaceId = true;
var returnFaceLandmarks = true;
var returnFaceAttributes = &quot;age,gender,smile,facialHair,headPose,glasses&quot;;
var url = $&quot;https://api.projectoxford.ai/face/v1.0/detect?returnFaceId={returnFaceId}&amp;amp;returnFaceLandmarks={returnFaceLandmarks}&amp;amp;returnFaceAttributes={returnFaceAttributes}&quot;;
[/code]

Per recuperare le informazioni dal JSON, infine, aggiungiamo le seguenti classi e la proprietà faceAttributes a quanto già scritto:

[code language="csharp"]
public class HeadPose
{
	public double pitch { get; set; }
	public double roll { get; set; }
	public double yaw { get; set; }
}

public class FacialHair
{
	public double moustache { get; set; }
	public double beard { get; set; }
	public double sideburns { get; set; }
}

public class FaceAttributes
{
	public double smile { get; set; }
	public HeadPose headPose { get; set; }
	public string gender { get; set; }
	public double age { get; set; }
	public FacialHair facialHair { get; set; }
	public string glasses { get; set; }
}

public class Face
{
	...
	public FaceAttributes faceAttributes { get; set; }
}
[/code]

Ora siamo in grado di ottenere le informazioni aggiuntive sui volti identificati. L'utilizzo con la Client Library è altrettanto semplice:

[code language="csharp"]
var client = new Microsoft.ProjectOxford.Face.FaceServiceClient (SubscriptionKeys.FaceId);
var faces = await client.DetectAsync(imageStream, 
	returnFaceId:true, 
	returnFaceLandmarks:true, 
	returnFaceAttributes: new [] { 
	Microsoft.ProjectOxford.Face.FaceAttributeType.Age,
	Microsoft.ProjectOxford.Face.FaceAttributeType.Gender});
[/code]

<h2>Risultato</h2>
Il risultato finale, che in un'app visualizza i volti trovati in un rettangolo, è il seguente:

<a href="http://www.fabiocozzolino.eu/wp-content/uploads/2016/06/CjdK25dUgAQ5rdb.jpg"><img class="wp-image-3301 aligncenter" src="http://www.fabiocozzolino.eu/wp-content/uploads/2016/06/CjdK25dUgAQ5rdb.jpg" alt="CjdK25dUgAQ5rdb" width="360" height="480" /></a>
<h2>Conclusioni</h2>
La scelta delle REST API o delle Client Library dipende dalla propria architettura. Tendenzialmente è preferibile utilizzare le Client Library, quando queste sono disponibili per la piattaforma utilizzata ma è utile avere anche a disposizione le REST API per tutte quelle piattaforme che non hanno un client SDK già disponibile.

Nei prossimi post, non so ancora quando, continueremo a sperimentare altre modalità di utilizzo dei Cognitive Services.

Potete scaricare il codice completo dell'esempio da qui: <a href="https://github.com/fabiocozzolino/samples/tree/master/CloudFace">https://github.com/fabiocozzolino/samples/tree/master/CloudFace</a>