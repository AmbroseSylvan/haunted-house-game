
//Associative array of game states.
const GameState = Object.freeze({
    WELCOME: Symbol("welcoming"),
    FLAT: Symbol("flat"),
    TRAP: Symbol("conk"),
    DOOR: Symbol("door"),
    MANSION: Symbol("mansion"),
    EXIT: Symbol("exit"),
    HALL: Symbol("hall"),
    PATH1: Symbol("path1"),
    SPHYNX: Symbol("sphynx"),
    RIDDLE: Symbol("riddle"),
    PYRAMID: Symbol("pyramid"),
    MUMMY: Symbol("mummy"),
    LOOT: Symbol("loot"),
    AMULET: Symbol("amulet"),
    SEWER: Symbol("sewer"),
    TOMB: Symbol("tomb"),
    PATH2: Symbol("path2"),
    BRIDGE: Symbol("bridge"),
    DIZZY: Symbol("dizzy"),
    SWITCH: Symbol("switch"),
    DOORBELL: Symbol("doorbell"),
    RED: Symbol("red"),
    SHELF: Symbol("shelf"),
    BLUE: Symbol("blue"),
    WORD: Symbol("word"),
    GOBLIN: Symbol("goblin"),
    MUTANT: Symbol("mutant"),
    FIGHT: Symbol("fight"),
    HERO: Symbol("hero"),
    ATTACK: Symbol("attack"),
    WIN: Symbol("win"),
    END: Symbol("end")
});

//Variables for changing pathways available to player
var conked;
var dizzy;
var saved;
var secretSwitch;

export default class Game{
    constructor(){
        //constructs with a default game state, WELCOME [from the associative array]
        this.stateCur = GameState.WELCOME;
        this.conked = false;
        this.dizzy = false;
        this.saved = false;
        this.secretSwitch = false;
    }
    
