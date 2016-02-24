// ==UserScript==
// @name        GlpiComment
// @namespace   QSixt
// @include     http://glpi/glpi/plugins/CRRA/*
// @version     2.0
// @updateURL	https://github.com/Carpette/GreaseMonkey/raw/master/GlpiComment.user.js
// @downloadURL	https://github.com/Carpette/GreaseMonkey/raw/master/GlpiComment.user.js
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

		document.getElementsByTagName('textarea')[0].textContent = "- Procédure utilisée (indiquer la réf. utilisée ou créée ; sinon indiquer la démarche)\n- Échange avec l’utilisateur (canal + nature de l’échange - copier/coller le mail)\n- Test effectué :";
	}
 
	try
	{
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
		// on rajoute un onglet invisible au milieu pour respecter la présentation actuelle de GLPI
		var linvisible	= document.createElement('li');
		linvisible.className = 'invisible';
		linvisible.textContent = '';
		onglet.appendChild(linvisible);

		// on rajoute maintenat notre nouvel onglet (but de ce script)
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
<li class="invisible">&nbsp;</li>
<li id="addfollowup" onclick="showAddFollowup(); Effect.Appear('viewfollowup');">
	<a href="#">Ajouter un nouveau suivi</a>
</li>*/


})();