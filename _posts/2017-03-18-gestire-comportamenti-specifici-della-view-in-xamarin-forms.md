---
id: 5201
title: Gestire comportamenti specifici della View in Xamarin.Forms
date: 2017-03-18T23:28:21+00:00
author: fabiocozzolino
layout: post
guid: http://www.fabiocozzolino.eu/?p=5201
permalink: /gestire-comportamenti-specifici-della-view-in-xamarin-forms/
dsq_thread_id:
  - "5644688411"
categories:
  - Xamarin
  - Xamarin.Forms
tags:
  - Xamarin
  - Xamarin.Forms
---
La chiara e netta separazione tra la UI e l&#8217;application logic è il concetto che sta alla base del pattern MVVM. Molte volte, però, non è semplice capire distinguere le responsabilit , almeno in termini di rappresentazione della UI. Se devo cambiare un colore in base al contenuto, è il ViewModel che lo decide? Dove indico il colore?

Tendenzialmente saremo portati ad aggiungere una propriet nel ViewModel con l&#8217;indicazione del colore da visualizzare. E magari definiamo come tipo della propriet l&#8217;enum Xamarin.Forms.Color. Sebbene semplice, questo approccio è sbagliato perchè assegna al ViewModel una responsabilit della View, oltre al rischio di non rendere il ViewModel compatibile se questo deve essere reso riutilizzabile in diverse piattaforme (non Xamarin.Forms).

## Quindi?

Il ViewModel si deve limitare a riportare il dato, senza avere conoscenza del modo in cui esso verr rappresentato dalla View. Se in una lista di persone dobbiamo mostrare un colore diverso a seconda del sesso, blu per i maschietti e rosa per le femminucce, allora il ViewModel si limiter a indicare il sesso del contatto visualizzato. Sar poi responsabilit della View decidere cosa deve essere visualizzato e in che forma.

Una soluzione decisamente elegante e che ci viene incontro in questo contesto è l&#8217;utilizzo del **DataTrigger**.

## La via elegante: il Data Trigger

In Xamarin.Forms un trigger permette di definire un&#8217;azione al verificarsi di un&#8217;evento o al cambio del valore di una propriet . La sua peculiarit ? Possiamo definire tutto in XAML, a livello dichiarativo, senza scrivere una riga di codice. Esistono quattro diverse tipologie di Triggers:

  * **Property Trigger**: attivato quando la propriet di un controllo viene impostata su un particolare valore;
  * **Event Trigger**: attivato quando da un controllo viene generato un particolare evento;
  * **Multi Trigger**: consente l&#8217;attivazione del trigger sulla base della valutazione di più condizioni;
  * **Data Trigger**: consente di verificare la condizione del trigger, su una specifica propriet , utilizzando il binding;

Nello specifico scenario, ovviamente, il DataTrigger è il tipo di trigger che fa al caso nostro. Il codice è decisamente semplice. Dobbiamo aggiungere alla collection Triggers di un controllo Xamarin.Forms, ad esempio BoxView, e definire la propriet del ViewModel da controllare e il valore che quella propriet deve avere per attivare il trigger. Se la condizione si verifica, viene utilizzato il Setter definito nel trigger per impostare la propriet BackgroundColor del BoxView su un nuovo colore, Pink in questo caso:

~~~ xaml
<BoxView.Triggers>
	<DataTrigger TargetType="BoxView" Binding="{Binding Gender}" Value="{x:Static vm:GenderType.Female}" >
		<Setter Property="BackgroundColor" Value="Pink" />
	</DataTrigger>
</BoxView.Triggers>
~~~

&nbsp;

Questo il codice completo del ListView:

~~~ xaml
<ListView ItemsSource="{Binding Contacts}" Margin="0,50,0,0">
	<ListView.ItemTemplate>
		<DataTemplate>
			<ViewCell>
				<StackLayout Orientation="Horizontal">
					<BoxView WidthRequest="5" BackgroundColor="Blue">
						<BoxView.Triggers>
							<DataTrigger TargetType="BoxView" Binding="{Binding Gender}" Value="{x:Static vm:GenderType.Female}" >
  								<Setter Property="BackgroundColor" Value="Pink" />
							</DataTrigger>
						</BoxView.Triggers>
					</BoxView>
					<Label Text="{Binding Name}" VerticalOptions="Center" />
				</StackLayout>
			</ViewCell>
		</DataTemplate>
	</ListView.ItemTemplate>
</ListView>
~~~

e questo il risultato finale:

<img class="aligncenter wp-image-5461 size-medium" src="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2017/03/Simulator-Screen-Shot-18-mar-2017-23.16.29.png?resize=169%2C300" alt="" srcset="https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2017/03/Simulator-Screen-Shot-18-mar-2017-23.16.29.png?resize=169%2C300 169w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2017/03/Simulator-Screen-Shot-18-mar-2017-23.16.29.png?resize=577%2C1024 577w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2017/03/Simulator-Screen-Shot-18-mar-2017-23.16.29.png?resize=300%2C533 300w, https://i1.wp.com/www.fabiocozzolino.eu/wp-content/uploads/2017/03/Simulator-Screen-Shot-18-mar-2017-23.16.29.png?w=640 640w" sizes="(max-width: 169px) 100vw, 169px" data-recalc-dims="1" />

Semplice!