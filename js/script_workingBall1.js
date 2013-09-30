
var pingpong = {

	scoreA:0,
	scoreB:0,
	scorediffA:0,
	scorediffB:0


};

pingpong.keyPressed=[];
pingpong.pauseG=0;
pingpong.resume=1;
pingpong.levelCounter=0;
pingpong.playCounter=0;
pingpong.timer=30;


pingpong.ball1 = {
	speed: 5,
	x:200,
	y:150,
	directionX:1,
	directionY:1,
	radius:10
};


var KEY ={
	UP:38,
	DOWN:40,
	W:87,
	S:83
};

// this is the main function that run once the document loads
$(function()
{
	$("#play").click(playGame);
	$("#pause").click(pauseGame);
	$("#resume").click(resumeGame);
	$("#reset").click(resetGame);
});

function selectedLevel()
{


	var sIndex = document.getElementById("levels").selectedIndex;
	var sOption = document.getElementById("levels").options;
	pingpong.levelCounter = pingpong.levelCounter + 1;
	if (pingpong.levelCounter>1 && sOption[sIndex].id == "level1")
	{
		resetGame();
	};

	if (pingpong.levelCounter>=1 && sOption[sIndex].id == "level2")
	{
			resetGame();

	};


	/*var sIndex = document.getElementById("#levels").selectedIndex;
	var sOption = document.getElementById("#levels").options;
	alert("selected Level Index is : " + sOption(sIndex).index + " and selected Option Texts is : " + sOption(sIndex).id);
	if (selectedOptionTexts(selectedLevelIndex).id = "level2")
	{
		$("#play").css("display","block");
	};*/
};

function playGame()
{

		$("#play").css("display","none");
		$("#pause").css("display","block");
		$("#reset").css("display","block");
		pingpong.playCounter = pingpong.playCounter + 1;
		if (pingpong.playCounter == 1)
		{
			initiatGame();
		}
		else
		{
			pingpong.resume = 1;
			gameloop();
		};

};

function pauseGame()
{
	pingpong.resume = 0;
	$("#resume").css("display","block");
	$("#pause").css("display","none");
	//	initiatGame();
		gameloop();
};

function resumeGame()
{
	pingpong.resume = 1;
	$("#resume").css("display","none");
	$("#pause").css("display","block");
//		initiatGame();
		gameloop();
};

function resetGame()
{
	pingpong.scoreA=0;
	pingpong.scoreB=0;
	$("#scoreA p").html(pingpong.scoreA);
	$("#scoreB p").html(pingpong.scoreB);
	pingpong.ball1.x=200;
	pingpong.ball1.y=150;
	pingpong.ball1.directionX=1;
	pingpong.ball1.directionY=1;
	$("#winDetail p").html("Commentary");

	pingpong.resume = 0;
	$("#ball1").css(
		{
			"left":200,
			"top":150
		});
	$("#paddleA").css(
		{
			"left": 5,
			"top": 110
		});
	$("#paddleB").css(
		{
			"left":385,
			"top": 110
		});
	$("#play").css("display","block");
	$("#pause").css("display","none");
	$("#resume").css("display","none");

};

function initiatGame()
{
	if (pingpong.playCounter == 1)
		{
			setInterval(gameloop,pingpong.timer);
		};
			//paddle move on key pressed
	$(document).keydown(function(e)
	{
		pingpong.keyPressed[e.which]=true;
	});

	$(document).keyup(function(e)
		{
			pingpong.keyPressed[e.which]=false;
	});
};

function gameloop()
{
	if (pingpong.resume == 1)
		{
			movingBall1();
			movingPaddles();


		};
};