    //Sets a gamestate and returns a reply message based on current game state and Player input.
    makeAMove(sInput)
    {
        let sReply = "It is a dark and rainy night. Bang! You have a flat tire. Too bad you don't have a spare. Do you WAIT or KNOCK at the spooky mansion for help?";
        switch(this.stateCur){
            //#region Main Path
            //If default state:
            case GameState.WELCOME:
                //Set state to FLAT and break; return the welcome statement "It is a dark..."
                this.stateCur = GameState.FLAT;
                break;
            //First scene: Flat tire.
            case GameState.FLAT:
                //In this round: reset sReply. If sInput matches "wait" then set state to FLAT and return wait message.
                if(sInput.toLowerCase().match("wait")){
                    if (this.saved == false){
                        sReply = "You wait by the road for an hour, but no help arrives. There is a rustling in the bushes behind you. Before you can turn to see what it is, you feel a heavy blow on the back of your head. You grunt in pain and black out.";
                        this.conked = true;
                        this.stateCur = GameState.TRAP;
                    }else if (this.saved == true){
                        sReply = "You wait by the road for an hour, and finally see a car in the distance. It is a kind old woman who offers you a ride to town in her Buick. It is a comfortable ride and you share stories of road trips with each other. By morning you are safe at home in your own bed. Congratulations!";
                        this.saved = false;
                        this.stateCur = GameState.END;
                    }
                }else if(sInput.toLowerCase().match("knock")){
                    //If input is "knock" then change state to MANSION and return doorknocker message.
                    sReply ="The heavy oak door creaks open from the force of the iron knocker. The musty odor of mold pours out with a dull roar, as if the house were groaning with ancient pain. You are spooked. Do you WAIT by the road, or ENTER?";
                    this.stateCur = GameState.DOOR;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            //Second scene: Mansion door.
            case GameState.DOOR:
                if(sInput.toLowerCase().match("wait")){
                    sReply = "You wait by the road for an hour, but no help arrives. There is a rustling in the bushes behind you. Before you can turn to see what it is, you feel a heavy blow on the back of your head. You groan in pain and black out.";
                    conked = true;
                    this.stateCur = GameState.TRAP;
                }else if (sInput.toLowerCase().match("enter")){
                    sReply = "You tiptoe into the mansion foyer, checking over your shoulder in fear that the door will close itself behind you. You know that there is something wrong in this house. You regret coming inside. There is a grand STAIRCASE in front of you, and an ATRIUM to the left.";
                    this.stateCur = GameState.MANSION;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            //Third scene: Gassed in foyer.
            case GameState.MANSION:
                if(sInput.toLowerCase().match("staircase")){
                    sReply = "As you approach the stairs something lands at your feet with a wet, sticky noise. Alarmed, you turn to look at it. A cloud of fluorescent gas bursts into your face. You shout your mother's name and black out.";
                    this.stateCur = GameState.TRAP;
                }else if(sInput.toLowerCase().match("atrium")){
                    sReply = "As you approach the atrium something lands at your feet with a wet, sticky noise. Alarmed, you turn to look at it. A cloud of fluorescent gas bursts into your face. You shout your father's name and black out.";
                    this.stateCur = GameState.TRAP;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            //Fourth scene: Waking up in dungeon.
            case GameState.TRAP:
                if (this.secretSwitch == false){
                    sReply = "You wake up in a daze. You are in a cold, round room made of large stone blocks. There is a yellow and a red light but you can't see their sources. There is a wooden door to your right. To exit you must OPEN it.";
                    this.stateCur = GameState.EXIT;    
                }else if (this.secretSwitch == true){
                    sReply = "You wake up in a daze. You are in a cold, round room made of large stone blocks. There is a blue and a green light but you cannot see their sources. There is a wooden door to your right and an open passage to your left. The passage looks as if the stones were freshly removed. Do you go LEFT or RIGHT?"
                    this.stateCur = GameState.SWITCH;
                }
                break;
            //Fifth scene: exiting dungeon.
            case GameState.EXIT:
                if(sInput.toLowerCase().match("open")){
                    sReply = "You fumble with the rusty latch on the door. It finally gives way and lets you out into a dank, dark hallway. The hallway forks to the LEFT and to the RIGHT.";
                    this.stateCur = GameState.HALL;
                }else{
                    sReply = "You can't stay here forever. OPEN the door. ";
                }
                break;
            //sixth scene: branching hallway outside the dungeon.
            case GameState.HALL:
                if(sInput.toLowerCase().match("left")){
                    sReply = "You follow the path on the left. It ends in a small room with a vaulted ceiling, lit by braziers on the wall. There is a small golden idol sitting on a podium. Do you TAKE the idol, or LEAVE it?";
                    this.stateCur = GameState.PATH1;
                }else if(sInput.toLowerCase().match("right")){
                    sReply = "You follow the path on the right. It takes you to a square room that is missing a wall. Your head hurts here and your vision is blurry. There seems to be someone standing by some bushes just beyond the missing wall. You feel a menacing presence. There is a large rock at your feet. Do you HIT the menacing stranger, or LEAVE?";
                    this.stateCur = GameState.PATH2;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            //#endregion

            //#region First Branch of Path
            //First branch: Idol.
            case GameState.PATH1:
                if (sInput.toLowerCase().match("take")){
                    sReply = "You carefully slip the idol into your pocket. It fits neatly. You exit this room through the door in the rear. Suddenly a feeling of dread falls upon you and you freeze in place. A booming voice echoes in your ears: 'I AM THE SPHYNX, MASTER OF RIDDLES. YOU HAVE TAKEN MY TREASURE. ANSWER TRUE AND YOU MAY KEEP IT. ANSWER FALSE AND YOU SHALL DIE.' Do you hear the RIDDLE or do you RUN?";
                    this.stateCur = GameState.SPHYNX;
                }else if(sInput.toLowerCase().match("leave")){
                    sReply = "You leave the suspicious treasure behind and exit through the door in the rear of the room. An eerie hush fills this darkened corridor, so silent that it screams in your soul. You cannot stand this feeling. Terror grips your heart. It is broken by a rustling noise behind you. Slowly, you turn around, and feel the fetid breath of the Mummy on your face. It groans in a sexless, desiccated voice: 'GIVE ME YOUR YOUTH. GIVE ME YOUR SOUL. GIVE ME YOUR LIFE, MAKE ME ONCE MORE WHOLE.' Do you FIGHT or RUN?";
                    this.stateCur = GameState.MUMMY;
                }else{
                    sReply = "I don't understand.";
                }
                break;
                //#region Branch 1-1.
                //Branch 1-1: Sphynx.
            case GameState.SPHYNX:
                if (sInput.toLowerCase().match("riddle")){
                    sReply = "The Sphynx hisses, sending shivers down your spine. 'WHAT WALKS ON FOUR LEGS IN THE MORNING, TWO LEGS AT MID-DAY, AND THREE LEGS AT NIGHT?' What is your answer?";
                    this.stateCur = GameState.RIDDLE;
                }else if(sInput.toLowerCase().match("run")){
                    sReply = "Before you can even turn to run, the Sphynx has pounced and crushed you underfoot. Darkness creeps in, and everything goes black. What is your last thought?";
                    this.stateCur = GameState.TRAP;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            case GameState.RIDDLE:
                if (sInput.toLowerCase().match("human")){
                    sReply = "The Sphynx growls; 'WELL DONE. THE TREASURE IS YOURS.' It turns to stone before your eyes, and begins crumbling into dust. The wall behind it cracks and breaks apart, golden rays of sunlight pouring in through it. Will you ESCAPE the ruins?. ";
                    this.stateCur = GameState.PYRAMID;
                }else if (sInput.toLowerCase().match("man")){
                    sReply = "The Sphynx growls; 'WELL DONE. THE TREASURE IS YOURS.' It turns to stone before your eyes, and begins crumbling into dust. The wall behind it cracks and breaks apart, golden rays of sunlight pouring in through it. Will you ESCAPE the ruins?. ";
                    this.stateCur = GameState.PYRAMID;
                }else if (sInput.toLowerCase().match("woman")){
                    sReply = "The Sphynx growls; 'WELL DONE. THE TREASURE IS YOURS.' It turns to stone before your eyes, and begins crumbling into dust. The wall behind it cracks and breaks apart, golden rays of sunlight pouring in through it. Will you ESCAPE the ruins?. ";
                    this.stateCur = GameState.PYRAMID;
                }else{
                    sReply = "The eyes of the Sphynx narrow into slits. You are frozen by its gaze. You cannot look away. Its eyes burn with golden fire. You feel as though the earth falls away beneath you. The world around you grows dark. Only the eyes. There are only the eyes. You are lost. What is your last thought?";
                    this.stateCur = GameState.END;
                }
                break;
            case GameState.PYRAMID:
                if (sInput.toLowerCase().match("escape")){
                    sReply = "The sunlight blinds you. You step through the hole towards a voice: 'welcome back, Pharaoh' the high priestess says. You remember now that you went down into the pyramid to retrieve the Idol of Isis. You nod to the priestess, and attendants come to wash the dust from your feet. You have completed your sacred duty. Congratulations!";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "The idol feels heavy in your pocket. Very heavy. In fact, it is getting heavier with every moment. You take it out of your pocket to abandon it and leave. Yet you cannot look away from it. Its ruby eyes glitter in the dim light. You try to move but your legs do not obey. Soon, you don't even want to leave. You should have escaped when you had the chance. What is your last thought?";
                    this.stateCur = GameState.END;
                }
                break;
                //#endregion
                //#region Branch 1-2.
                //Branch 1-2: Mummy.
            case GameState.MUMMY:
                if (sInput.toLowerCase().match("fight")){
                    sReply = "You react before thinking, butting heads with the mummy and taking it off-guard. You sweep your elbow forward into its ribs, grab its wrist, and pull it off-balance. The bones crack when they hit the floor. Do you LOOT the body or RUN to the exit?";
                    this.stateCur = GameState.LOOT;
                }else if(sInput.toLowerCase().match("run")){
                    sReply = "You thought that you could easily outrun the mummy. You were sure it was a shambling, dried up corpse. Its speed startled you. The sight of this hungry, withered creature thrashing towards you paralyzed you with terror. What did you scream out as it began to tear into you?";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            case GameState.LOOT:
                if (sInput.toLowerCase().match("loot")){
                    sReply = "You kick the fallen Mummy in the ribs. Its bandages tear open and a sparkling golden amulet tumbles out. It is flat and round, with a scarab etched into it. You grab the amulet and the Mummy crumbles into dust. Do you WEAR the amulet or PUT it away?";
                    this.stateCur = GameState.AMULET;
                }else if(sInput.toLowerCase().match("run")){
                    sReply = "You thought that you could easily outrun the mummy. You were sure it was a shambling, dried up corpse. Its speed startled you. The sight of this hungry, withered creature thrashing towards you paralyzed you with terror. What did you scream out as it began to tear into you?";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            case GameState.AMULET:
                if (sInput.toLowerCase().match("wear")){
                    sReply = "You put the amulet around your neck. It feels great. A voice resonates in your ear, filling you with a sense of calm: 'You have freed my soul from its prison. In return I tell you this secret word: REVAM. Say this in the secret room.' The voice goes quiet. You may LEAVE.";
                    this.stateCur = GameState.SEWER;
                }else if(sInput.toLowerCase().match("put")){
                    sReply = "You put the amulet in your pocket. It feels strangely warm. You can LEAVE now.";
                    this.stateCur = GameState.SEWER;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            case GameState.SEWER:
                if (sInput.toLowerCase().match("leave")){
                    sReply = "You leave the dusty Mummy behind. The sound of rushing water guides you through the tunnels. Soon you find yourself in a sewer, with a ladder leading up. You climb it and open the manhole cover. This place is familiar. It's the main intersection of your hometown. You are safe. Congratulations!";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "Are you SURE you want to stay here with a pile of rotten old bones and bandages? Don't you want to LEAVE?";
                    this.stateCur = GameState.TOMB;
                }
                break;
            case GameState.TOMB:
                if (sInput.toLowerCase().match("sure")){
                    sReply = "You make the inexplicable choice to sit beside the Mummy's remains. You sit, and sit. Your mind becomes a blank. Eventually everything becomes insensate void. And then you re-awaken. The amulet has given you new life. You pick up the wrappings. They are yours now. What is your new name as a Mummy?";
                    this.stateCur = GameState.END;
                }else if(sInput.toLowerCase().match("leave")){
                    sReply = "You leave the dusty Mummy behind. The sound of rushing water guides you through the tunnels. Soon you find yourself in a sewer, with a ladder leading up. You climb it and open the manhole cover. This place is familiar. It's the main intersection of your hometown. You are safe. Congratulations!";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            //#endregion
            //#endregion
            
            //#region Second Branch of Path
            //Second branch: conking.
            case GameState.PATH2:
                if (sInput.toLowerCase().match("hit")){
                    if (this.conked == true){
                        sReply = "You rush to pick up the rock and you smash the stranger in the back of the head with it. You immediately feel a sharp pain in your head. You double over in pain, clutching the back of your head. You feel warm blood trickling between your fingers. Everything fades to black. Your breathing is ragged. What is the last thing you think before you die?";
                        this.stateCur = GameState.END;
                    }else if (this.conked == false){
                        sReply = "You rush to pick up the rock and you smash the stranger in the back of the head with it. You immediately feel a sharp pain in your neck that paralyzes your arm. The stone drops and you groan. You are dizzy, and everything is blurry. What do you shout in pain?"
                        this.dizzy = true;
                        this.stateCur = GameState.BRIDGE;
                    }
                }else if(sInput.toLowerCase().match("leave")){
                    sReply = "You ignore the stranger and sneak along the back wall until they are out of view. How do you feel about yourself?";
                    this.saved = true;
                    this.stateCur = GameState.BRIDGE;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            case GameState.BRIDGE:
                if (this.dizzy == false){
                    sReply = "There is a rope bridge stretching out over a wide underground chasm. You cannot see the bottom. As you are crossing the bridge, a strange gurgling noise echoes up from the abyss. The bridge begins to sway under the weight of something that has climbed on it at the dark, far end. It rattles and shakes as this something approaches. What do you call out?"
                    this.stateCur = GameState.GOBLIN;
                }else if (this.dizzy == true){
                    sReply = "There is a rope bridge stretching out over a wide underground chasm. You cannot see the bottom. You are dizzy and the view is nauseating. While looking down at your shoes you notice a tiny red SWITCH beside a stone. Do you press it, or MOVE on?"
                    this.stateCur = GameState.DIZZY;
                }
                break;
            case GameState.DIZZY:
                if (sInput.toLowerCase().match("switch")){
                    sReply = "You press the switch. It doesn't seem to do anything but it was strangely satisfying. Now you start walking. You struggle to stay steady on the bridge. The inevitable happens and you fall over the side. It feels like you fall for a long time until you land in water and are knocked unconscious. What do you cry as you fall?";
                        this.secretSwitch = true;
                        this.stateCur = GameState.MUTANT;
                }else if (sInput.toLowerCase().match("move")){
                    sReply = "You ignore the switch and start walking. You struggle to stay steady on the bridge. The inevitable happens and you fall over the side. It feels like you fall for a long time until you land in water and are knocked unconscious. What do you say as you fall?";
                    this.stateCur = GameState.MUTANT;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            case GameState.GOBLIN:
                sReply = "A hideous creature stands before you. It looks human but its gigantic eyes and clammy, grey skin do not. It hisses at you: 'Give to me, give to me, give me precious treasure!' You know you will have to fight your way through. Do you LUNGE or JAB?";
                    this.stateCur = GameState.FIGHT;
                break;
            case GameState.MUTANT:
                sReply = "You live down here now, trapped, feeding on moss and cave fish. Over time your skin becomes cold and clammy. Your eyes adjust to the inky dark. Is it days? Weeks? Years? You cannot tell how long it takes but eventually you hear sounds from above. You panic and clamber up the chasm walls, pulling yourself onto the rope bridge. You confront a stranger on the bridge. What do you say?";
                    this.stateCur = GameState.HERO;
                break;
            case GameState.FIGHT:
                if (sInput.toLowerCase().match("lunge")){
                    sReply = "You lunge forward at the creature. It leaps back, shrieking, but you lose your footing and tumble over the side of the bridge. What do you shout on the way down?";
                    this.stateCur = GameState.MUTANT;
                }else if (sInput.toLowerCase().match("jab")){
                    sReply = "The creature has faster reflexes than you. You should have known better. It catches your hand and twists your wrist. You fall to your knees and the creatures falls upon you, opening a mouth full of needle-sharp teeth. Mercifully, you pass out from shock before you feel the worst of it. What is your last thought?";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            case GameState.HERO:
                sReply = "The stranger looks somehow familiar. This confuses you long enough for them to make a move. They jab at you with their left fist. Do you CATCH their punch, or LET them hit you?";
                this.stateCur = GameState.ATTACK;
                break;
            case GameState.ATTACK:
                if (sInput.toLowerCase().match("catch")){
                    sReply = "You easily catch the stranger's fist and twist their wrist. They fall to their knees with a pathetic whimper. Their head falls and you see the juicy meat of their neck. Do you BITE or THROW them?";
                    this.stateCur = GameState.WIN;
                }else if(sInput.toLowerCase().match("let")){
                    sReply = "You do nothing as the stranger begins to pummel you. You are weak from hunger and are knocked to the boards. The bridge creaks beneath you as the stranger tries to pin you down. Soon the boards splinter and you both fall through. This is a merciful release for you. How do you express your thanks?";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            case GameState.WIN:
                if (sInput.toLowerCase().match("bite")){
                    sReply = "You savour this, your largest meal in ages. You use every part and use the rags to make new clothes. You deserve to look good when you escape this place. You push open the door at the end of the bridge and are greeted by fresh air. You are ready to start your new life. Congratulations!";
                    this.stateCur = GameState.END;
                }else if(sInput.toLowerCase().match("throw")){
                    sReply = "You have enough self control not to eat a person. That's what you tell yourself. Your stomach regrets throwing the tasty morsel over the side but you turn around and walk to the doorway at the end of the rope bridge. With great anticipation, you push the heavy wooden door open. There is a rush of fresh air. You see moonlight, trees, grass. This is the wilderness but you know: you are not lost any more. Congratulations!";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            //#endregion
       
            //#region Secret Path
            //Alternate scene: secret dungeon door. This scene is a FORK in the road. 
            case GameState.SWITCH:
                if(sInput.toLowerCase().match("left")){
                    sReply = "You peer down through the eerie light into the spiral staircase. The steps are narrow and creak under your feet. Gingerly, you make your way to the bottom. It takes a long time. There is an ornate, Romanesque door here. It has a RED and a BLUE doorbell. Which do you ring?";
                    this.stateCur = GameState.DOORBELL;
                }else if(sInput.toLowerCase().match("right")){
                    sReply = "You ignore the passage on the left, but a voice in the back of your head tells you that it is important. What do you tell the voice?";
                    this.stateCur = GameState.EXIT;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            //Different rooms opened by each doorbell.
            case GameState.DOORBELL:
                if(sInput.toLowerCase().match("red")){
                    sReply = "You press the red doorbell. A chime is heard from behind the door, and it gently opens itself. There is a small, round room in here, with a plush antique armchair and full bookcases all around the wall. You look up and see that the shelves seem to reach up infinitely. There is a thick, leather-bound book on the chair. Do you READ it or SKIP to the end?";
                    this.stateCur = GameState.RED;
                }else if(sInput.toLowerCase().match("blue")){
                    sReply = "You press the blue doorbell. It makes a soft, squishy noise. The noise is strangely satisfying. The door creaks open, but there is nobody inside. The room beyond is a dry, dusty, cob-web filled study. Thick cobwebs form a ceiling above you, and seem to glue the rotten, ancient armchair to the floor. There is a ghostly blue candle in this room. Do you APPROACH the flame, or SIT in the chair?";
                    this.stateCur = GameState.BLUE;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            //Red Room endings.
            case GameState.RED:
                if(sInput.toLowerCase().match("read")){
                    sReply = "You sit in the cozy chair and snuggle up with the heavy book. The smell of the pages reminds you of your grandparents' study. You lost track of time as you pore over the pages, entranced by the story it tells. Finally, you close the covers. You have learned so much about this place and why you are here. You go to one of the shelves of books. Do you take down 'A Magician Among Spirits' by Harry HOUDINI, or something ELSE?";
                    this.stateCur = GameState.SHELF;
                }else if(sInput.toLowerCase().match("skip")){
                    sReply = "You flip the pages and read the last page first. It is your perverse pleasure. The page reads 'BY LEO HEATH, JANUARY 2019.' You are not unimpressed. Will you read something ELSE?";
                    this.stateCur = GameState.SHELF;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            case GameState.SHELF:
                if(sInput.toLowerCase().match("houdini")){
                    sReply = "The shelves fold back into the wall, revealing a red-carpeted hallway. People in glamorous outfits line both sides of the hall, applauding your escape. Congratulations! What do you say to your fans?";
                    this.stateCur = GameState.END;
                }else if(sInput.toLowerCase().match("else")){
                    sReply = "You grab 'The Great Secret' by Eliphas Levi. The book was connected to a hidden mechanism which opens up a trapdoor beneath your feet. You fall into a bottomless abyss. You had always wondered what it would be like to die this way. Do you have any regrets?";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            //Blue room endings.
            case GameState.BLUE:
                if(sInput.toLowerCase().match("approach")){
                    sReply = "The flame begins to speak in a soft voice. 'I have been alone for so long. The spiders in this place took me from this world. I am their prisoner even now. Please, say the magic word, and we can escape together.' Do you HELP?";
                    this.stateCur = GameState.WORD;
                }else if(sInput.toLowerCase().match("sit")){
                    sReply = "You sit down in the webby chair. It isn't very comfortable. When you try to stand up you find yourself stuck to the web. As you tug at it, the ceiling above you rustles. Your movements alerted a gigantic spider, which descends upon you and sinks its paralyzing fangs into your shoulder. You should have seen this coming.How does that make you feel?";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "I don't understand.";
                }
                break;
            case GameState.WORD:
                if(sInput.toLowerCase().match("help")){
                    sReply = "You don't know what to say, so you try something by shouting 'ALAKAZAM' into the flame. The blue flame erupts and everything begins to burn. It feels cool on your skin. Soon you have burned away, and all that remains is the flame.";
                    this.stateCur = GameState.END;
                }else if(sInput.toLowerCase().match("revam")){
                    sReply = "A secret word comes to your mind. You do not remember where you heard it before. You should aloud into the flame, 'REVAM.' Immediately the room around you begins to dissolve into white light. The flame thanks you before disappearing. You awake in your own bed. What a wild dream! What do you write in your dream journal?";
                    this.stateCur = GameState.END;
                }else{
                    sReply = "I don't understand.";
                }
                break;  
            //#endregion
        
            case GameState.END:
                sReply = "It is a dark and rainy night. Bang! You have a flat tire. Too bad you don't have a spare. Do you WAIT or KNOCK at the spooky mansion for help?";
                this.conked = false;
                this.dizzy = false;
                this.stateCur = GameState.FLAT;
                break;           
        }
        return([sReply]);
    }
}