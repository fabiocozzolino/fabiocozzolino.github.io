---
id: 3101
title: 'Cognitive Services: Intelligenza Artificiale nelle tue App'
date: 2016-06-05T16:23:23+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=3101
permalink: /cognitive-services-intelligenza-artificiale-nelle-tue-app/
dsq_thread_id:
  - "5297975330"
categories:
  - Uncategorized
---
Durante la BUILD 2016 di Microsoft tenuta a San Francisco lo scorso aprile, sono state annunciate diverse novit  in grado di portare all&#8217;interno delle nostre applicazioni evoluzioni importanti. Una di queste, probabilmente la più rilevante, è senza dubbio l&#8217;Intelligenza Artificiale.

Due gli annunci principali:

  * Microsoft BOT Framework
  * Cognitive Services

Cosa sono i BOT Frameworks? Immaginate di voler integrare in applicazioni come Facebook Messenger, Skype o Slack un&#8217;assistente virtuale in grado di rispondere alle domande ed eseguire azioni come se si trattasse di una persona reale. Ecco, il BOT Framework fornisce tutti gli strumenti necessari per creare applicazioni in grado di fare tutto questo. Mi riprometto di parlarne in uno dei prossimi post.

Parallelamente ai BOT Framework, Microsoft ha presentato al pubblico anche i Cognitive Services, un set di API in grado di fornire alle applicazioni la capacit di vedere, ascoltare, interpretare ed interagire in modi molto simili a come farebbe una comune persone. Una soluzione assolutamente interessante che porta ad un livello superiore le possibilit di sviluppo delle nostre applicazioni. Ma vediamo come funzionano.

I Cognitive Services si dividono in 5 macro aree, ognuna con un set di servizi:

[<img class="alignnone size-full wp-image-3161" src="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/CognitiveServices.jpg?resize=720%2C405" alt="CognitiveServices" srcset="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/CognitiveServices.jpg?w=720 720w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/CognitiveServices.jpg?resize=300%2C169 300w" sizes="(max-width: 720px) 100vw, 720px" data-recalc-dims="1" />](https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/CognitiveServices.jpg)

## Cose da sapere

Il punto di partenza è senza dubbio il sito web <https://www.microsoft.com/cognitive-services>. Qui potete trovare tutte le informazioni utili per attivare la vostra subscription. Sì, è ovviamente necessaria una sottoscrizione per poter utilizzare i Cognitive Services. Ogni servizio, fortunatamente, ha un limite di utilizzo gratuito. Ad esempio è possibile effettuare fino a 20 invocazioni al minuto per un massimo di 30000 al mese per il servizio di riconoscimento facciale (Face API).

Una volta attivata la sottoscrizione, potete visualizzare l&#8217;elenco dei servizi e ottenere le chiavi di autenticazione.

[<img class="alignnone size-full wp-image-3151" src="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-04-alle-11.52.51.png?resize=762%2C212" alt="Schermata 2016-06-04 alle 11.52.51" srcset="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-04-alle-11.52.51.png?w=764 764w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-04-alle-11.52.51.png?resize=300%2C84 300w" sizes="(max-width: 762px) 100vw, 762px" data-recalc-dims="1" />](https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-04-alle-11.52.51.png)

Potete utilizzare indifferentemente sia la Key 1 che la Key 2. Le chiavi devono essere poi utilizzate dal nostro client per invocare il servizio richiesto. E&#8217; possibile utilizzare i servizi in due diverse modalit :

  * REST API
  * Client SDK

## Face REST API

In questo post vedremo come utilizzare una delle funzionalit  dei Cognitive Services: le Face API. Il servizio è raggiungibile all&#8217;indirizzo <https://api.projectoxford.ai/face/v1.0/detect>. Il parametro obbligatorio è proprio la chiave che abbiamo visto in precedenza, che deve necessariamente essere indicata nell&#8217;header HTTP <span style="color: #000000;"><strong><span style="font-family: Menlo;">Ocp-Apim-Subscription-Key</span></strong></span>.

~~~ csharp
public async HttpResponseMessage DetectAsync(Stream stream)
{
	var url = "https://api.projectoxford.ai/face/v1.0/detect";

	var requestContent = new StreamContent (stream);
	requestContent.Headers.Add ("Ocp-Apim-Subscription-Key", your-subscription-key);
	requestContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue ("application/octet-stream");
	var client = new HttpClient ();
	return await client.PostAsync (url, requestContent);
}
~~~

Con questo codice inviamo un&#8217;immagine, contenente volti, al servizio di face detection, impostando la chiave nell&#8217;header. La risposta è un json simile a questo:

~~~ json
[
    {
        "faceId": "4a97f6af-bc7d-4c0c-be41-dca3eea0937f",
        "faceRectangle": {
            "top": 127,
            "left": 306,
            "width": 75,
            "height": 75
        },
        "faceLandmarks": {
            "pupilLeft": {
                "x": 330.3,
                "y": 143.7
            },
            "pupilRight": {
                "x": 357.8,
                "y": 149.0
            },
            ...
        },
        "faceAttributes": {
            "smile": 0.573,
            "headPose": {
                "pitch": 0.0,
                "roll": 6.0,
                "yaw": 20.7
            },
            "gender": "male",
            "age": 39.4,
            "facialHair": {
                "moustache": 0.7,
                "beard": 0.8,
                "sideburns": 0.5
            },
            "glasses": "ReadingGlasses"
        }
    }
]
~~~

Il json riporta informazioni sulla posizione e dimensione del viso nell&#8217;immagine, la posizione di caratteristiche somatiche come le pupile, il naso, la bocca, etc&#8230; Infine, vengono riportate informazioni sul viso rilevato: ha la barba, i baffi o le basette, porta gli occhiali, l&#8217;et , il sesso, se sta sorridendo e l&#8217;eventuale inclinazione del viso.

