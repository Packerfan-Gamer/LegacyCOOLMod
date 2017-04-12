G.AddData({
name:'A NeverEnding Legacy Mod',
author:'Packerfan Gamer',
desc:'A mod adding cool features to the game!',
engineVersion:1,
manifest:'orteil.dashnet.org/legacy/modManifest.js',
requires:['Default dataset*'],
sheets:
func:funtion()
{

//New resources

//Juice
	new G.Res({
		name:'juice',
		desc:'[juice] tastes better than water, but requires fruit to make.',
		turnToByContext:{'drinking':{'health':0.01,'happiness':0.1},'decay':{'muddy water':0.5}},//this basically translates to : "when drank, generate some health and happiness; when rotting, turn into either nothing or some muddy water"
		partOf:'food',
		category:'food',
	});

//Berries
	new G.Res({
		name:'berries',
		desc:'[berries] are sweeter than [fruit].',
		turnToByContext:{'eat':{'health':0.03,'happiness':0.07},'decay':{'spoiled food':0.5}},//this basically translates to : "when drank, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});

	//Then we augment the base data to incorporate our new resources :
		//adding berries as something that can be gathered from grass
	G.getDict('grass').res['gather']['berries']=3;
		//adding a new mode to artisans so they can make hot sauce from hot peppers
	//G.getDict('artisan').modes['hot sauce']={name:'Make hot sauce',desc:'Turn 3 [hot pepper]s and 3 [herb]s into 1 [hot sauce].',req:{'hot sauce preparing':true},use:{'knapped tools':1}};
		//adding a new effect to artisans that handles the actual hot sauce preparing and is only active when the unit has the mode "hot sauce"
	//G.getDict('artisan').effects.push({type:'convert',from:{'hot pepper':3,'herb':3},into:{'hot sauce':1},every:3,mode:'hot sauce'});
	

}
