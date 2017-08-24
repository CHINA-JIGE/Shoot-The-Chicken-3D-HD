#pragma once

const short c_ConsoleCharSize = 3;//size of one char (in pixels)

const float c_ConsoleCharAspectRatio = 3.0f / 5.0f;//used to correct pixel scale

class IRenderer : private IRenderPipeline3D
{
public:

	IRenderer();

	~IRenderer();

	void		Init(UINT bufferWidth,UINT bufferHeight);

	void		Clear(COLOR3 clearColor=COLOR3(0,0,0),bool clearZBuff=true);

	void		SetCamera(ICamera& cam);

	void		SetLight(UINT index,const  DirectionalLight& light);

	void		RenderMesh(IMesh& mesh);

	void		RenderPointCollection(IPointCollection& collection);

	bool	DrawPicture(IPicture& pic, UINT x1, UINT y1, UINT x2, UINT y2);

	void		DrawLine(COLOR3 color, UINT x1, UINT y1, UINT x2, UINT y2);

	void		DrawTriangle(COLOR3 color, const VECTOR2& v1_pixel, const VECTOR2& v2_pixel, const VECTOR2& v3_pixel);
	
	void		DrawRect(const COLOR3& color, UINT x1,UINT y1,UINT x2,UINT y2);

	void		Present();

	void		SetWindowTitle(const char* titleStr);

	UINT		GetBufferWidth();

	UINT		GetBufferHeight();

private:

	void			mFunction_BlendPixel(UINT x, UINT y,float blendFactor, const COLOR3& newColor);

	void			mFunction_SetPixel(UINT x, UINT y, const COLOR3& color);

	UINT		mFunction_GetIndex(UINT x, UINT y);

	ICamera*							m_pCamera;

	std::vector<float>*			m_pZBuffer;

	std::vector<COLOR3>*	m_pColorBuffer;//using 0~255 color

	UINT		mBufferWidth;//render buffer width

	UINT		mBufferHeight;//render buffer height


};