import { POST } from './route';
import { getServerSession } from '@/lib/session';
import { GoogleGenerativeAI } from '@google/generative-ai';

jest.mock('@/lib/session', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: any) => ({
      status: init?.status || 200,
      json: async () => body,
    }),
  },
}));

jest.mock('@google/generative-ai', () => {
  const sendMessageMock = jest.fn().mockResolvedValue({
    response: {
      text: () => 'Mocked AI Response',
    },
  });
  
  const startChatMock = jest.fn().mockReturnValue({
    sendMessage: sendMessageMock,
  });
  
  const getGenerativeModelMock = jest.fn().mockReturnValue({
    startChat: startChatMock,
  });
  
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: getGenerativeModelMock,
    })),
  };
});

describe('/api/gemini-chat', () => {
  const mockSession = { user: { id: 'user123' } };
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv, GEMINI_API_KEY: 'test_api_key' };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns 401 if unauthorized', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(null);
    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify({ message: 'Hello' }) }) as any;
    
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 400 if message is missing', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify({}) }) as any;
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/message is required/);
  });

  it('returns 400 if message is empty after trimming', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify({ message: '   ' }) }) as any;
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/cannot be empty/);
  });

  it('returns 400 if message exceeds max length', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify({ message: 'a'.repeat(2001) }) }) as any;
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/must be at most/);
  });

  it('handles missing API key gracefully', async () => {
    delete process.env.GEMINI_API_KEY;
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify({ message: 'Hello' }) }) as any;
    
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content[0].value).toMatch(/configured yet/);
  });

  it('calls Gemini API successfully and returns response', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
    const req = new Request('http://localhost', { 
      method: 'POST', 
      body: JSON.stringify({ 
        message: 'Hello',
        history: [{ role: 'user', text: 'Hi' }] 
      }) 
    }) as any;
    
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content[0].value).toBe('Mocked AI Response');
    expect(GoogleGenerativeAI).toHaveBeenCalledWith('test_api_key');
  });

  it('handles Gemini API errors gracefully', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
    
    // Override the mock for just this test to throw an error
    const genAI = new GoogleGenerativeAI('test_api_key');
    const model = genAI.getGenerativeModel({ model: 'test' });
    const chat = model.startChat();
    (chat.sendMessage as jest.Mock).mockRejectedValueOnce(new Error('Quota exceeded 429'));
    
    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify({ message: 'Hello' }) }) as any;
    const res = await POST(req);
    
    expect(res.status).toBe(200); // the API route catches and returns 200 with an error text
    const data = await res.json();
    expect(data.content[0].value).toMatch(/too many requests/);
  });
});