function movingBall1()
{
	var playgroundHeight = parseInt($("#playground").css("height"));
	var playgroundWidth = parseInt($("#playground").css("width"));
	var ball = pingpong.ball1;



	// Setting vertical movement of the ball
	if (ball.y + ball.speed*ball.directionY + ball.radius >= playgroundHeight)
	{
		ball.directionY = -1;
	};
	if (ball.y + ball.speed*ball.directionY + (ball.radius-8) <= 0)
	{
		ball.directionY = 1;
	};

	// Setting horizontal movement of the ball
	if (ball.x + ball.speed*ball.directionX + ball.radius >= playgroundWidth)
	{
		pingpong.scoreA++;
		$("#scoreA p").html(pingpong.scoreA);
		ball.directionX = -1;
		pingpong.scorediffA = pingpong.scoreA;
		commentary(pingpong.scorediffA,pingpong.scorediffB);

	};

	if (ball.x + ball.speed*ball.directionX + (ball.radius-8) <= 0)
	{
		pingpong.scoreB++;
		$("#scoreB p").html(pingpong.scoreB);
		ball.directionX = 1;
		pingpong.scorediffB = pingpong.scoreB;
		commentary(pingpong.scorediffA,pingpong.scorediffB);

	};


	var paddleBtop = parseInt($("#paddleB").css("top"));
	var paddleBbottom = parseInt($("#paddleB").css("top")) + 70;
	var paddleBleft = parseInt($("#paddleB").css("left"));

	// checking ball on Front of paddleB
	if (ball.x + ball.speed*ball.directionX + ball.radius >= (paddleBleft - 7))
	{
		if (ball.y + ball.speed*ball.directionY > paddleBtop && ball.y + ball.speed*ball.directionY < paddleBbottom)
		{
			ball.directionX = -1;
		};
	};

	// checking ball on Top of paddleB
	if (ball.x + ball.speed*ball.directionX + ball.radius >= (paddleBleft - 4) && ball.x + ball.speed*ball.directionX + ball.radius <= (paddleBleft + 27))
	{
		if (ball.y + ball.speed*ball.directionY + ball.radius > (paddleBtop - 4)  && ball.y + ball.speed*ball.directionY < (paddleBtop + 20))
		{
			ball.directionY = -1;
		};
	};

	// checking ball on Bottom of paddleB
	if (ball.x + ball.speed*ball.directionX + ball.radius >= (paddleBleft - 7) && ball.x + ball.speed*ball.directionX + ball.radius <= (paddleBleft + 20))
	{
		if (ball.y + ball.speed*ball.directionY > (paddleBbottom - 40) && ball.y + ball.speed*ball.directionY < (paddleBbottom + 5))
		{
			ball.directionY = 1;
		};
	};


	var paddleAtop = parseInt($("#paddleA").css("top"));
	var paddleAbottom = parseInt($("#paddleA").css("top")) + 70;
	var paddleAleft = parseInt($("#paddleA").css("left")) + 20;

	// checking ball on Front of paddleA
	if (ball.x + ball.speed*ball.directionX + ball.radius <= (paddleAleft + 7))
	{
		if (ball.y + ball.speed*ball.directionY > paddleAtop && ball.y + ball.speed*ball.directionY < paddleAbottom)
		{
			ball.directionX = 1;
		};
	};

	// checking ball on Top of paddleA
	if (ball.x + ball.speed*ball.directionX + ball.radius <= (paddleAleft + 5) && ball.x + ball.speed*ball.directionX + ball.radius >= (paddleAleft - 27))
	{
		if (ball.y + ball.speed*ball.directionY + ball.radius > (paddleAtop - 4) && ball.y + ball.speed*ball.directionY < (paddleAtop + 20))
		{
			ball.directionY = -1;
		};
	};

	// checking ball on Bottom of paddleA
	if (ball.x + ball.speed*ball.directionX + ball.radius <= (paddleAleft + 7) && ball.x + ball.speed*ball.directionX + ball.radius >= (paddleAleft - 20))
	{
		if (ball.y + ball.speed*ball.directionY > (paddleAbottom - 40) && ball.y + ball.speed*ball.directionY < (paddleAbottom + 5))
		{
			ball.directionY = 1;
		};
	};




	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;

	$("#ball1").css(
	{
		"left": ball.x,
		"top": ball.y
	});

};




function commentary(scorediffA,scorediffB)
{


	//Commentary start
		//alert("diff A = " + pingpong.scorediffA);
		//alert("diff B = " + pingpong.scorediffB);
		var scoreDiff
		scoreDiff = 0;

		scoreDiff = Math.abs(scorediffA-scorediffB)
		if (scorediffA == scorediffB)
		{

			$("#winDetail p").html("Player A and Player B are equal.");

		};
		if (scorediffA > scorediffB)
		{
			if (scoreDiff == 1)
			{
				$("#winDetail p").html("Player A is getting lead by " + scoreDiff + " Goal.");
			};

			if (scoreDiff > 1)
			{
				$("#winDetail p").html("Player A is getting lead by " + scoreDiff + " Goals.");
			};

		};


		if (scorediffB > scorediffA)
		{

				if (scoreDiff == 1)
				{
					$("#winDetail p").html("Player B is getting lead by " + scoreDiff + " Goal.");
				};

				if (scoreDiff > 1)
				{
					$("#winDetail p").html("Player B is getting lead by " + scoreDiff + " Goals.");
				};
		};


//Commentary end

};

function movingPaddles()
{
	// PaddleB Up and Down(arrow keys)
	if (pingpong.keyPressed[KEY.UP])
	{
		var top = parseInt($("#paddleB").css("top"));
		if (top<=0)
		{

		}
		else
		{
			$("#paddleB").css("top", top-5);
		};
	};
	if (pingpong.keyPressed[KEY.DOWN])
	{
		var top = parseInt($("#paddleB").css("top"));
		if (top+70 >= 300)
		{

		}
		else
		{
			$("#paddleB").css("top", top+5);
		};
	};

	// PaddleA Up and Down(Key W and S)
	if (pingpong.keyPressed[KEY.W])
	{
		var top = parseInt($("#paddleA").css("top"));
		if (top<=0)
		{

		}
		else
		{
			$("#paddleA").css("top", top-5);
		};
	};
	if (pingpong.keyPressed[KEY.S])
	{
		var top = parseInt($("#paddleA").css("top"));
		if (top+70 >= 300)
		{

		}
		else
		{
			$("#paddleA").css("top", top+5);
		};
	};
};