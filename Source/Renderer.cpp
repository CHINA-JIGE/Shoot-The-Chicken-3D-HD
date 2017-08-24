
/************************************************************

				Renderer-Interfaces exposed to user

************************************************************/

#include "MyConsoleEngine.h"

IRenderer::IRenderer()
{

}

IRenderer::~IRenderer()
{

	//！！！！！！！这里放渲染相关东西的析构步骤

	delete m_pZBuffer;

}

void IRenderer::Init(UINT bufferWidth, UINT bufferHeight)
{

	//！！！！！这里放渲染相关东西的初始化，什么sdl的初始化可以放这！！！



	//----------INITIALIZATION OF BUFFERS-----------------
	mBufferWidth =  bufferWidth;
	mBufferHeight = bufferHeight;

	m_pZBuffer = new std::vector<float>(mBufferHeight*mBufferWidth);
	m_pColorBuffer = new std::vector<COLOR3>(mBufferHeight*mBufferWidth);



	//----------------------------INIT RENDER PIPELINE-----------------------
	RenderPipeline_InitData initData;
	initData.bufferWidth = mBufferWidth;
	initData.bufferHeight = mBufferHeight;
	initData.pOutColorBuffer = m_pColorBuffer;
	initData.pZBuffer = m_pZBuffer;
	IRenderPipeline3D::Init(initData);

}

void IRenderer::Clear(COLOR3 clearColor,bool clearZBuff)
{
	//clear with SPACE; buffer is a continuous memory block, but it should
	//be regarded as a 2D buffer
	for (UINT i = 0;i < mBufferWidth*mBufferHeight;++i)
	{
		//clear the RGB buffer
		m_pColorBuffer->at(i) = clearColor;
	}

	//Depth Buffer
	if (clearZBuff == true)
	{
		for (UINT i = 0;i < mBufferWidth*mBufferHeight;++i)
		{
			m_pZBuffer->at(i) = 1.0f;
		}
	}
}

void IRenderer::SetCamera(ICamera & cam)
{
	m_pCamera = &cam;
}

void IRenderer::SetLight(UINT index, const DirectionalLight & light)
{
	IRenderPipeline3D::SetLight(index, light);
}

bool IRenderer::DrawPicture(IPicture & pic, UINT x1, UINT y1, UINT x2, UINT y2)
{
	x1 = Clamp(x1, 0, mBufferWidth-1);
	x2 = Clamp(x2, 0, mBufferWidth-1);
	y1 = Clamp(y1, 0, mBufferHeight-1);
	y2 = Clamp(y2, 0, mBufferHeight-1);


	if (x1 >= x2 || y1 >= y2)
	{
		DEBUG_MSG1("Render Picture: region info error!");
		return false;
	}

	UINT drawRegionWidth = x2 - x1+1;
	UINT drawRegionHeight = y2 - y1+1;

	//because Minification/Magnification could occur, we must find the 
	//x/y ratio coord first to filter
	for (UINT i = x1;i <= x2;++i)
	{
		float x_ratio = float(i - x1) / drawRegionWidth;
		for (UINT j = y1;j <= y2;++j)
		{
			float y_ratio = float(j - y1) / drawRegionHeight;
			UINT picCoordX = UINT(pic.mWidth*x_ratio);
			UINT picCoordY = UINT(pic.mHeight*y_ratio);
			mFunction_SetPixel(i, j, pic.GetPixel(picCoordX, picCoordY));
		}
	}
	return true;
}

