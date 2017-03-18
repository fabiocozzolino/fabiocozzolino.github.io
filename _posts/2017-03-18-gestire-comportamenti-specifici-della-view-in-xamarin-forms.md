---
ID: 5201
post_title: >
  Gestire comportamenti specifici della
  View in Xamarin.Forms
author: fabiocozzolino
post_date: 2017-03-18 23:28:21
post_excerpt: ""
layout: post
permalink: >
  http://www.fabiocozzolino.eu/gestire-comportamenti-specifici-della-view-in-xamarin-forms/
published: true
---
La chiara e netta separazione tra la UI e l'application logic è il concetto che sta alla base del pattern MVVM. Molte volte, però, non è semplice capire distinguere le responsabilità, almeno in termini di rappresentazione della UI. Se devo cambiare un colore in base al contenuto, è il ViewModel che lo decide? Dove indico il colore?

Tendenzialmente saremo portati ad aggiungere una proprietà nel ViewModel con l'indicazione del colore da visualizzare. E magari definiamo come tipo della proprietà l'enum Xamarin.Forms.Color. Sebbene semplice, questo approccio è sbagliato perchè assegna al ViewModel una responsabilità della View, oltre al rischio di non rendere il ViewModel compatibile se questo deve essere reso riutilizzabile in diverse piattaforme (non Xamarin.Forms).
<h2>Quindi?</h2>
Il ViewModel si deve limitare a riportare il dato, senza avere conoscenza del modo in cui esso verrà rappresentato dalla View. Se in una lista di persone dobbiamo mostrare un colore diverso a seconda del sesso, blu per i maschietti e rosa per le femminucce, allora il ViewModel si limiterà a indicare il sesso del contatto visualizzato. Sarà poi responsabilità della View decidere cosa deve essere visualizzato e in che forma.

Una soluzione decisamente elegante e che ci viene incontro in questo contesto è l'utilizzo del <strong>DataTrigger</strong>.
<h2>La via elegante: il Data Trigger</h2>
In Xamarin.Forms un trigger permette di definire un'azione al verificarsi di un'evento o al cambio del valore di una proprietà. La sua peculiarità? Possiamo definire tutto in XAML, a livello dichiarativo, senza scrivere una riga di codice. Esistono quattro diverse tipologie di Triggers:
<ul>
 	<li><strong>Property Trigger</strong>: attivato quando la proprietà di un controllo viene impostata su un particolare valore;</li>
 	<li><strong>Event Trigger</strong>: attivato quando da un controllo viene generato un particolare evento;</li>
 	<li><strong>Multi Trigger</strong>: consente l'attivazione del trigger sulla base della valutazione di più condizioni;</li>
 	<li><strong>Data Trigger</strong>: consente di verificare la condizione del trigger, su una specifica proprietà, utilizzando il binding;</li>
</ul>
Nello specifico scenario, ovviamente, il DataTrigger è il tipo di trigger che fa al caso nostro. Il codice è decisamente semplice. Dobbiamo aggiungere alla collection Triggers di un controllo Xamarin.Forms, ad esempio BoxView, e definire la proprietà del ViewModel da controllare e il valore che quella proprietà deve avere per attivare il trigger. Se la condizione si verifica, viene utilizzato il Setter definito nel trigger per impostare la proprietà BackgroundColor del BoxView su un nuovo colore, Pink in questo caso:

[sourcecode lang="xml"]
&lt;BoxView.Triggers&gt;
	&lt;DataTrigger TargetType=&quot;BoxView&quot; Binding=&quot;{Binding Gender}&quot; Value=&quot;{x:Static vm:GenderType.Female}&quot; &gt;
  		&lt;Setter Property=&quot;BackgroundColor&quot; Value=&quot;Pink&quot; /&gt;
	&lt;/DataTrigger&gt;
&lt;/BoxView.Triggers&gt;
[/sourcecode]

&nbsp;

Questo il codice completo del ListView:

[sourcecode lang="xml"]
&lt;ListView ItemsSource=&quot;{Binding Contacts}&quot; Margin=&quot;0,50,0,0&quot;&gt;
	&lt;ListView.ItemTemplate&gt;
		&lt;DataTemplate&gt;
			&lt;ViewCell&gt;
				&lt;StackLayout Orientation=&quot;Horizontal&quot;&gt;
					&lt;BoxView WidthRequest=&quot;5&quot; BackgroundColor=&quot;Blue&quot;&gt;
						&lt;BoxView.Triggers&gt;
							&lt;DataTrigger TargetType=&quot;BoxView&quot; Binding=&quot;{Binding Gender}&quot; Value=&quot;{x:Static vm:GenderType.Female}&quot; &gt;
  								&lt;Setter Property=&quot;BackgroundColor&quot; Value=&quot;Pink&quot; /&gt;
							&lt;/DataTrigger&gt;
						&lt;/BoxView.Triggers&gt;
					&lt;/BoxView&gt;
					&lt;Label Text=&quot;{Binding Name}&quot; VerticalOptions=&quot;Center&quot; /&gt;
				&lt;/StackLayout&gt;
			&lt;/ViewCell&gt;
		&lt;/DataTemplate&gt;
	&lt;/ListView.ItemTemplate&gt;
&lt;/ListView&gt;
[/sourcecode]

e questo il risultato finale:

<img class="aligncenter wp-image-5461 size-medium" src="http://www.fabiocozzolino.eu/wp-content/uploads/2017/03/Simulator-Screen-Shot-18-mar-2017-23.16.29-169x300.png" alt="" width="169" height="300" />

Semplice!