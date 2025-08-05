# agent/main.py
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from uvicorn import Config, Server
from typing import cast, Dict, Any
import os

# Your custom agent logic here
class MyNextjsAgent(Agent):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.model = OpenAIChat(id="gpt-4o")

# Define a simple agent with a tool to, for example, log messages
class MySimpleAgent(MyNextjsAgent):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.description = "A Next.js-aware assistant that can help with web development tasks."

    def log_message(self, message: str):
        """Logs a message to the console."""
        print(f"Agent Log: {message}")

# Set up the FastAPI server
app = FastAPI(title="Agno Agent API", description="A Next.js-aware assistant API")
agent = MySimpleAgent()

@app.get("/")
async def root():
    return {"message": "Agno Agent API is running", "agent_description": agent.description}

@app.post("/agno/chat")
async def chat_with_agent(request: Dict[str, Any]):
    try:
        message = request.get("message", "")
        if not message:
            raise HTTPException(status_code=400, detail="Message is required")
        
        # Run the agent with the message
        response = await agent.arun(message)
        return {"response": response.content, "agent_id": agent.agent_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/agno/health")
async def health_check():
    return {"status": "healthy", "agent_id": agent.agent_id}

if __name__ == "__main__":
    server = Server(
        Config(
            app,
            host="127.0.0.1",
            port=8000,
            log_level="info",
        )
    )
    cast(Server, server).run() 