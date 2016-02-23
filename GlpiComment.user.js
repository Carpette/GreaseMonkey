// ==UserScript==
// @name        GlpiComment
// @namespace   QSixt
// @include     http://glpi/glpi/plugins/CRRA/*
// @version     1
// @grant       none
// ==/UserScript==

(function ()
{
 
	// Removes an attribute from all occurences of elements whose XPath is provided.
	// (All occurences of this elements are processed.)
	//
	// Example: Remove the bgcolor of all <table>:
	//          removeAttributeOfElement('bgcolor',"//table[@bgcolor]")
	//          Remove the fixed with of all tables or cells::
	//          removeAttributeOfElement('width',"//table[@width]|//td[@width]")
	function removeAttributeOfElement(attributeName,ElementXpath)
	{
		var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (i=0; i<alltags.snapshotLength; i++)
		{
			alltags.snapshotItem(i).removeAttribute(attributeName);
		}
	}

	// add and text to the followup Area, and display it
	function addtexttodescription()
	{
		console.log('addtexttodescription');

		document.getElementsByTagName('textarea')[0].textContent = "Procédure utilisée (oui/non)\nsi oui, indiquer la référence\nsi non, indiquer la procédure créée (si récurrent) ou indiquer la démarche de résolution mise en place \n- Échange avec l’utilisateur (préciser le canal + la nature de l’échange) : (copier/coller le mail)\n- Test effectué : \n";
		// on peut écrire
		//text.textContent += "-          Procédure utilisée (oui/non)";
	}
 
	try
	{
		console.log("script lance");
		// supprimer la disparition du cursor des tableaux:
		//removeAttributeOfElement('style',"//tr");
	
		// on ajoute un nouveau bouton de suivi	
		var onglet = document.getElementById('onglet');
		if ( onglet == null )
		{
			console.log('on sort, rien trouvé');
			return;
		}
		console.log("onglet OK");
		var newComment = document.createElement('a');
		newComment.href = '#';
		newComment.textContent = 'Suivi pré-formaté';
		
		var li 		= document.createElement('li');
		li.id 		= 'addfollowup';
		showAddFollowup();
		li.onclick	= function()
		{
			Effect.toggle('viewfollowup');
			addtexttodescription();
		};
		li.appendChild(newComment);
		onglet.appendChild(li);
		console.log("création du nouveau suivi faite et ajoutée");
		
	}
	catch (e)
	{
		alert("UserScript exception:\n" + e);
	}
 /*
<li id="addfollowup" onclick="showAddFollowup(); Effect.Appear('viewfollowup');">
	<a href="#">Ajouter un nouveau suivi</a>
</li>*/


})();