Il json può essere trasformato in un set di classi C#. Ne riporto una parte per brevit :

~~~ csharp
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
~~~

Infine, modifichiamo il nostro metodo DetectAsync per recuperare il JSON dalla risposta HTTP e deserializzarlo in un array di oggetti di tipo Face:

~~~ csharp
public async Task<Face[]> DetectAsync(Stream stream)
{
	...
	var client = new HttpClient ();
	var response = await client.PostAsync (url, requestContent);

	var responseContent = response.Content as StreamContent;
	var jsonResponse = await responseContent.ReadAsStringAsync ();

	return JsonConvert.DeserializeObject<Face[]> (jsonResponse);
}
~~~

E voilà. Ora possiamo utilizzare la classe Face per recuperare le informazioni e tracciare un rettangolo intorno al viso.

~~~ csharp
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
~~~

Il codice mostra come ciclare nel set di classi Face restituite dal servizio per costruire dei rettangoli intorno ai volti identificati nell&#8217;immagine. Il tutto all&#8217;interno di un&#8217;app sviluppata con Xamarin.Forms.

## Microsoft Face API Client Library

Alternativamente, e più semplicemente, possiamo utilizzare l&#8217;SDK disponibile come pacchetto Nuget per usufruire delle Face API. Come primo passo aggiungiamo al nostro progetto il Microsoft Face API Client Library:

[<img class="alignnone size-full wp-image-3191" src="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-05-alle-12.29.23.png?resize=762%2C502" alt="Schermata 2016-06-05 alle 12.29.23" srcset="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-05-alle-12.29.23.png?w=822 822w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-05-alle-12.29.23.png?resize=300%2C198 300w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-05-alle-12.29.23.png?resize=768%2C506 768w" sizes="(max-width: 762px) 100vw, 762px" data-recalc-dims="1" />](https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/Schermata-2016-06-05-alle-12.29.23.png)

Ora possiamo sostituire all&#8217;invocazione via REST API, l&#8217;utilizzo diretto della classe FaceServiceClient.

~~~ csharp
var client = new Microsoft.ProjectOxford.Face.FaceServiceClient (your-subscription-key);
var faces = await client.DetectAsync (inputImage);
foreach (var item in faces) {
    ...
}
~~~

il resto del codice non cambia rispetto a quanto abbiamo fatto con le REST API.

## Informazioni aggiuntive sui volti

Ma le Face API sono in grado di restituire molte più informazioni rispetto al semplice &#8220;rettangolo&#8221; che racchiude il volto. Per ottenerle è sufficiente specificare nella querystring i parametri:

* **returnFaceId** restituisce l&#8217;identificativo del volto
* **returnFaceLandmarks** restituisce informazioni sulle caratteristiche del volto, come la posizione degli occhi, della bocca, del naso, etc...
* **returnFaceAttributes** restituisce gli attributi del viso, come la barba, i baffi, il sorriso, l&#8217;et , il sesso, etc...

Utilizzando le Face API possiamo modificare l&#8217;URL utilizzato con questo:

~~~ csharp
var returnFaceId = true;
var returnFaceLandmarks = true;
var returnFaceAttributes = "age,gender,smile,facialHair,headPose,glasses";
var url = $"https://api.projectoxford.ai/face/v1.0/detect?returnFaceId={returnFaceId}&amp;returnFaceLandmarks={returnFaceLandmarks}&amp;returnFaceAttributes={returnFaceAttributes}";
~~~

Per recuperare le informazioni dal JSON, infine, aggiungiamo le seguenti classi e la propriet faceAttributes a quanto gi scritto:

~~~ csharp
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
~~~

Ora siamo in grado di ottenere le informazioni aggiuntive sui volti identificati. L&#8217;utilizzo con la Client Library è altrettanto semplice:

~~~ csharp
var client = new Microsoft.ProjectOxford.Face.FaceServiceClient (SubscriptionKeys.FaceId);
var faces = await client.DetectAsync(imageStream, 
	returnFaceId:true, 
	returnFaceLandmarks:true, 
	returnFaceAttributes: new [] { 
	Microsoft.ProjectOxford.Face.FaceAttributeType.Age,
	Microsoft.ProjectOxford.Face.FaceAttributeType.Gender});
~~~

## Risultato

Il risultato finale, che in un&#8217;app visualizza i volti trovati in un rettangolo, è il seguente:

[<img class="wp-image-3301 aligncenter" src="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/CjdK25dUgAQ5rdb.jpg?resize=360%2C480" alt="CjdK25dUgAQ5rdb" srcset="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/CjdK25dUgAQ5rdb.jpg?w=640 640w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/CjdK25dUgAQ5rdb.jpg?resize=225%2C300 225w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/CjdK25dUgAQ5rdb.jpg?resize=300%2C399 300w" sizes="(max-width: 360px) 100vw, 360px" data-recalc-dims="1" />](https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2016/06/CjdK25dUgAQ5rdb.jpg)

## Conclusioni

La scelta delle REST API o delle Client Library dipende dalla propria architettura. Tendenzialmente è preferibile utilizzare le Client Library, quando queste sono disponibili per la piattaforma utilizzata ma è utile avere anche a disposizione le REST API per tutte quelle piattaforme che non hanno un client SDK gi disponibile.

Nei prossimi post, non so ancora quando, continueremo a sperimentare altre modalit di utilizzo dei Cognitive Services.

Potete scaricare il codice completo dell&#8217;esempio da qui: <https://github.com/fabiocozzolino/samples/tree/master/CloudFace>