void IRenderer::DrawLine(COLOR3 color, UINT x1, UINT y1, UINT x2, UINT y2)
{
	auto fractionPart = [](float f)->float 
	{
		return f - float(UINT(f));
	};

	if (x1==x2)
	{
		//if slope doesn't exist
		for (UINT j = y1;j <= y2;j++)
		{
				mFunction_SetPixel(x1, j, color);//pixel outside the boundary won't be drawn
		}
	}
	else
	{
		//.........It should a signed distance
		float	k = float(int(y2)-int(y1)) / float(int(x2)-int(x1));
		float k_inv = 1 / k;
		//bresenham-like line drawing

		//two circumstances
		//1. abs(slope)>=1; 
		//2. abs(slope)<=1;
		float offset = 0.0f;
		if (abs(k) <= 1.0f)
		{
			UINT i = x1;

			while(i!=x2)
			{
				//UINT() forced type conversion will truncate the fraction part
				mFunction_SetPixel(i, y1 + UINT(offset),color);

				//anti-alising
				//mFunction_BlendPixel(i, y1 + UINT(offset)+ 1,  fractionPart(offset),color);
				offset += k;//dy = dx * k;

				if (x2 > x1)++i;else --i;
			}
		}
		else
		{
			UINT j = y1;
			while(j!=y2)
			{
				mFunction_SetPixel(x1+UINT(offset), j, color);

				//anti-alising
				//mFunction_BlendPixel(x1+UINT(offset) +1,j, fractionPart(offset),color);
				offset += (k_inv);

				if (y2 > y1) 
					{ ++j; }
				else
					{ --j; }
			}
		}
	}

}

void IRenderer::DrawTriangle(COLOR3 color, const VECTOR2 & v1_pixel, const VECTOR2 & v2_pixel, const VECTOR2 & v3_pixel)
{
	//matrix set to identity
	MATRIX4x4 matIdentity;
	matIdentity.Identity();
	IRenderPipeline3D::SetWorldMatrix(matIdentity);
	IRenderPipeline3D::SetProjMatrix(matIdentity);
	IRenderPipeline3D::SetViewMatrix(matIdentity);

	//convert to pixel space
	auto convertToHomoSpace = [&](const VECTOR2& v, VECTOR2& outV)
	{
		outV.x = (v.x / float(mBufferWidth) *2.0f) - 1.0f;
		outV.y = (-v.y / float(mBufferHeight) *2.0f) + 1.0f;
	};

	VECTOR2 v1, v2, v3;
	convertToHomoSpace(v1_pixel, v1);
	convertToHomoSpace(v2_pixel, v2);
	convertToHomoSpace(v3_pixel, v3);

	//well, pipeline 3D will convert homo space coord to pixel space
	std::vector<Vertex> vertexArray(3);
	vertexArray[0].color = VECTOR4(color.x, color.y, color.z, 1.0f);
	vertexArray[0].pos = VECTOR3(v1.x, v1.y, 0.0f);
	vertexArray[0].normal = VECTOR3(0.0f, 1.0f, 0.0f);
	vertexArray[0].texcoord = VECTOR2(0.0f, 1.0f);

	vertexArray[1].color = VECTOR4(color.x, color.y, color.z, 1.0f);
	vertexArray[1].pos = VECTOR3(v2.x, v2.y, 0.0f);
	vertexArray[1].normal = VECTOR3(0.0f, 1.0f, 0.0f);
	vertexArray[1].texcoord = VECTOR2(1.0f, 0.0f);

	vertexArray[2].color = VECTOR4(color.x, color.y, color.z, 1.0f);
	vertexArray[2].pos = VECTOR3(v3.x, v3.y, 0.0f);
	vertexArray[2].normal = VECTOR3(0.0f, 1.0f, 0.0f);
	vertexArray[2].texcoord = VECTOR2(1.0f, 1.0f);

	std::vector<UINT> indexArray = { 0,1,2 };

	RenderPipeline_DrawCallData drawCallData;
	drawCallData.offset = 0;
	drawCallData.pIndexBuffer = &indexArray;
	drawCallData.pVertexBuffer = &vertexArray;
	drawCallData.VertexCount = 3;

	//Pipeline will directly draw to ColorBuffer and ZBuffer......
	IRenderPipeline3D::DrawTriangles(drawCallData);

}

void IRenderer::DrawRect(const COLOR3 & color, UINT x1, UINT y1, UINT x2, UINT y2)
{
	for (UINT i = x1;i <= x2;++i)
		for (UINT j = y1;j <= y2;++j)
			mFunction_SetPixel(i, j, color);
};



