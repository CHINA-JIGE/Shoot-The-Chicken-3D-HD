
#include "MyConsoleEngine.h"
#include "Game.h"

int main(int argc, char* agv[]) 
{
	GamePlay::InitGlobal();

	Uint8 done = 0;
	SDL_Event event;
	
	while (1)
	{
		while (SDL_PollEvent(&event))
		{
			switch (event.type)
			{
			case SDL_QUIT:
				exit(0);
			}
		}
		//a state machine to drive different scene
		//std::terminate() will be called when quit.
		GamePlay::GameStateSelector();
	}
	return 0;
}

