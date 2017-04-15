//DONE: Add Tech to unlock a policy to get people to eat herbs or not. Add grain (wheat, barley, rye, etc.) to make bread. Add Mass graves and crematoriums. 
//TODO: Add tech to unlock policy to get people to eat raw grains or not. 
//TODO: Add Religous buildings to increase faith and culture. Add priests along with the buildings. 

G.AddData({
name:'Legacy COOL! Mod',
author:'Packerfan-Gamer',
desc:'A mod that adds cool things to the game. Currently have berries, juice, and Mass Graves (oh yes!!), and so much moar!',
engineVersion:1,
manifest:'ModManifest.js',
requires:['Default dataset*'],
sheets:{'imageSheet':'http://i.imgur.com/owlnODu.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
	{	

	
	//First we add the new resources 
	new G.Res({
		name:'Fruit Juice',
		desc:'[Fruit Juice] tastes better than [water].',
		icon:[0,1,'imageSheet'],
		turnToByContext:{'eat':{'health':0.06,'happiness':0.1},'decay':{'spoiled food':0.2}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
		new G.Res({
		name:'Berry Juice',
		desc:'[Berry Juice] tastes better than [water].',
		icon:[0,1,'imageSheet'],
		turnToByContext:{'eat':{'health':0.07,'happiness':0.1},'decay':{'spoiled food':0.2}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
		new G.Res({
		name:'Berries',
		desc:'[Berries] taste sweet, but spoil quickly.',
		icon:[1,1,'imageSheet'],
		turnToByContext:{'eat':{'health':0.05,'happiness':0.1},'decay':{'spoiled food':0.8}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
	
		new G.Res({
		name:'Wheat',
		desc:'[Wheat] tastes unpleasant but can be used for many things. You can grind wheat into flour, or make beer.',
		icon:[1,3,'imageSheet'], //TODO: Image for wheat
		turnToByContext:{'eat':{'health':-0.5,'happiness':-0.3},'decay':{'spoiled food':0.3}},
		partOf:'grain',
		category:'food',
	});
	
		new G.Res({
		name:'Wheat Flour',
		desc:'You can bake [Wheat Flour] to make [Wheat Bread].',
		icon:[2,3,'imageSheet'], //TODO: Image for wheat
		turnToByContext:{'eat':{'health':-0.5,'happiness':-0.3},'decay':{'spoiled food':0.2}},
		partOf:'grain',
		category:'food',
	});
	
		new G.Res({
		name:'Wheat Bread',
		desc:'[Wheat Bread] tastes really good.',
		icon:[0,3,'imageSheet'], //TODO: Image for wheat
		turnToByContext:{'eat':{'health':1,'happiness':1},'decay':{'spoiled food':0.4,}},
		partOf:'food',
		category:'food',
	});
	
		new G.Res({
		name:'Barley',
		desc:'[Barley] tastes unpleasant but can be used for many things. You can grind it into flour, which is used in bread-making',
		icon:[0,0,'imageSheet'], //TODO: Image for wheat
		turnToByContext:{'eat':{'health':-0.5,'happiness':-0.3},'decay':{'spoiled food':0.3}},
		partOf:'grain',
		category:'food',
	});
	
	//Then we augment the base data to incorporate our new resources :
		//adding berries as something that can be gathered from grass
	//G.getDict('grass').res['gather']['Berries']=0.1;
	//adding wheat as something that can come from grass
	G.getDict('grass').res['gather']['Wheat']=0.09;
	G.getDict('grass').res['gather']['Barley']=0.03;
		//adding a new mode to artisans so they can make juice from fruit
	G.getDict('artisan').modes['MakeJuiceFruit']={name:'Make Juice from Fruit',desc:'Use fruit to make juice.',req:{'Juice Making':true},use:{'stone tools':1}};
	G.getDict('artisan').modes['MakeJuiceBerry']={name:'Make Juice from Berries',desc:'Use Berries to make juice.',req:{'Juice Making':true, 'Berry Picking':true},use:{'stone tools':1}};
	G.getDict('artisan').modes['GrindWheat']={name:'Grind Wheat into Flour',desc:'Use Wheat to make Wheat Flour',req:{'Grinding':true},use:{'stone tools':1}};
	//G.getDict('artisan').effects.push({type:'convert',from:{'hot pepper':3,'bees':3},into:{'hot sauce':1},every:3,mode:'hot sauce'});
	G.getDict('artisan').effects.push({type:'convert',from:{'fruit':3},into:{'Fruit Juice':2},every:5,mode:'MakeJuiceFruit'});
	G.getDict('artisan').effects.push({type:'convert',from:{'Berries':3},into:{'Berry Juice':4},every:5,mode:'MakeJuiceBerry'});
	G.getDict('artisan').effects.push({type:'convert',from:{'Wheat':1},into:{'Wheat Flour':2},every:5,mode:'GrindWheat'});
	//Berry Picking Makes Gatherers pick berries
	G.getDict('gatherer').effects.push({type:'gather',context:'gather',what:{'Berries': 1},amount:1,max:1,req:{'Berry Picking':true}});           
	//Then we add a new technology which is required by the gatherers to gain access to the "berry" mode :
	new G.Tech({
		name:'Berry Picking',
		desc:'@[gatherer]s can find berries.',
		icon:[2,1,'imageSheet'],
		cost:{'insight':15},
		req:{'plant lore':true},
	});
  //New tech to allow the making of juice
		new G.Tech({
		name:'Juice Making',
		desc:'@[artisan]s can make juice.',
		icon:[2,0,'imageSheet'],
		cost:{'insight':20},
		req:{'plant lore':true},
	});
	
	//new tech to allow mass graves
		new G.Tech({
		name:'Mass Burial',
		desc:'Unlocks Mass Graves, which can store 10 people in one grave.',
		icon:[2,2,'imageSheet'],
		cost:{'insight':20},
		req:{'burial':true},
	});
	
	//new tech to allow the grinding of wheat and bread-baking
		new G.Tech({
		name:'Grinding',
		desc:'Unlocks the secrets of grinding grain into flour.',
		icon:[3,1,'imageSheet'],
		cost:{'insight':20},
		req:{'sedentism':true},
	});
		new G.Tech({
		name:'Bread Baking',
		desc:'Unlocks the secrets of baking bread.',
		icon:[3,0,'imageSheet'],
		cost:{'insight':20},
		req:{'Grinding':true, 'fire-making':true},
	});
	
	//new Modes for firekeepers to make bread from flour
	G.getDict('firekeeper').modes['WheatBread']={name:'Make Wheat Bread',desc:'Use Wheat Flour to make Wheat Bread.',req:{'Bread Baking':true},use:{'stone tools':1}};
	G.getDict('firekeeper').effects.push({type:'convert',from:{'Wheat Flour':1},into:{'Wheat Bread':1},every:5,mode:'WheatBread'});
	
	
  //New Trait to make people love juice!
  
  new G.Trait({
		name:'Juice Love',
		desc:'@your people appreciate [Fruit Juice] and [Berry Juice] twice as much and will be twice as happy from consuming it.',
		icon:[2,0,'imageSheet'],
		chance:10,
		req:{'Juice Making':true, 'Berry Picking':true},
		effects:[
			{type:'function',func:function(){G.getDict('Fruit Juice').turnToByContext['eat']['happiness']=0.2;}}, 	
      {type:'function',func:function(){G.getDict('Berry Juice').turnToByContext['eat']['happiness']=0.2;}},//this is a custom function executed when we gain the trait
    ]
    });
    
	//MASS-GRAVES

	
		new G.Unit({
		name:'Mass Grave',
		desc:'@provides 10 [burial spot]s, in which the [corpse,dead] are automatically interred one by one@graves with buried corpses decay over time, freeing up land for more graves<>A simple grave dug into the earth, where the dead may find rest.//Burying your dead helps prevent [health,disease] and makes your people slightly [happiness,happier].',
		icon:[1,2,'imageSheet'],
		cost:{},
		use:{'land':1},
		//require:{'worker':1,'knapped tools':1},
		effects:[
			{type:'provide',what:{'burial spot':10}},
			//{type:'waste',chance:1/100,desired:true},
			{type:'function',func:function(me){
				var buried=G.getRes('burial spot').used;
				if (buried>0 && G.getRes('burial spot').amount>=buried)
				{
					var toDie=Math.min(me.amount,randomFloor(buried*0.0001));
					me.targetAmount-=toDie;
					G.wasteUnit(me,toDie);
					G.getRes('burial spot').amount-=toDie;
					G.getRes('burial spot').used-=toDie;
				}
			}}
		],
		req:{'Mass Burial':true},
		category:'civil',
	});
	
	
	
	
	//newTHINGY
	
		new G.Res({
		name:'grain',
		desc:'WIP',
		meta:true,
		visible:true,
		icon:[1,3], //TODO: icon (same as wheat)
		tick:function(me,tick)
		{
			if (me.amount>0 && G.checkPolicy('disable spoiling')=='off')
			{
				var stored=Math.min(me.amount,G.getRes('food storage').amount)/me.amount;
				var notStored=1-stored;
				
				var toSpoil=me.amount*0.01*notStored+me.amount*0.0005*stored;
				var spent=G.lose('grain',randomFloor(toSpoil),'decay');
				//G.gain('spoiled food',randomFloor(spent));
			}
		},
	});
	
	//new wonder.
	/*
		new G.Unit({
		name:'Great Temple',
		desc:'@leads to the <b>Religious victory Victory</b><>A monument honoring your gods and goddesses.//A temple housing great statues, the Great Temple stands tall, its eternal shadow forever reminding your people of your greatness.',
		wonder:'temple',
		icon:[1,14],
		wideIcon:[0,14],
		cost:{'basic building materials':1000},
		costPerStep:{'basic building materials':100,'precious building materials':30},
		steps:100,
		messageOnStart:'You begin the construction of the Great Temple. People pray to the gods and goddesses in its shadow.',
		finalStepCost:{'population':100},
		finalStepDesc:'To complete the Great Temple, and to show your greatness to your gods, 100 of your [population,People] must be sacrificed.',
		use:{'land':10},
		//require:{'worker':10,'stone tools':10},
		req:{'monument-building':true, 'Cathedrals':true },
		category:'wonder',
	});
	*/
	new G.Policy({
		name:'eat herbs',
		desc:'Your people will eat or not eat [herb]s. <br>Your people <i>could start to starve</i>.',
		icon:[6,12,4,6],
		cost:{'influence':1},
		startMode:'on',
		req:{'rules of food':true},
		effects:[
			{type:'make part of',what:['herb'],parent:'food'},
		],
		effectsOff:[
			{type:'make part of',what:['herb'],parent:''},
		],
		category:'food',
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