void IRenderer::RenderMesh(IMesh& mesh)
{
	if (m_pCamera == nullptr)return;

	//set WVP matrices
	MATRIX4x4 matW, matV, matP;
	mesh.GetWorldMatrix(matW);
	m_pCamera->GetViewMatrix(matV);
	m_pCamera->GetProjMatrix(matP);

	//setting param for the render pipeline
	IRenderPipeline3D::SetWorldMatrix(matW);
	IRenderPipeline3D::SetProjMatrix(matP);
	IRenderPipeline3D::SetViewMatrix(matV);
	IRenderPipeline3D::SetCameraPos(m_pCamera->GetPosition());
	IRenderPipeline3D::SetMaterial(mesh.mMaterial);
	IRenderPipeline3D::SetTexture(mesh.m_pTexture);//nullptr is OK
	IRenderPipeline3D::SetLightingEnabled(true);

	RenderPipeline_DrawCallData drawCallData;
	drawCallData.offset = 0;
	drawCallData.pIndexBuffer = mesh.m_pIB_Mem;
	drawCallData.pVertexBuffer = mesh.m_pVB_Mem;
	drawCallData.VertexCount = mesh.GetVertexCount();

	//Pipeline will directly draw to ColorBuffer and ZBuffer......
	//the pointer of render target has been passed to the pipeline in initialization
	IRenderPipeline3D::DrawTriangles(drawCallData);

}

void IRenderer::RenderPointCollection(IPointCollection & collection)
{
	if (m_pCamera == nullptr)return;

	//set WVP matrices
	MATRIX4x4 matW, matV, matP;
	matW.Identity();
	m_pCamera->GetViewMatrix(matV);
	m_pCamera->GetProjMatrix(matP);

	IRenderPipeline3D::SetWorldMatrix(matW);
	IRenderPipeline3D::SetProjMatrix(matP);
	IRenderPipeline3D::SetViewMatrix(matV);
	IRenderPipeline3D::SetCameraPos(m_pCamera->GetPosition());
	IRenderPipeline3D::SetTexture(nullptr);//nullptr is OK
	IRenderPipeline3D::SetLightingEnabled(false);

	RenderPipeline_DrawCallData drawCallData;
	drawCallData.offset = 0;
	drawCallData.pIndexBuffer = collection.m_pIB_Mem;
	drawCallData.pVertexBuffer = collection.m_pVB_Mem;
	drawCallData.VertexCount = collection.GetVertexCount();

	//Pipeline will directly draw to ColorBuffer and ZBuffer......
	IRenderPipeline3D::DrawPoint(drawCallData);
}

void IRenderer::Present()
{
	//！！！！！！！！！！！在这里用SDL的输出图像的接口！！
	
}

void IRenderer::SetWindowTitle(const char * titleStr)
{
	::SetConsoleTitleA(titleStr);
}

UINT IRenderer::GetBufferWidth()
{
	return mBufferWidth;
}

UINT IRenderer::GetBufferHeight()
{
	return mBufferHeight;
}

/****************************************************
							P R I V A T E
*****************************************************/

void IRenderer::mFunction_BlendPixel(UINT x, UINT y, float blendFactor, const COLOR3 & newColor)
{
	if (x < mBufferWidth && y < mBufferHeight)
	{
		COLOR3& c = m_pColorBuffer->at(y*mBufferWidth + x);
		c.x = Lerp(c.x, newColor.x, blendFactor);
		c.y = Lerp(c.y, newColor.y, blendFactor);
		c.z= Lerp(c.z, newColor.z, blendFactor);
	}

}

inline void IRenderer::mFunction_SetPixel(UINT x, UINT y, const COLOR3 & color)
{
	if(x<mBufferWidth && y <mBufferHeight)
		m_pColorBuffer->at(y*mBufferWidth + x) = color;
}

inline UINT IRenderer::mFunction_GetIndex(UINT x, UINT y)
{
	return y*mBufferWidth+x;
}
