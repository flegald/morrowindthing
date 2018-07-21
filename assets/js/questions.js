$(document).ready(function(){
  var QUESTIONS = {
    "1": {
      "question": "On a clear day you chance upon a strange animal, its leg trapped in a hunter's clawsnare. Judging from the bleeding it will not survive long.",
      "answers": {
        "combat": "Draw your dagger, mercifully ending its life with a single thrust.",
        "magic": "Use herbs from your pack to put it to sleep.",
        "stealth": "Do not interfere in the natural evolution of events, but rather take the opportunity to learn more about a strange animal you have never seen before."
      }
    },
    "2": {
      "question": "One Summer afternoon your father gives you a choice of chores.",
      "answers": {
        "combat": "Work in the forge with him casting iron for a new plow.",
        "magic": "Gather herbs for your mother who is preparing dinner.",
        "stealth": "Go catch fish at the stream using a net and line."
      }
    },
    "3": {
      "question": "Your cousin has given you a very embarrassing nickname and, even worse, likes to call you it in front of your friends. You asked him to stop, but he finds it very amusing to watch you blush.",
      "answers": {
        "combat": "Beat up your cousin, then tell him that if he ever calls you that nickname again, you will bloody him worse than this time.",
        "magic": "Make up a story that makes your nickname a badge of honor instead of something humiliating.",
        "stealth": "Make up an even more embarrassing nickname for him and use it constantly until he learns his lesson."
      }
    },
    "4": {
      "question": "There is a lot of heated discussion at the local tavern over a grouped of people called 'Telepaths'. They have been hired by certain City-State kings. Rumor has it these Telepaths read a person's mind and tell their lord whether a follower is telling the truth or not.",
      "answers": {
        "combat": "This is a terrible practice. A person's thoughts are his own and no one, not even a king, has the right to make such an invasion into another human's mind.",
        "magic": "Loyal followers to the king have nothing to fear from a Telepath. It is important to have a method of finding assassins and spies before it is too late.",
        "stealth": "In these times, it is a necessary evil. Although you do not necessarily like the idea, a Telepath could have certain advantages during a time of war or in finding someone innocent of a crime."
      }
    },
    "5": {
      "question": "Your mother sends you to the market with a list of goods to buy. After you finish you find that by mistake a shopkeeper has given you too much money back in exchange for one of the items.",
      "answers": {
        "combat": "Return to the store and give the shopkeeper his hard-earned money, explaining to him the mistake.",
        "magic": "Decide to put the extra money to good use and purchase items that would help your family.",
        "stealth": "Pocket the extra money, knowing that shopkeepers in general tend to overcharge customers anyway."
      }
    },
    "6": {
      "question": "While in the market place you witness a thief cut a purse from a noble. Even as he does so, the noble notices and calls for the city guards. In his haste to get away, the thief drops the purse near you. Surprisingly no one seems to notice the bag of coins at your feet.",
      "answers": {
        "combat": "Pick up the bag and signal to the guard, knowing that the only honorable thing to do is return the money to its rightful owner.",
        "magic": "Leave the bag there, knowing that it is better not to get involved.",
        "stealth": "Pick up the bag and pocket it, knowing that the extra windfall will help your family in times of trouble."
      }
    },
    "7": {
      "question": "Your father sends you on a task which you loathe, cleaning the stables. On the way there, pitchfork in hand, you run into your friend from the homestead near your own. He offers to do it for you, in return for a future favor of his choosing.",
      "answers": {
        "combat": "Decline his offer, knowing that your father expects you to do the work, and it is better not to be in debt.",
        "magic": "Ask him to help you, knowing that two people can do the job faster than one, and agree to help him with one task of his choosing in the future.",
        "stealth": "Accept his offer, reasoning that as long as the stables are cleaned, it matters not who does the cleaning."
      }
    },
    "8": {
      "question": "Your mother asks you to help fix the stove. While you are working, a very hot pipe slips its mooring and falls towards her.",
      "answers": {
        "combat": "Position yourself between the pipe and your mother.",
        "magic": "Grab the hot pipe and try to push it away.",
        "stealth": "Push your mother out of the way."
      }
    },
    "9": {
      "question": "While in town the baker gives you a sweetroll. Delighted, you take it into an alley to enjoy only to be intercepted by a gang of three other kids your age. The leader demands the sweetroll, or else he and his friends will beat you and take it.",
      "answers": {
        "combat": "Drop the sweetroll and step on it, then get ready for the fight.",
        "magic": "Give him the sweetroll now without argument, knowing that later this afternoon you will have all your friends with you and can come and take whatever he owes you.",
        "stealth": "Act like you're going to give him the sweetroll, but at the last minute throw it in the air, hoping that they'll pay attention to it long enough for you to get a shot in on the leader."
      }
    },
    "10": {
      "question": "Entering town you find that you are witness to a very well-dressed man running from a crowd. He screams to you for help. The crowd behind him seem very angry.",
      "answers": {
        "combat": "Rush to the town's aid immediately, despite your lack of knowledge of the circumstances.",
        "magic": "Stand aside and allow the man and the mob to pass, realizing it is probably best not to get involved.",
        "stealth": "Rush to the man's aid immediately, despite your lack of knowledge of the circumstances."
      }
    }
  };

// DOM INIT ####################################################################
function domInit() {
  initStorage();
  $(".question-container").hide();
  $(".showStats").hide();
  $(".character").fadeIn();
  $(".dialouge").fadeIn();
  $(".button").fadeIn();
}

// STORAGE CONTROL##############################################################
  function initStorage(){
    var stats = {
      "question": 0,
      "stats": {
        "combat": 0,
        "magic": 0,
        "stealth": 0
      }
    };
    localStorage.setItem("morrow", JSON.stringify(stats));
  }

  function getStats(){
    var stats = localStorage.getItem("morrow");
    return JSON.parse(stats)
  }

  function setQuestion(num){
    var stats = getStats()
    stats.question = num;
    localStorage.setItem("morrow", JSON.stringify(stats))
  }

  function readQuestion(){
    var stats = getStats();
    return stats.question;
  }

  function updateStats(field){
    var updatedValue;
    var stats = getStats();
    updatedValue = parseInt(stats.stats[field]) + 1;
    stats.stats[field] = updatedValue;
    localStorage.setItem("morrow", JSON.stringify(stats))
  }

// Flow ########################################################################

function showStats(){
  $(".question-container").hide();
  var results = getStats();
  $(".combatResults").text("Combat: " + results["stats"]["combat"])
  $(".magicResults").text("Magic: " + results["stats"]["magic"])
  $(".stealthResults").text("Stealth: " + results["stats"]["stealth"])
  $(".showStats").fadeIn();
}

function updateQuestion(){
  var questNum = readQuestion();
  if (questNum == "10") {
    showStats()
  } else {
    var nextQuestion = parseInt(questNum) + 1;
    setQuestion(nextQuestion);
    var question = QUESTIONS[nextQuestion.toString()];
    $(".question").find("p").text(question.question);
    $(".combat").text(question.answers.combat);
    $(".magic").text(question.answers.magic);
    $(".stealth").text(question.answers.stealth);
  }
}

function begin(){
  $(".character").hide();
  $(".button").hide();
  $(".dialouge").hide();
  updateQuestion()
  $(".question-container").fadeIn();

}

// LISTENERS ###################################################################
$(".button").on("click", begin);
$(".combat").on("click", function(){
  updateStats("combat")
  updateQuestion()
})
$(".magic").on("click", function(){
  updateStats("magic")
  updateQuestion()
})
$(".stealth").on("click", function(){
  updateStats("stealth")
  updateQuestion()
})
$(".redoButt").on("click", domInit)

// Start #######################################################################
domInit();
})
