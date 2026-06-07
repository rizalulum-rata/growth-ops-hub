import json
import logging
from typing import Dict, Any, Optional
import httpx
from openai import OpenAI
from ..config import settings

logger = logging.getLogger(__name__)

class DeepSeekChatbot:
    """
    DeepSeek chatbot service using OpenAI-compatible API
    """
    
    def __init__(self):
        """Initialize DeepSeek client"""
        try:
            # Create httpx client without proxies
            http_client = httpx.Client(
                timeout=30.0,
                follow_redirects=True,
            )
            
            self.client = OpenAI(
                api_key=settings.deepseek_api_key,
                base_url=settings.deepseek_base_url,
                http_client=http_client,
            )
            self.model = settings.deepseek_model
            self.max_tokens = settings.deepseek_max_tokens
            logger.info(f"✅ DeepSeek client initialized with model: {self.model}")
        except Exception as e:
            logger.error(f"❌ Failed to initialize DeepSeek client: {e}")
            import traceback
            traceback.print_exc()
            raise
    
    def _build_system_prompt(self) -> str:
        """Build system prompt for the chatbot"""
        return """Anda adalah AI assistant untuk Growth Ops Hub - platform dokumentasi dan analitik internal.

Peran Anda:
- Menjawab pertanyaan tentang data, KPI, dan dokumentasi operasional
- Memberikan insight dari data growth operations
- Membantu tim memahami metrik dan performance
- Berbahasa Indonesia yang natural dan profesional

Instruksi:
- Jawab singkat, jelas, dan praktis
- Gunakan format bullet points jika perlu
- Jika ada data yang diminta, coba sajikan dalam format terstruktur
- Jika tidak tahu, katakan dengan jujur dan sarankan alternatif
- Selalu kontekstual dengan Growth Ops Hub"""
    
    def _build_user_message(
        self,
        query: str,
        brand_filter: Optional[str] = None,
        team_filter: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ) -> str:
        """Build user message with context"""
        message = query
        
        # Add filter information if provided
        if brand_filter:
            message += f"\n[Brand: {brand_filter}]"
        if team_filter:
            message += f"\n[Team: {team_filter}]"
        
        # Add additional context if provided
        if context:
            if context.get("current_data"):
                message += f"\n[Context data: {json.dumps(context['current_data'], indent=2)}]"
            if context.get("page"):
                message += f"\n[Current page: {context['page']}]"
        
        return message
    
    def query(
        self,
        query: str,
        brand_filter: Optional[str] = None,
        team_filter: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Send a query to DeepSeek and get a response
        
        Args:
            query: User query
            brand_filter: Optional brand filter (e.g., 'rata', 'tanam', 'vinir')
            team_filter: Optional team filter (e.g., 'cs', 'sch', 'conversion')
            context: Optional additional context
            
        Returns:
            Dictionary with response and metadata
        """
        try:
            logger.info(f"📨 Query received: {query[:50]}...")
            
            user_message = self._build_user_message(query, brand_filter, team_filter, context)
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": self._build_system_prompt()
                    },
                    {
                        "role": "user",
                        "content": user_message
                    }
                ],
                max_tokens=self.max_tokens,
                temperature=0.7,
            )
            
            answer = response.choices[0].message.content
            logger.info(f"✅ Response generated: {answer[:50]}...")
            
            return {
                "answer": answer,
                "sources": [],
                "metadata": {
                    "model": self.model,
                    "tokens_used": response.usage.total_tokens,
                }
            }
        except Exception as e:
            logger.error(f"❌ Error querying DeepSeek: {e}")
            raise
    
    def stream_query(
        self,
        query: str,
        brand_filter: Optional[str] = None,
        team_filter: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ):
        """
        Stream query response from DeepSeek
        
        Args:
            query: User query
            brand_filter: Optional brand filter
            team_filter: Optional team filter
            context: Optional additional context
            
        Yields:
            Streamed response chunks as JSON strings
        """
        try:
            logger.info(f"📨 Stream query received: {query[:50]}...")
            
            user_message = self._build_user_message(query, brand_filter, team_filter, context)
            
            with self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": self._build_system_prompt()
                    },
                    {
                        "role": "user",
                        "content": user_message
                    }
                ],
                max_tokens=self.max_tokens,
                temperature=0.7,
                stream=True,
            ) as response:
                for chunk in response:
                    if chunk.choices[0].delta.content:
                        content = chunk.choices[0].delta.content
                        yield json.dumps({
                            "type": "content",
                            "data": content
                        })
                
                logger.info("✅ Stream completed")
                yield json.dumps({
                    "type": "done",
                    "data": None
                })
        except Exception as e:
            logger.error(f"❌ Error in stream query: {e}")
            yield json.dumps({
                "type": "error",
                "data": str(e)
            })
