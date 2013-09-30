
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
pingpong.timer=20;
pingpong.moveBall2=0;
pingpong.moveBall3=0;
pingpong.winW=630;
pingpong.winH=460;

pingpong.ball1 = {
	speed: 5,
	x:pingpong.winW/2,
	y:(pingpong.winH/2)-100,
	directionX:1,
	directionY:1,
	radius:10
};

pingpong.ball2 = {
	speed: 5,
	x:pingpong.winW/2,
	y:(pingpong.winH/2)-130,
	directionX:-1,
	directionY:-1,
	radius:10
};


pingpong.ball3 = {
	speed: 5,
	x:pingpong.winW/2,
	y:(pingpong.winH/2)-80,
	directionX:1,
	directionY:-1,
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
	lookNfeel();
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
		//resetGame();
		$("#ball2").css("display","none");
		$("#ball3").css("display","none");
		pingpong.moveBall2 = 0;
		pingpong.moveBall3 = 0;
	};

	if (pingpong.levelCounter>=1 && sOption[sIndex].id == "level2")
	{
		//resetGame();
		$("#ball2").css("display","block");
		pingpong.moveBall2 = 1;

	};

	if (pingpong.levelCounter>=1 && sOption[sIndex].id == "level3")
	{
			//resetGame();
			$("#ball2").css("display","block");
			$("#ball3").css("display","block");
			pingpong.moveBall2 = 1;
			pingpong.moveBall3 = 1;
			pingpong.timer=15;
			//initiatGame();

	};


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
	pingpong.resume = 0;
	$("#play").css("display","block");
	$("#pause").css("display","none");
	$("#resume").css("display","none");


	pingpong.scoreA=0;
	pingpong.scoreB=0;
	$("#scoreA p").html(pingpong.scoreA);
	$("#scoreB p").html(pingpong.scoreB);
	pingpong.ball1.x=(pingpong.winW/2);
	pingpong.ball1.y=(pingpong.winH/2)-100;
	pingpong.ball1.directionX=1;
	pingpong.ball1.directionY=1;

	pingpong.ball2.x=(pingpong.winW/2);
	pingpong.ball2.y=(pingpong.winH/2)-130;
	pingpong.ball2.directionX=-1;
	pingpong.ball2.directionY=-1;

	pingpong.ball3.x=(pingpong.winW/2);
	pingpong.ball3.y=(pingpong.winH/2)-80;
	pingpong.ball3.directionX=1;
	pingpong.ball3.directionY=-1;

	$("#winDetail p").html("Commentary");

	$("#ball1").css(
		{
			"left":(pingpong.winW/2),
			"top":(pingpong.winH/2)-100
		});
	$("#ball2").css(
			{
			"left":(pingpong.winW/2),
			"top":(pingpong.winH/2)-130
		});
	$("#ball3").css(
			{
			"left":(pingpong.winW/2),
			"top":(pingpong.winH/2)-80
		});
	$("#paddleA").css(
		{
			"left": 5,
			"top":(pingpong.winH/2)-130
		});
	$("#paddleB").css(
		{
			"left":((96.5*pingpong.winW)/100),
			"top":(pingpong.winH/2)-130
		});


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

			if (pingpong.moveBall2 == 1)
				{
					movingBall2();
				};
			if (pingpong.moveBall3 == 1)
				{
					movingBall3();
				};
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
	var paddleBbottom = parseInt($("#paddleB").css("top")) + 110;
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
	var paddleAbottom = parseInt($("#paddleA").css("top")) + 110;
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



function movingBall2()
{
	var playgroundHeight = parseInt($("#playground").css("height"));
	var playgroundWidth = parseInt($("#playground").css("width"));
	var ball = pingpong.ball2;



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
	var paddleBbottom = parseInt($("#paddleB").css("top")) + 110;
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
	var paddleAbottom = parseInt($("#paddleA").css("top")) + 110;
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

	$("#ball2").css(
	{
		"left": ball.x,
		"top": ball.y
	});


};



