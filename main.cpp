
#include "MyConsoleEngine.h"
#include "Game.h"

int main(int argc, char* agv[]) 
{
	GamePlay::InitGlobal();

	while (1)
	{
		//a state machine to drive different scene
		//std::terminate() will be called when quit.
		GamePlay::GameStateSelector();
	}
	return 0;
}
