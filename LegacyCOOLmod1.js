G.AddData({
name:'Legacy COOL! Mod',
author:'Packerfan-Gamer',
desc:'A mod that adds cool things to the game. Currently have berries and juice.',
engineVersion:1,
manifest:'ModManifest.js',
requires:['Default dataset*'],
sheets:{'honeySheet':'http://i.imgur.com/bhNRZSv.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	//mod to add berries and juice
	
	//First we add the new resources 
	new G.Res({
		name:'Fruit Juice',
		desc:'[Fruit Juice] tastes better than [water].',
		icon:[1,0,'honeySheet'],
		turnToByContext:{'eat':{'health':0.05,'happiness':0.1},'decay':{'spoiled food':0.2}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
		new G.Res({
		name:'Berry Juice',
		desc:'[Berry Juice] tastes better than [water].',
		icon:[1,0,'honeySheet'],
		turnToByContext:{'eat':{'health':0.05,'happiness':0.1},'decay':{'spoiled food':0.2}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
		new G.Res({
		name:'Berries',
		desc:'[Berries] taste sweet, but spoil quickly.',
		icon:[1,0,'honeySheet'],
		turnToByContext:{'eat':{'health':0.05,'happiness':0.1},'decay':{'spoiled food':0.7}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
	
	//Then we augment the base data to incorporate our new resources :
		//adding berries as something that can be gathered from grass
	G.getDict('grass').res['gather']['Berries']=0.1;
		//adding a new mode to artisans so they can make juice from fruit
	G.getDict('artisan').modes['MakeJuiceFruit']={name:'Make Juice from Fruit',desc:'Use fruit to make juice.',req:{'Juice Making':true},use:{'stone tools':1}};
		//adding a new effect to artisans that handles the actual honeycomb creation and is only active when 'make honeycomb' is active.
	//G.getDict('artisan').effects.push({type:'convert',from:{'hot pepper':3,'bees':3},into:{'hot sauce':1},every:3,mode:'hot sauce'});
	G.getDict('artisan').effects.push({type:'convert',from:{'fruit':3},into:{'Fruit Juice':2},every:5,mode:'MakeJuiceFruit'});
	//Berry Picking Makes Gatherers pick berries
	G.getDict('gatherer').effects.push({type:'gather',context:'gather',what:{'Berries': 1},amount:1,max:1,req:{'Berry Picking':true}});           
	//Then we add a new technology which is required by the gatherers to gain access to the "berry" mode :
	new G.Tech({
		name:'Berry Picking',
		desc:'@[gatherer]s can find berries.',
		icon:[0,1,'honeySheet'],
		cost:{'insight':25},
		req:{'plant lore':true},
	});
  //New tech to allow the making of juice
		new G.Tech({
		name:'Juice Making',
		desc:'@[artisan]s can make juice.',
		icon:[0,1,'honeySheet'],
		cost:{'insight':25},
		req:{'plant lore':true},
	});
	
  //New Trait to make people love juice!
  
  new G.Trait({
		name:'Juice Love',
		desc:'@your people appreciate [fruit Juice] and [Berry Juice] twice as much and will be twice as happy from consuming it.',
		icon:[1,1,'honeySheet'],
		chance:50,
		req:{'Juice Making':true, 'Berry Picking':true},
		effects:[
			{type:'function',func:function(){G.getDict('Fruit Juice').turnToByContext['eat']['happiness']=0.2;}}, 	
      {type:'function',func:function(){G.getDict('Berry Juice').turnToByContext['eat']['happiness']=0.2;}},//this is a custom function executed when we gain the trait
    ]
    });
    
	//Finally, we add a trait that amplifies the benefits of consuming hot sauce; it will take on average 20 years to appear once the conditions (knowing the "Hot sauce preparing" tech) is fulfilled.
	//new G.Trait({
	//	name:'hot sauce madness',
	//	desc:'@your people appreciate [hot sauce] twice as much and will be twice as happy from consuming it.',
	//	icon:[1,1,'spicySheet'],
	//	chance:20,
	//	req:{'hot sauce preparing':true},
	//	effects:[
	//		{type:'function',func:function(){G.getDict('hot sauce').turnToByContext['eat']['happiness']=0.2;}},//this is a custom function executed when we gain the trait
	//	],
	//});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!
}
});