function movingBall3()
{
	var playgroundHeight = parseInt($("#playground").css("height"));
	var playgroundWidth = parseInt($("#playground").css("width"));
	var ball = pingpong.ball3;



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
	var paddleBbottom = parseInt($("#paddleB").css("top")) + 110;
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
	var paddleAbottom = parseInt($("#paddleA").css("top")) + 110;
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

	$("#ball3").css(
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
		var scoreDiff,replay
		scoreDiff = 0;
		replay = "No"

		scoreDiff = Math.abs(scorediffA-scorediffB)

		if (scorediffA == 10)
		{

			if (scoreDiff == 1)
			{
				$("#winDetail p").html("Congratulations! Player A, You won the match by " + scoreDiff +" Goal.");
				replay = prompt("Congratulations! Player A, You won the match by " + scoreDiff +" Goal. Would you like to play again? Please type Yes/No?");

			}
			else if (scoreDiff > 1)
			{
				$("#winDetail p").html("Congratulations! Player A, You won the match by " + scoreDiff +" Goals.");
				replay = prompt("Congratulations! Player A, You won the match by " + scoreDiff +" Goals. Would you like to play again? Please type Yes/No?");
			};

			// checing if player want to replay
			if (replay == "Yes" || replay == "yes" || replay == "YES" || replay == "Y" || replay == "y")
			{
				resetGame();
				playGame();
			}
			else
			{
				resetGame();
			};
		}
		else if (scorediffB == 10)
		{

			if (scoreDiff == 1)
			{
				$("#winDetail p").html("Congratulations! Player B, You won the match by " + scoreDiff +" Goal.");
				replay = prompt("Congratulations! Player B, You won the match by " + scoreDiff +" Goal. Would you like to play again? Please type Yes/No?");

			};
			if (scoreDiff > 1)
			{
				$("#winDetail p").html("Congratulations! Player B, You won the match by " + scoreDiff +" Goals.");
				replay = prompt("Congratulations! Player B, You won the match by " + scoreDiff +" Goals. Would you like to play again? Please type Yes/No?");
			};

			// checing if player want to replay
			if (replay == "Yes" || replay == "yes" || replay == "YES" || replay == "Y" || replay == "y")
				{
					resetGame();
					playGame();
				}
				else
				{
					resetGame();
			};
		}
		else if (scorediffA == scorediffB)
		{

			$("#winDetail p").html("Player A and Player B are equal.");

		}
		else if (scorediffA > scorediffB)
		{
			if (scoreDiff == 1)
			{
				$("#winDetail p").html("Player A is getting lead by " + scoreDiff + " Goal.");
			};

			if (scoreDiff > 1)
			{
				$("#winDetail p").html("Player A is getting lead by " + scoreDiff + " Goals.");
			};

		}
		else if (scorediffB > scorediffA)
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

	var winH = pingpong.winH - 53;
	// PaddleB Up and Down(arrow keys)
	if (pingpong.keyPressed[KEY.UP])
	{
		var top = parseInt($("#paddleB").css("top"));
		if (top<=2)
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
		if (top+70 >= winH-130)
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
		if (top<=2)
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
		if (top+70 >= winH-130)
		{

		}
		else
		{
			$("#paddleA").css("top", top+5);
		};
	};
};



function lookNfeel()
{

	var winW = pingpong.winW;
	var winH = pingpong.winH;
	if (document.body && document.body.offsetWidth)
		{
			 winW = document.body.offsetWidth;
			 winH = document.body.offsetHeight;
		};
	if (document.compatMode=='CSS1Compat' &&
			document.documentElement &&
			document.documentElement.offsetWidth )
		{
			winW = document.documentElement.offsetWidth;
			winH = document.documentElement.offsetHeight;
		};
	if (window.innerWidth && window.innerHeight)
		{
			winW = window.innerWidth;
			winH = window.innerHeight;
		};


	//<div id="scoreDetail"> -- Start
	$("#playerA").css(
		{
			"width":((20*winW)/100)

		});
	$("#playerB").css(
		{
			"width":((20*winW)/100)

		});
	$("#winDetail").css(
		{
			"width":((60*winW)/100),
			"left":((20*winW)/100),
			"right":((20*winW)/100)

	});
	//<div id="scoreDetail"> -- End

	//<div id="playControl"> -- Start
	$("#scoreA").css(
		{
			"width":((20*winW)/100)

		});

	$("#play").css(
		{
			"width":((20*winW)/100),
			"left":((20.4*winW)/100)

		});
	$("#pause").css(
		{
			"width":((20*winW)/100),
			"left":((20.4*winW)/100)

		});
	$("#resume").css(
		{
			"width":((20*winW)/100),
			"left":((20.4*winW)/100)

		});
	$("#reset").css(
			{
				"width":((19.2*winW)/100),
				"left":((40.6*winW)/100)

		});
	$("#levels").css(
		{
			"width":((18*winW)/100),
			"left":((60*winW)/100),
			"right":((20*winW)/100)

		});
	$("#scoreB").css(
		{
			"width":((20*winW)/100),
			"left":((78.3*winW)/100),
			"right":0

		});
	//<div id="playControl"> -- End


	//<div id="playground"> -- Start
	$("#ball1").css(
	{
			"left":winW/2,
			"top":(winH/2)-100
	});

	$("#ball2").css(
	{
			"left":winW/2,
			"top":(winH/2)-130
	});
	$("#ball3").css(
	{
			"left":winW/2,
			"top":(winH/2)-80
	});

	$("#playground").css(
		{
			//"width":window.outerWidth,
			//"height":window.outerHeight - 210
			"height":winH-130
	});

	$("#paddleA").css(
		{
			"top":(winH/2)-130
		});

	$("#paddleB").css(
		{
			"left":((96.5*winW)/100),
			"top":(winH/2)-130
		});

	//<div id="playground"> -- End



	pingpong.winW = winW;
	pingpong.winH = winH;

};